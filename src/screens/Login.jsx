


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../api";

// const LoginScreen = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { token } = await login({ username, password });
//       localStorage.setItem("token", token);
//       navigate("/");
//     } catch (error) {
//       setErrorMessage("Invalid username or password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
//       <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
//         <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
//           Welcome Back! 👋
//         </h1>
//         {errorMessage && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
//             {errorMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { motion } from "framer-motion";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password });
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <motion.div
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Welcome Back! 👋
        </h1>
        {errorMessage && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            {errorMessage}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;