import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

// Pure SVG Icons for Zero External Dependencies
const GlobeIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const MailIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ServerIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const FileIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LinkIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const CogIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function DNSCard({ title, records = [] }) {
  const [expanded, setExpanded] = useState(false);
  const { darkMode } = useTheme();

  // Icon Selector
  const getRecordIcon = (cardTitle) => {
    const className = "w-5 h-5 sm:w-6 sm:h-6 text-emerald-400";
    if (cardTitle.includes("MX")) return <MailIcon className={className} />;
    if (cardTitle.includes("NS")) return <ServerIcon className={className} />;
    if (cardTitle.includes("TXT")) return <FileIcon className={className} />;
    if (cardTitle.includes("CNAME")) return <LinkIcon className={className} />;
    if (cardTitle.includes("SOA")) return <CogIcon className={className} />;
    return <GlobeIcon className={className} />;
  };

  const visibleRecords = expanded ? records : records.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative
        rounded-2xl
        p-5
        sm:p-6
        border
        backdrop-blur-xl
        transition-all
        duration-300
        shadow-xl
        overflow-hidden
        ${
          darkMode
            ? "bg-slate-950/80 border-emerald-500/20 shadow-[0_0_25px_-10px_rgba(16,185,129,0.15)]"
            : "bg-white/95 border-emerald-200 shadow-md"
        }
      `}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-500/10">
        <div className="flex items-center gap-3.5">
          {/* HUD Icon Badge */}
          <div className={`p-3 rounded-xl border ${
            darkMode 
              ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]" 
              : "bg-emerald-50 border-emerald-200 text-emerald-600"
          }`}>
            {getRecordIcon(title)}
          </div>

          <div>
            <h3 className={`text-base sm:text-lg font-mono font-bold tracking-wider uppercase ${
              darkMode ? "text-emerald-300" : "text-emerald-900"
            }`}>
              {title}
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              {records.length} {records.length === 1 ? "Record" : "Records"} Detected
            </p>
          </div>
        </div>

        {/* Dynamic Count Tag */}
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${
          records.length > 0
            ? darkMode
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-emerald-100 border-emerald-300 text-emerald-700"
            : "bg-slate-800/40 border-slate-700/50 text-slate-500"
        }`}>
          {records.length > 0 ? "RESOLVED" : "EMPTY"}
        </span>
      </div>

      {/* --- BODY --- */}
      {records.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-800/80 bg-slate-900/20">
          <p className="text-sm font-mono text-slate-500">
            [No DNS Records Returned For {title}]
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {visibleRecords.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`
                  rounded-xl
                  border
                  p-3.5
                  sm:p-4
                  transition-all
                  duration-200
                  ${
                    darkMode
                      ? "bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90 text-slate-200"
                      : "bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-800"
                  }
                `}
              >
                {typeof item === "string" ? (
                  <div className="flex items-start gap-3 font-mono text-xs sm:text-sm break-all">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-xs sm:text-sm">
                    {Object.entries(item).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-slate-800/50 pb-1.5 last:border-0 last:pb-0"
                      >
                        <span className="font-semibold uppercase tracking-wide text-emerald-400 text-[11px]">
                          {key.replace("_", " ")}
                        </span>
                        <span className="break-all text-slate-300">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Expand / Collapse Button */}
          {records.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`
                mt-4
                w-full
                py-2.5
                rounded-xl
                font-mono
                text-xs
                font-bold
                tracking-wider
                uppercase
                transition-all
                duration-300
                border
                flex
                items-center
                justify-center
                gap-2
                ${
                  darkMode
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400"
                    : "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                }
              `}
            >
              <span>{expanded ? "Collapse Records" : `Show All (${records.length})`}</span>
              <span className="text-xs">{expanded ? "▲" : "▼"}</span>
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}

export default DNSCard;