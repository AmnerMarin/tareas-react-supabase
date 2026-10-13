import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList({done}) {

    const { tasks, getTasks, loading } = useTask();

    useEffect(() => {
        getTasks(done);
    }, [done]);


    const renderTasks = () => {
        if (loading) {
            return <p>Loading...</p>
        } else if (tasks.length === 0) {
            return <p>No tasks found</p>
        } else {
            return (
                <div>
                    {
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task} />
                        ))
                    }
                </div>
            );
        }
    }


    return (
        <>
        {renderTasks()}
        </>
    )

}

export default TaskList;