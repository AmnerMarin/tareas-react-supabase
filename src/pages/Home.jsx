import { supabaseClient } from '../supabase/client';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

function Home() {

    const [showTasksDone, setShowTasksDone] = useState(false);
    return (
        <div>
            <div className="col-md-4 offset-md-4">
                <h1>Home</h1>

                <TaskForm />

                <header className='d-flex justify-content-between my-3'>
                    <span className='h5'>Tasks pendind</span>
                    <button
                        className='btn btn-dark btn-sm'
                        onClick={() => setShowTasksDone(!showTasksDone)}>
                        {showTasksDone ? "Show pending tasks" : "Show done tasks"}
                    </button>
                </header>

                <TaskList done={showTasksDone} />
            </div>
        </div>
    );
}

export default Home;