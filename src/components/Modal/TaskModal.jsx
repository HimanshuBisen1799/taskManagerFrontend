import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function TaskModal({ task, setShowModal }) {
  // Animation Variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative w-[90%] max-w-lg bg-white text-gray-900 rounded-lg shadow-lg p-6"
          variants={modalVariants}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Task Content */}
          <div className="flex flex-col gap-4">
            {/* Task Title */}
            <h1 className="text-xl font-bold text-green-700">{task.title}</h1>

            {/* Task Description */}
            <p className="text-gray-800 text-base">{task.description}</p>

            {/* Status Badge */}
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                task.status === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 text-gray-900"
              }`}
            >
              {task.status}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-6 text-right">
            <motion.button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TaskModal;