import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FaGlobe,
  FaSearch,
  FaLock,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCode,
  FaChartLine,
  FaFileAlt,
  FaBug,
} from "react-icons/fa";

/* Glowing icon chip — same signature used on the About page,
   so a feature card reads as an "active module" rather than a
   flat glyph-on-card. */
function IconBadge({ icon: Icon }) {
  return (
    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-xl">
      <span className="absolute inset-0 rounded-xl bg-green-400/10 blur-md" />
      <span className="absolute inset-0 rounded-xl border border-green-500/20" />
      <Icon className="relative text-3xl text-green-400" />
    </div>
  );
}

/* Small mono command tag — names the actual module instead of a
   decorative index number. */
function ModuleTag({ children }) {
  return (
    <span className="font-mono text-[11px] tracking-wide text-green-400/70">
      {children}
    </span>
  );
}

/* Counts up when scrolled into view. */
function AnimatedStat({ value, label }) {
  const numeric = parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric) && /^[0-9]+/.test(value);
  const suffix = isNumeric ? value.replace(/^[0-9]+/, "") : "";
  const [display, setDisplay] = useState(isNumeric ? 0 : value);
  const [started, setStarted] = useState(false);

  const handleEnter = () => {
    if (!isNumeric || started) return;
    setStarted(true);
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(numeric);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.div onViewportEnter={handleEnter} viewport={{ once: true, amount: 0.6 }}>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent break-words">
        {isNumeric ? `${display}${suffix}` : value}
      </h3>
    </motion.div>
  );
}

const FEATURES = [
  {
    icon: FaGlobe,
    tag: "/whois",
    title: "WHOIS Lookup",
    desc: "Retrieve comprehensive domain registration information including registrar, creation date, expiry date and ownership details.",
  },
  {
    icon: FaNetworkWired,
    tag: "/dns",
    title: "DNS Intelligence",
    desc: "Analyze DNS records including A, AAAA, MX, TXT, NS, CNAME and SOA records.",
  },
  {
    icon: FaLock,
    tag: "/ssl",
    title: "SSL Analysis",
    desc: "Inspect SSL certificates, TLS versions, cipher suites, validity period and security configuration.",
  },
  {
    icon: FaSearch,
    tag: "/ip-intel",
    title: "IP Intelligence",
    desc: "Discover IP address details including location, ASN, ISP, organization, timezone and hosting provider.",
  },
  {
    icon: FaBug,
    tag: "/ports",
    title: "Port Scanner",
    desc: "Detect open services, identify exposed ports and understand potential attack surfaces of target systems.",
  },
  {
    icon: FaShieldAlt,
    tag: "/headers",
    title: "Security Headers",
    desc: "Verify HTTP security headers like CSP, HSTS, X-Frame-Options and Content-Type protection.",
  },
  {
    icon: FaCode,
    tag: "/stack",
    title: "Technology Detection",
    desc: "Detect web technologies, frameworks, CMS, programming languages and server software.",
  },
  {
    icon: FaChartLine,
    tag: "/risk-score",
    title: "Risk Assessment",
    desc: "Calculate an overall security score based on reconnaissance results and provide actionable recommendations.",
  },
  {
    icon: FaFileAlt,
    tag: "/report",
    title: "Report Generation",
    desc: "Generate professional reports containing findings, security analysis, recommendations and technical observations.",
  },
  {
    icon: FaDatabase,
    tag: "/dashboard",
    title: "Unified Dashboard",
    desc: "View WHOIS, DNS, SSL, IP Intelligence, open ports and security assessment from a single interface.",
  },
];

const STATS = [
  { value: "10+", label: "Security Modules" },
  { value: "10+", label: "Security Checks" },
  { value: "1", label: "Unified Dashboard" },
  { value: "100%", label: "OSINT Based" },
];

