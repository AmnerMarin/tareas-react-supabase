import { createContext, useContext, useState } from "react";
import { supabaseClient } from "../supabase/client";

export const context = createContext();

export const useTask = () => {
    const contexto = useContext(context);
    if (!contexto) throw new Error('useTask must be within a TaskContextProvider');
    return contexto;
}


function TaskContext({ children }) {
    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const getTasks = async (done = false) => {
        setLoading(true);

        const {data:{user}}= await supabaseClient.auth.getUser();
        // RLS se encarga de filtrar solo las tareas del usuario autenticado
        const { data, error } = await supabaseClient
            .from("tasks")
            .select()
            .eq("done", done)
            .eq("userId", user.id)
            .order("id", { ascending: true });

        setTasks(data);
        setLoading(false);
    }

    const createTask = async (nombreTarea) => {
        setAdding(true);
        const { data: { user } } = await supabaseClient.auth.getUser();
        console.log(user);

        const userId = user.id;

        const { data, error } = await supabaseClient
            .from('tasks')
            .insert({
                name: nombreTarea,
                userId

            })
            .select();

        //Actualmente Supabase v2 ya no devuelve data
        if (error) {
            console.error("Error de Supabase:", error.message);
            return;
        }

        setTasks([...tasks, ...data]);

        setAdding(false);
    }

    const deleteTask = async (id) => {
        // RLS impide borrar tareas que no pertenecen al usuario autenticado
        const { data } = await supabaseClient
            .from("tasks")
            .delete()
            .eq("id", id)
            .select();

        setTasks(tasks.filter((task) => task.id !== id));
    }

    const updateTask = async (id, updateFields) => {
        const { data } = await supabaseClient
            .from("tasks")
            .update(updateFields)
            .eq("id", id)
            .select();

            console.log(data);

        setTasks(tasks.filter((task) => task.id !== id));
    }


    return (
        <context.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask, updateTask}}>
            {children}
        </context.Provider>
    );
}

export default TaskContext;