import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// Pure SVG Icons
const CopyIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const TerminalIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// --- SAFE JSON STRINGIFIER (Prevents Circular JSON Crash) ---
const safeStringify = (obj) => {
  const cache = new Set();
  try {
    return JSON.stringify(
      obj,
      (key, val) => {
        if (typeof val === "object" && val !== null) {
          if (cache.has(val)) return "[Circular Reference]";
          cache.add(val);
        }
        return val;
      },
      2
    );
  } catch (err) {
    return String(obj);
  }
};

function ResultCard({ title, value }) {
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const isDataAvailable = value !== undefined && value !== null && value !== "" && value !== "Not Available";

  // Safe Copy Handler
  const handleCopy = () => {
    if (!isDataAvailable) return;
    const textToCopy = typeof value === "object" ? safeStringify(value) : String(value);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Smart Value Renderer
  const renderValue = () => {
    if (!isDataAvailable) {
      return (
        <span className="text-slate-500 font-mono text-xs sm:text-sm italic">
          [No Data Returned]
        </span>
      );
    }

    // React Element Check
    if (React.isValidElement(value)) {
      return value;
    }

    // Object or Array Check
    if (typeof value === "object") {
      return (
        <pre className="font-mono text-xs sm:text-sm overflow-x-auto p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 text-emerald-300">
          {safeStringify(value)}
        </pre>
      );
    }

    return (
      <p className={`font-mono text-xs sm:text-sm leading-relaxed break-all whitespace-pre-wrap ${
        darkMode ? "text-slate-200" : "text-slate-800"
      }`}>
        {String(value)}
      </p>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`
        group
        relative
        rounded-2xl
        overflow-hidden
        border
        backdrop-blur-xl
        transition-all
        duration-300
        shadow-lg
        ${
          darkMode
            ? "bg-slate-950/80 border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]"
            : "bg-white/95 border-emerald-200 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10"
        }
      `}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />

      {/* Header */}
      <div className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b transition-colors duration-300 ${
        darkMode
          ? "border-emerald-500/20 bg-emerald-950/30"
          : "border-emerald-100 bg-emerald-50/70"
      }`}>
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <TerminalIcon className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`} />
          <h3 className={`font-mono font-bold tracking-wider text-xs sm:text-sm truncate uppercase ${
            darkMode ? "text-emerald-300" : "text-emerald-800"
          }`}>
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
            isDataAvailable
              ? darkMode
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-emerald-100 border-emerald-300 text-emerald-700"
              : darkMode
                ? "bg-slate-800/80 border-slate-700 text-slate-400"
                : "bg-slate-100 border-slate-200 text-slate-500"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDataAvailable ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`} />
            {isDataAvailable ? "Active" : "N/A"}
          </span>

          {isDataAvailable && (
            <button
              onClick={handleCopy}
              title="Copy to Clipboard"
              className={`p-1.5 rounded-lg border transition-all duration-200 ${
                copied
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 scale-105"
                  : darkMode
                    ? "bg-slate-900 border-slate-700 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/50"
                    : "bg-white border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300"
              }`}
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 relative z-10">
        {renderValue()}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
    </motion.div>
  );
}

export default ResultCard;