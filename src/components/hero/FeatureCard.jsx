import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  const { darkMode } = useTheme();

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        p-4
        sm:p-5
        md:p-6
        cursor-pointer
        transition-all
        duration-300
        backdrop-blur-xl
        ${
          darkMode
            ? "bg-slate-950/80 border border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-emerald-400/60 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
            : "bg-white/90 border border-emerald-100 shadow-md hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10"
        }
      `}
    >
      {/* Background Ambient Glow on Hover */}
      <div 
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-500/15 via-transparent to-teal-500/15 pointer-events-none rounded-2xl" 
      />

      {/* Cyber Grid Substrate Effect */}
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition duration-300 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
          backgroundSize: `16px 16px`,
        }}
      />

      {/* Icon Badge Container */}
      <div className="relative z-10 flex justify-center items-center mx-auto">
        <div
          className={`
            relative
            flex
            justify-center
            items-center
            w-12 h-12
            sm:w-14 sm:h-14
            md:w-16 md:h-16
            rounded-2xl
            border
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-3
            ${
              darkMode
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 shadow-[inset_0_0_15px_rgba(16,185,129,0.15)] group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-emerald-50 border-emerald-200 text-emerald-600 group-hover:bg-emerald-100 group-hover:border-emerald-300"
            }
          `}
        >
          {/* Inner Icon Glow Effect */}
          <div className="text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
            {icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4 text-center space-y-1">
        <h3
          className={`
            text-xs
            sm:text-sm
            md:text-base
            font-bold
            tracking-wide
            transition-colors
            duration-200
            ${
              darkMode 
                ? "text-slate-100 group-hover:text-emerald-300" 
                : "text-slate-900 group-hover:text-emerald-700"
            }
          `}
        >
          {title}
        </h3>

        {/* Optional Subtext / Description */}
        {description && (
          <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-mono">
            {description}
          </p>
        )}
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 group-hover:w-1/2 rounded-full" 
      />
    </motion.div>
  );
}

export default FeatureCard;