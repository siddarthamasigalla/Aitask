'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Task {
  text: string;
  date: string;
  time: string;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '' && taskDate.trim() !== '' && taskTime.trim() !== '') {
      setTasks([...tasks, { text: taskInput, date: taskDate, time: taskTime }]);
      setTaskInput('');
      setTaskDate('');
      setTaskTime('');
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = filterDate
    ? tasks.filter(task => task.date === filterDate)
    : tasks;

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center p-10">
      <div className="backdrop-blur-md bg-white/10 border border-gray-700 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task"
            className="border p-2 rounded w-full bg-gray-900 text-white placeholder-gray-400"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border p-2 rounded bg-gray-900 text-white"
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="border p-2 rounded bg-gray-900 text-white"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add</button>
        </div>
      </div>
      <div className="w-full max-w-3xl mt-6 backdrop-blur-md bg-white/10 border border-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Task Manager</h2>
        <div className="mb-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
            className="border p-2 rounded w-full bg-gray-900 text-white placeholder-gray-400"
          />
        </div>
        <ul className="space-y-2">
          {filteredTasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center p-3 border rounded-lg backdrop-blur-md bg-white/10 border-gray-700 shadow-md text-white">
              <span>{task.text} ({task.date} - {task.time})</span>
              <button onClick={() => deleteTask(index)} className="text-red-500 hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}