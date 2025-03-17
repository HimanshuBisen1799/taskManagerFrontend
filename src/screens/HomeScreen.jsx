

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, updateTaskStatus, deleteTask } from "../api";
import TaskModal from "../components/Modal/TaskModal.jsx";
import { Autocomplete, TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filterTasks = () => {
      const filtered = tasks.filter((task) => {
        const matchesStatus = !status || task.status === status;
        const matchesPriority = !priority || task.priority === priority;
        return matchesStatus && matchesPriority;
      });
      setFilteredTasks(filtered);
    };
    filterTasks();
  }, [tasks, priority, status]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleTaskStatusChange = async (taskId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await updateTaskStatus(taskId, token);
      const updatedTasks = await getTasks(token);
      setTasks(updatedTasks);
    }
  };

  const handleTaskDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    if (token) {
      await deleteTask(taskId, token);
      const updatedTasks = await getTasks(token);
      setTasks(updatedTasks);
    }
  };

  const resetFilters = () => {
    setPriority("");
    setStatus("");
    setFilteredTasks(tasks);
  };

  const statusOptions = ["completed", "pending"];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const taskRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-10">
      <motion.div
        className="container mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-wide">Task Manager</h1>
          <div className="flex items-center space-x-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-600 shadow-sm"
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400 border border-gray-600 shadow-sm"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={resetFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md"
            >
              Reset
            </button>
            <button
              onClick={() => navigate("/task")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md"
            >
              Create Task
            </button>
          </div>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-700 text-sm font-semibold text-gray-300">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-lg text-gray-400">
                    No tasks available
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <motion.tr
                      key={task._id}
                      variants={taskRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td
                        className="py-3 px-4 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        {task.title}
                      </td>
                      <td className="py-3 px-4">{task.due_date.slice(0, 10)}</td>
                      <td className="py-3 px-4">
                        <Autocomplete
                          size="small"
                          options={statusOptions}
                          value={task.status}
                          onChange={() => handleTaskStatusChange(task._id)}
                          renderInput={(params) => (
                            <TextField {...params} className="bg-gray-700 text-white rounded-lg" />
                          )}
                        />
                      </td>
                      <td className="py-3 px-4 font-bold capitalize">{task.priority}</td>
                      <td className="py-3 px-4 space-x-3">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-lg"
                          onClick={() => handleTaskClick(task)}
                        >
                          View
                        </button>
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg shadow"
                          onClick={() => navigate(`/task/${task._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg shadow"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskDelete(task._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Task Modal */}
      <AnimatePresence>
        {showModal && (
          <TaskModal setShowModal={setShowModal} task={selectedTask} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;