import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask } from "../api";
import { motion } from "framer-motion";

const TaskScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "pending",
  });

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem("token");
        const tasks = await getTasks(token);
        const task = tasks.find((t) => t._id === id);

        if (task) {
          setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.due_date,
            priority: task.priority,
            status: task.status,
          });
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { ...formData, due_date: formData.dueDate };
    delete payload.dueDate;

    if (id) {
      await updateTask(id, payload, token);
    } else {
      await createTask(payload, token);
    }
    navigate("/");
  };

  const handleCancel = () => navigate("/");

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-6">
      <motion.div
        className="bg-white backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          {id ? "Edit Task" : "Create Task"}
        </h2>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Task Title"
            />
          </div>
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Task Description"
            />
          </div>
          <div>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-between space-x-4 mt-4">
            <motion.button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Task
            </motion.button>
            <motion.button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default TaskScreen;