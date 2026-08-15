import { useTheme } from "../../context/ThemeContext";
import {
  FaGithub,
  FaLinkedin,
  FaShieldAlt,
  FaGlobe,
  FaLock,
  FaServer,
  FaTerminal,
  FaChevronRight,
  FaBug,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

/* Small mono module badge for footer items */
function StatusBadge({ children }) {
  return (
    <span className="font-mono text-[11px] tracking-wider text-green-400/80 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
      {children}
    </span>
  );
}

function Footer() {
  const { darkMode } = useTheme();

  const bodyText = darkMode ? "text-gray-400" : "text-gray-600";
  const headingText = darkMode ? "text-white" : "text-slate-900";

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About System", path: "/about" },
    { name: "Intelligence Modules", path: "/features" },
    { name: "Contact Dispatch", path: "/contact" },
  ];

  const featuresList = [
    { icon: FaGlobe, name: "WHOIS Lookup" },
    { icon: FaServer, name: "DNS Intelligence" },
    { icon: FaLock, name: "SSL/TLS Analysis" },
    { icon: FaShieldAlt, name: "Security Headers" },
    { icon: FaChartLine, name: "Risk Score" },
    { icon: FaBug, name: "Port Recon" },
  ];

  const techStack = ["React", "Flask", "Tailwind CSS", "EmailJS"];

  return (
    <footer
      className={`relative mt-28 overflow-hidden border-t transition-colors duration-500 ${
        darkMode
          ? "border-green-900/60 bg-[#030712] text-white"
          : "border-gray-300 bg-slate-100 text-slate-900"
      }`}
    >
      {/* Background Scan-Grid Effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(${
            darkMode ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.06)"
          } 1px, transparent 1px), linear-gradient(90deg, ${
            darkMode ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.06)"
          } 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 80%)",
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-green-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-emerald-500/5 blur-[180px] rounded-full" />
      </div>

      {/* Top Cyber Command Status Bar */}
      <div className={`border-b ${darkMode ? "border-green-900/40 bg-zinc-950/60" : "border-gray-200 bg-white/60"} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>SYSTEM STATUS: ALL MODULES OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <span>CORE: v1.0.0</span>
            <span>•</span>
            <span>OSINT RECON</span>
            <span>•</span>
            <span>ENCRYPTED ENDPOINTS</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Description */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)] group-hover:scale-105 transition-all">
                <FaShieldAlt className="text-xl" />
              </div>
              <h2 className={`text-2xl font-bold tracking-tight ${headingText}`}>
                OSINT <span className="text-green-400">Analyzer</span>
              </h2>
            </Link>

            <p className={`text-sm leading-relaxed ${bodyText}`}>
              An advanced Open Source Intelligence suite designed for cybersecurity researchers, penetration testers, and OSINT analysts to gather actionable target intelligence.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <StatusBadge>v1.0 Release</StatusBadge>
              <StatusBadge>OSINT Engine</StatusBadge>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className={`text-sm font-mono uppercase tracking-wider text-green-400 mb-5 font-semibold`}>
              Navigation
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`inline-flex items-center gap-2 transition-all duration-300 hover:translate-x-1.5 ${
                      darkMode
                        ? "text-gray-400 hover:text-green-400"
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    <FaChevronRight className="text-[10px] text-green-400/60" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Intel Modules */}
          <div>
            <h3 className={`text-sm font-mono uppercase tracking-wider text-green-400 mb-5 font-semibold`}>
              Recon Modules
            </h3>
            <ul className="space-y-2.5 text-sm">
              {featuresList.map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 ${bodyText}`}
                >
                  <item.icon className="text-green-400 text-xs shrink-0" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect & Tech Stack */}
          <div>
            <h3 className={`text-sm font-mono uppercase tracking-wider text-green-400 mb-5 font-semibold`}>
              Connect Channels
            </h3>
            <p className={`text-xs ${bodyText} mb-4`}>
              Follow updates, inspect source repositories, or connect professionally.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/hacktivist2005"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  darkMode
                    ? "bg-zinc-900/80 border-green-900/60 text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                    : "bg-white border-gray-300 text-green-600 hover:bg-green-500 hover:text-black hover:border-green-500"
                }`}
              >
                <FaGithub className="text-xl" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohamed-ansari-5ab548321"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                  darkMode
                    ? "bg-zinc-900/80 border-green-900/60 text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                    : "bg-white border-gray-300 text-green-600 hover:bg-green-500 hover:text-black hover:border-green-500"
                }`}
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                Engine Powered By
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${
            darkMode ? "border-green-900/50 text-gray-500" : "border-gray-200 text-gray-600"
          }`}
        >
          <p>© 2026 OSINT Cyber Footprint Analyzer. All Rights Reserved.</p>

          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
              SECURE
            </span>
            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
              PRIVACY FIRST
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;