import { useState } from "react";
import { useTask } from "../context/TaskContext";

function TaskForm() {

    const [nombreTarea, setNombreTarea] = useState('');
    const { createTask, adding } = useTask();


    const avoidPreventDefault = async (e) => {
        e.preventDefault();
        createTask(nombreTarea);
        setNombreTarea("");
    }


    const handleNombreTarea = (e) => {
        setNombreTarea(e.target.value);
    }

    return (
        <form
            className="card card-body"
            onSubmit={avoidPreventDefault}>
            <input
                type="text"
                name="taskname"
                placeholder="Write a task name"
                onChange={handleNombreTarea}
                value={nombreTarea}
                className="form-control mb-2"
            />
            <div className="ms-auto">
                <button
                    className="btn btn-primary btn-sm "
                    disabled={adding}>
                    {adding ? "Añadiendo..." : "Añadir"}
                </button>
            </div>

        </form>
    );

}

export default TaskForm;