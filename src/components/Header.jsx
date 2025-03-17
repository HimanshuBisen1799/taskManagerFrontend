import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.header
      className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 shadow-md"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">
            Task Manager
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
            <Link
              to="/"
              className="hover:underline text-gray-300 hover:text-white transition"
            >
              Home
            </Link>
          </motion.div>
          {!isLoggedIn && (
            <>
              <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
                <Link
                  to="/register"
                  className="hover:underline text-gray-300 hover:text-white transition"
                >
                  Register
                </Link>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap" variants={linkVariants}>
                <Link
                  to="/login"
                  className="hover:underline text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
              </motion.div>
            </>
          )}
          {isLoggedIn && (
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;