function Features() {
  const { darkMode } = useTheme();

  const cardSurface = darkMode
    ? "bg-zinc-900 border-green-900"
    : "bg-white border-gray-300 shadow-lg";

  const bodyText = darkMode ? "text-gray-400" : "text-gray-600";
  const headingText = darkMode ? "text-white" : "text-black";

  return (
    <section
      className={`relative overflow-hidden min-h-screen px-5 sm:px-8 lg:px-10 py-16 lg:py-24 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <style>{`
        @keyframes features-ping {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
          75%, 100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>

      {/* faint scan-grid backdrop, fades toward the edges — same signature as About */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(${
            darkMode ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.08)"
          } 1px, transparent 1px), linear-gradient(90deg, ${
            darkMode ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.08)"
          } 1px, transparent 1px)`,
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 15%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 15%, black, transparent 75%)",
        }}
      />

      {darkMode && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.035] mix-blend-overlay"
        >
          <filter id="features-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#features-grain)" />
        </svg>
      )}

      <div className="relative max-w-7xl mx-auto">
        {/* ===================== Hero ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          {/* radar pulse rings behind the badge */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10">
            <span
              className="absolute w-52 h-52 -left-26 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/20"
              style={{ animation: "features-ping 3s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            <span
              className="absolute w-36 h-36 -left-18 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15"
              style={{ animation: "features-ping 3s cubic-bezier(0,0,0.2,1) infinite", animationDelay: "0.7s" }}
            />
          </div>

          <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/30 font-mono text-[13px] tracking-wide text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            root@osint-analyzer:~# ls modules/
          </span>

          <h1 className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ${headingText}`}>
            Professional
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}Cybersecurity Intelligence Features
            </span>
          </h1>

          <p className={`max-w-3xl mx-auto mt-8 leading-8 text-base sm:text-lg ${bodyText}`}>
            Explore a comprehensive suite of reconnaissance, threat
            intelligence and security assessment modules designed to help
            security professionals, researchers and students analyze
            internet-facing assets efficiently.
          </p>
        </motion.div>

        {/* ===================== Features Grid ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-20">
          {FEATURES.map(({ icon: Icon, tag, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl border p-7 transition-all duration-300 ${
                darkMode
                  ? "bg-zinc-900 border-green-900 hover:border-green-500/60 hover:shadow-[0_0_30px_-8px_rgba(74,222,128,0.35)]"
                  : "bg-white border-gray-300 shadow-lg hover:border-green-500/60"
              }`}
            >
              <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <IconBadge icon={Icon} />
                </div>
                <ModuleTag>{tag}</ModuleTag>
              </div>

              <h3 className={`mt-6 text-xl font-bold ${headingText}`}>{title}</h3>
              <p className={`mt-4 leading-7 ${bodyText}`}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===================== CTA ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`relative max-w-7xl mx-auto mt-24 rounded-3xl overflow-hidden border ${
          darkMode
            ? "border-green-900 bg-gradient-to-r from-green-950 via-zinc-900 to-black"
            : "border-gray-300 bg-gradient-to-r from-green-100 via-white to-green-50"
        }`}
      >
        {darkMode && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-green-400/[0.06] to-transparent"
            animate={{ top: ["-15%", "115%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative px-8 py-16 lg:px-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 font-mono text-[12px] tracking-wide text-green-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            ready when you are
          </span>

          <h2 className={`mt-5 text-4xl lg:text-5xl font-bold ${headingText}`}>
            Ready to Analyze
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}Your Target?
            </span>
          </h2>

          <p className={`max-w-3xl mx-auto mt-8 text-lg leading-8 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            Perform professional OSINT reconnaissance, gather intelligence,
            detect exposed services and generate detailed cybersecurity
            reports using a single platform.
          </p>

          <a
            href="/"
            className="inline-flex mt-10 px-10 py-4 rounded-2xl bg-green-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(74,222,128,0.35)]"
          >
            Analyze Now →
          </a>
        </div>
      </motion.div>

      {/* ===================== Platform Stats ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto mt-24"
      >
        <div className="text-center mb-14">
          <span className="text-green-400 uppercase tracking-[4px] text-sm font-mono font-semibold">
            Platform Highlights
          </span>

          <h2 className={`mt-4 text-4xl font-bold ${headingText}`}>
            Built for Modern
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}Cybersecurity
            </span>
          </h2>
        </div>

        <div
          className={`rounded-3xl border overflow-hidden ${
            darkMode
              ? "bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border-green-900"
              : "bg-gradient-to-r from-green-50 via-white to-green-50 border-gray-300 shadow-xl"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-4 sm:p-6 lg:p-10 text-center border-green-500/20 ${
          i % 2 === 0 ? "border-r lg:border-r-0" : ""
        } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
          i < 3 ? "lg:border-r" : ""
        }`}
      >
                <AnimatedStat {...stat} />
                <p className={`mt-2 sm:mt-4 text-xs sm:text-base ${bodyText}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Features;
