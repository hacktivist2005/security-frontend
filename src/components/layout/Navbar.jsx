import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaBars, FaTimes, FaShieldAlt, FaMoon, FaSun, FaTerminal } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / (documentHeight || 1)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-colors duration-500 ${
        darkMode
          ? "bg-zinc-950/80 border-green-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-white/80 border-slate-200 shadow-md"
      }`}
    >

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5">
        {/* ================= LOGO ================= */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.2)] group-hover:border-green-400 group-hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-xl bg-green-400/10 blur-sm" />
            <FaShieldAlt className="relative text-green-400 text-2xl transition-transform duration-300 group-hover:scale-110" />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1
                className={`text-xl font-extrabold tracking-wider ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                OSINT
              </h1>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-[9px] font-mono text-green-400">
                <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                SYS.ONLINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-green-400/80 tracking-widest uppercase">
              Cyber Footprint Analyzer
            </p>
          </div>
        </Link>

        {/* ================= NAVIGATION (DESKTOP) ================= */}
        <div className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border ${
          darkMode ? "bg-zinc-900/60 border-zinc-800" : "bg-slate-100/80 border-slate-200"
        }`}>
          {navLinks.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-5 py-2 text-sm font-medium transition-colors duration-300"
              >
                {active && (
                  <motion.span
                    layoutId="navbar-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-xl ${
                      darkMode
                        ? "bg-green-500/15 border border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                        : "bg-white border border-slate-200 shadow-sm"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    active
                      ? "text-green-400 font-semibold"
                      : darkMode
                      ? "text-zinc-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`w-10 h-10 rounded-xl border transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 ${
              darkMode
                ? "bg-zinc-900 border-zinc-800 text-yellow-400 hover:border-green-500/40 hover:shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:border-green-500/40"
            }`}
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-base" />
            ) : (
              <FaMoon className="text-indigo-500 text-base" />
            )}
          </button>

          {/* Action Button */}
          {location.pathname === "/" ? (
            <a
              href="#hero"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-400 text-zinc-950 font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(74,222,128,0.45)]"
            >
              <FaTerminal className="text-xs" />
              Analyze Now
            </a>
          ) : (
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-400 text-zinc-950 font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(74,222,128,0.45)]"
            >
              Back to Home
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
              darkMode
                ? "bg-zinc-900 border-zinc-800 text-green-400"
                : "bg-slate-100 border-slate-200 text-slate-800"
            }`}
          >
            {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
          animate={{
            width: `${scrollProgress}%`,
          }}
          transition={{
            ease: "easeOut",
            duration: 0.1,
          }}
        />
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className={`fixed top-0 right-0 h-screen w-[80%] max-w-[320px] z-50 shadow-2xl flex flex-col justify-between border-l ${
                darkMode
                  ? "bg-zinc-950 border-green-500/20 text-white"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-green-500/20">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-400 text-xl" />
                    <div>
                      <h2 className="text-lg font-bold">OSINT System</h2>
                      <p className="text-[10px] font-mono text-green-400">COMMAND CONTROL</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="p-5 space-y-2">
                  {navLinks.map((item) => {
                    const active = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 font-medium ${
                          active
                            ? "bg-green-500/15 border border-green-500/30 text-green-400 font-semibold"
                            : darkMode
                            ? "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <span>{item.name}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Action */}
              <div className="p-6 border-t border-green-500/10">
                {location.pathname === "/" ? (
                  <a
                    href="#hero"
                    onClick={() => setMenuOpen(false)}
                    className="flex justify-center items-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-zinc-950 font-bold text-center"
                  >
                    <FaTerminal />
                    Analyze Now
                  </a>
                ) : (
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-zinc-950 font-bold text-center"
                  >
                    Back to Home
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;