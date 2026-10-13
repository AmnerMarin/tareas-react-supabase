import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { supabaseClient } from './supabase/client';
import TaskContext from './context/TaskContext';
import NavBar from './components/NavBar';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (!session) {
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      } else {
        if (location.pathname === '/login') {
          navigate('/');
        }
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  if (loading) return null;

  return (
    <div className="App">
      <TaskContext>
        <NavBar />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>

      </TaskContext>

    </div>
  );
}

export default App;
