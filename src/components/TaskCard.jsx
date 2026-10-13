import { useTask } from "../context/TaskContext"

function TaskCard({ task }) {

    const {deleteTask, updateTask}= useTask();

    const handleDelete=()=>{
        deleteTask(task.id)
    }

    const handleDone=()=>{
        updateTask(task.id, {done: !task.done})
    }

    return (
        <div 
            className="card card-body mt-2">
            <h1 className="h5">{task.name}</h1>
            <p>{task.done?"Hecho ✓": "No realizado ❌"}</p>
            <div className="ms-auto">
                <button className="btn btn-danger btn-sm me-1" onClick={handleDelete}> Delete</button>
                <button className="btn btn-secondary btn-sm" onClick={handleDone}> Done</button>
            </div>
        </div>
    );
}

export default TaskCard;