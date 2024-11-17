

import { Route, Routes } from 'react-router-dom'
import './index.css'
import AddTask from './components/AddTask';
import Sidebar from './components/Sidebar';
import AllTasks from './components/AllTasks';
import CompleteTask from './components/CompleteTask';
import InProgressTask from './components/InProgressTask';
import Dashboard from './components/Dashboard';
import PendingTask from './components/PendingTask';
import './App.css'


const App = () => {

  return (

    <div className='flex h-full'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/allTask" element={<AllTasks />} />
        <Route path="/completeTask" element={<CompleteTask />} />
        <Route path="/pendingTask" element={<PendingTask />} />
        <Route path="/inProgressTask" element={<InProgressTask />} />
        <Route path="/statsTask" element={<Dashboard />} />
      </Routes>
    </div>

  );
};

export default App;