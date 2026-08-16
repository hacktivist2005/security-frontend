import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaGlobe,
  FaSearch,
  FaNetworkWired,
  FaLock,
  FaDatabase,
  FaBug,
  FaChartLine,
} from "react-icons/fa";

/* ============================================================
   Simulated recon session — the signature element.
   Mirrors what the platform actually does: chains recon
   commands and prints a result line for each.
============================================================ */
const SCAN_LINES = [
  { cmd: "whois target.com", result: "registrar & creation date resolved" },
  { cmd: "dig target.com ANY", result: "12 DNS records enumerated" },
  { cmd: "sslscan target.com:443", result: "TLS 1.3 · cert chain verified" },
  { cmd: "nmap -sV target.com", result: "open ports mapped, services fingerprinted" },
  { cmd: "whatweb target.com", result: "stack + CMS identified" },
  { cmd: "risk-score --generate", result: "exposure score: 82 / 100" },
];

function TerminalPanel({ darkMode }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = SCAN_LINES[lineIndex % SCAN_LINES.length];

  useEffect(() => {
    if (!showResult) {
      if (charIndex < current.cmd.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 32);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setShowResult(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShowResult(false);
      setCharIndex(0);
      setLineIndex((i) => i + 1);
    }, 1200);
    return () => clearTimeout(t);
  }, [charIndex, showResult, current.cmd.length]);

  const history = Array.from({ length: lineIndex % SCAN_LINES.length }).map(
    (_, i) => SCAN_LINES[i]
  );

  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-green-500/40 via-green-500/10 to-transparent shadow-2xl shadow-green-500/10">
      <div
        className={`relative rounded-2xl overflow-hidden ${
          darkMode ? "bg-[#070a09]" : "bg-[#0b0f0d]"
        }`}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-3 font-mono text-[11px] tracking-wider text-gray-500">
            recon-session.log
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-green-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            live
          </span>
        </div>

        {/* body */}
        <div className="relative p-5 sm:p-6 h-[248px] sm:h-[268px] overflow-hidden font-mono text-[12.5px] sm:text-[13px] leading-6">
          {/* scanning light sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-green-400/[0.07] to-transparent"
            animate={{ top: ["-15%", "115%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          />

          {history.slice(-4).map((line, i) => (
            <div key={i} className="mb-2.5">
              <p className="text-gray-400">
                <span className="text-green-400">root@osint</span>
                <span className="text-gray-600">:~$ </span>
                <span className="text-gray-300">{line.cmd}</span>
              </p>
              <p className="text-green-500/70 pl-1">✓ {line.result}</p>
            </div>
          ))}

          <p className="text-gray-400">
            <span className="text-green-400">root@osint</span>
            <span className="text-gray-600">:~$ </span>
            <span className="text-gray-200">{current.cmd.slice(0, charIndex)}</span>
            <span className="inline-block w-[7px] h-[15px] bg-green-400 align-middle ml-0.5 translate-y-[1px] animate-pulse" />
          </p>
          {showResult && (
            <p className="text-green-500/70 pl-1">✓ {current.result}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Small mono tag used on capability cards — names the actual
   module/command instead of a decorative index number. */
function ModuleTag({ children }) {
  return (
    <span className="font-mono text-[11px] tracking-wide text-green-400/70">
      {children}
    </span>
  );
}

/* Glowing icon chip — reused across capability + workflow cards
   so every module reads as "active" rather than a flat glyph. */
function IconBadge({ icon: Icon, size = "md" }) {
  const dims = size === "lg" ? "w-16 h-16" : "w-14 h-14";
  const iconSize = size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <div className={`relative inline-flex items-center justify-center ${dims} rounded-xl`}>
      <span className="absolute inset-0 rounded-xl bg-green-400/10 blur-md" />
      <span className="absolute inset-0 rounded-xl border border-green-500/20" />
      <Icon className={`relative ${iconSize} text-green-400`} />
    </div>
  );
}

/* Counts up when scrolled into view — turns the stats band into
   a live readout instead of static labels. */
function AnimatedStat({ value, label, bodyText }) {
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
    <motion.div
      onViewportEnter={handleEnter}
      viewport={{ once: true, amount: 0.6 }}
      className="p-4 sm:p-6 lg:p-10 text-center"
    >
      <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent break-words">
        {isNumeric ? `${display}${suffix}` : value}
      </h2>
      <p className={`mt-2 sm:mt-4 text-xs sm:text-base ${bodyText}`}>{label}</p>
    </motion.div>
  );
}

function About() {
  const { darkMode } = useTheme();

  const cardSurface = darkMode
    ? "bg-zinc-900 border-green-900"
    : "bg-white border-gray-200 shadow-lg";

  const bodyText = darkMode ? "text-gray-400" : "text-gray-700";
  const headingText = darkMode ? "text-white" : "text-black";

  return (
    <section
      id="about"
      className={`relative overflow-hidden max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <style>{`
        @keyframes about-ping {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
          75%, 100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>

      {/* faint scan-grid backdrop, fades toward the edges */}
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
            "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent 75%)",
        }}
      />

      {/* film-grain texture — adds tactile depth instead of a flat gradient */}
      {darkMode && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.035] mix-blend-overlay"
        >
          <filter id="about-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#about-grain)" />
        </svg>
      )}

      {/* ===================== Hero ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        {/* radar pulse rings behind the badge */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10">
          <span
            className="absolute w-52 h-52 -left-26 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/20"
            style={{ animation: "about-ping 3s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span
            className="absolute w-36 h-36 -left-18 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15"
            style={{ animation: "about-ping 3s cubic-bezier(0,0,0.2,1) infinite", animationDelay: "0.7s" }}
          />
        </div>

        <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/30 font-mono text-[13px] tracking-wide text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          root@osint-analyzer:~# whoami
        </span>

        <h1 className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ${headingText}`}>
          About
          <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
            {" "}OSINT Cyber Footprint Analyzer
          </span>
        </h1>

        <p className={`mt-8 max-w-4xl mx-auto leading-8 text-base sm:text-lg ${bodyText}`}>
          A cybersecurity intelligence platform that collects, analyzes and
          visualizes publicly available information about internet-facing
          assets — turning scattered reconnaissance data into a single,
          readable picture.
          <br />
          <br />
          It combines multiple reconnaissance techniques into one
          professional dashboard, so security professionals, penetration
          testers, students and researchers can gather intelligence faster
          and with less tab-switching.
        </p>
      </motion.div>

      {/* ===================== Platform Overview ===================== */}
      <div className="grid lg:grid-cols-2 gap-14 mt-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-green-400 uppercase tracking-[3px] font-mono text-sm font-semibold">
            Platform Overview
          </span>

          <h2 className={`mt-4 text-4xl font-bold ${headingText}`}>
            Unified Cyber Intelligence Dashboard
          </h2>

          <p className={`mt-8 leading-8 ${bodyText}`}>
            Modern cybersecurity investigations usually require analysts to
            juggle separate tools for WHOIS lookup, DNS enumeration, SSL
            inspection, IP intelligence, HTTP analysis and technology
            fingerprinting.
            <br />
            <br />
            OSINT Cyber Footprint Analyzer folds all of that into one
            workflow — reducing investigation time while improving overall
            coverage.
            <br />
            <br />
            Every scan returns actionable intelligence alongside a security
            analysis, so you understand a domain's exposure at a glance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TerminalPanel darkMode={darkMode} />
        </motion.div>
      </div>

      {/* ===================== Core Capabilities ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-24"
      >
        <div className="text-center mb-14">
          <span className="text-green-400 uppercase tracking-[4px] text-sm font-mono font-semibold">
            Platform Features
          </span>
          <h2 className={`mt-4 text-4xl font-bold ${headingText}`}>
            Core Capabilities
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto leading-8 ${bodyText}`}>
            Reconnaissance and security modules, unified into one dashboard,
            for fast and comprehensive assessments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
          {[
            {
              icon: FaGlobe,
              tag: "/recon",
              title: "OSINT Intelligence",
              desc: "WHOIS, DNS, IP intelligence, SSL and technology fingerprinting.",
            },
            {
              icon: FaNetworkWired,
              tag: "/network",
              title: "Network Analysis",
              desc: "Open port scanning, subdomain enumeration and infrastructure discovery.",
            },
            {
              icon: FaLock,
              tag: "/security",
              title: "Security Analysis",
              desc: "Risk assessment, security headers, WAF detection and SSL analysis.",
            },
            {
              icon: FaDatabase,
              tag: "/report",
              title: "Reporting",
              desc: "Professional PDF reports with findings, recommendations and a security score.",
            },
          ].map(({ icon: Icon, tag, title, desc }) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl border p-7 transition-all duration-300 ${
                darkMode
                  ? "bg-zinc-900 border-green-900 hover:border-green-500/60 hover:shadow-[0_0_30px_-8px_rgba(74,222,128,0.35)]"
                  : "bg-white border-gray-200 shadow-lg hover:border-green-500/60"
              }`}
            >
              <span
                className={`absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="flex items-center justify-between">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <IconBadge icon={Icon} />
                </div>
                <ModuleTag>{tag}</ModuleTag>
              </div>
              <h3 className={`mt-5 text-xl font-bold ${headingText}`}>{title}</h3>
              <p className={`mt-4 leading-7 ${bodyText}`}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===================== Workflow ===================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-28"
      >
        <div className="text-center mb-16">
          <span className="text-green-400 uppercase tracking-[4px] text-sm font-mono font-semibold">
            Workflow
          </span>
          <h2 className={`mt-4 text-4xl font-bold ${headingText}`}>
            How the Platform Works
          </h2>
          <p className={`mt-6 max-w-3xl mx-auto leading-8 ${bodyText}`}>
            Every scan follows a structured reconnaissance pipeline, pulling
            multiple intelligence sources into one assessment.
          </p>
        </div>

        <div className="relative grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div
            aria-hidden
            className="hidden xl:block absolute top-[68px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"
          />

          {[
            {
              step: "01",
              icon: FaSearch,
              title: "Target Collection",
              desc: "User submits a target domain for analysis.",
            },
            {
              step: "02",
              icon: FaGlobe,
              title: "Intelligence Gathering",
              desc: "WHOIS, DNS, SSL, HTTP, IP intelligence and technology detection.",
            },
            {
              step: "03",
              icon: FaBug,
              title: "Security Analysis",
              desc: "Ports, headers, WAF, SSL configuration and exposure are analyzed.",
            },
            {
              step: "04",
              icon: FaChartLine,
              title: "Risk Assessment",
              desc: "A final security score, findings and recommendations are generated.",
            },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div
              key={step}
              className={`relative rounded-2xl p-8 border ${cardSurface}`}
            >
              <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-mono text-sm text-black font-bold shadow-[0_0_16px_rgba(74,222,128,0.5)]">
                {step}
              </div>
              <div className="mt-4">
                <IconBadge icon={Icon} size="lg" />
              </div>
              <h3 className={`mt-6 text-xl font-bold ${headingText}`}>{title}</h3>
              <p className={`mt-4 leading-7 ${bodyText}`}>{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===================== Why Choose This Platform ===================== */}
      <div className="mt-28">
        <div className="text-center">
          <span className="text-green-400 uppercase tracking-[4px] text-sm font-mono font-semibold">
            Why Choose This Platform
          </span>
          <h2 className={`mt-4 text-3xl sm:text-4xl font-bold ${headingText}`}>
            Everything You Need For
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}OSINT Reconnaissance
            </span>
          </h2>
          <p className={`max-w-3xl mx-auto mt-5 leading-8 ${bodyText}`}>
            Instead of stitching together separate online tools, this
            platform combines essential reconnaissance modules into one
            dashboard — for faster analysis and clearer visibility into a
            target's public security footprint.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          <div className={`rounded-2xl p-8 border ${cardSurface}`}>
            <h3 className="text-green-400 text-2xl font-bold mb-6">
              Platform Highlights
            </h3>
            <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {[
                "WHOIS Intelligence",
                "DNS Enumeration",
                "IP Intelligence",
                "SSL Certificate Analysis",
                "Open Port Scanner",
                "Security Header Inspection",
                "Technology Detection",
                "WAF & CDN Detection",
                "Security Risk Assessment",
                "PDF Report Generation",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px]">
                    ✓
                  </span>
                  <span className="text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl p-8 border ${cardSurface}`}>
            <h3 className="text-green-400 text-2xl font-bold mb-6">Built For</h3>
            <p className={`leading-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              This platform is suitable for:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Cybersecurity Students",
                "Ethical Hackers",
                "Penetration Testers",
                "SOC Analysts",
                "Blue Team",
                "Researchers",
                "Developers",
                "Security Enthusiasts",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30 font-mono text-[13px] text-green-300 transition-colors duration-200 hover:bg-green-500/25 hover:border-green-500/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Platform Statistics ===================== */}
      <div className="mt-28">
        <div
          className={`rounded-3xl border overflow-hidden ${
            darkMode
              ? "bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border-green-900"
              : "bg-gradient-to-r from-green-50 via-white to-green-50 border-gray-300 shadow-xl"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10+", label: "Intelligence Modules" },
              { value: "10+", label: "Security Checks" },
              { value: "PDF", label: "Professional Reports" },
              { value: "100%", label: "OSINT Based Analysis" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`border-green-500/20 ${
            i % 2 === 0 ? "border-r lg:border-r-0" : ""
          } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
            i < 3 ? "lg:border-r" : ""
          }`}
        >
                <AnimatedStat {...stat} bodyText={bodyText} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== Closing ===================== */}
      <div className="mt-20 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 font-mono text-[12px] tracking-wide text-green-400/80">
          <FaShieldAlt className="text-xs" />
          scan complete
        </span>

        <h2 className={`mt-5 text-4xl font-bold ${headingText}`}>
          One Platform.
          <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
            {" "}Complete Cyber Intelligence.
          </span>
        </h2>

        <p className={`max-w-4xl mx-auto mt-6 leading-8 ${bodyText}`}>
          Built to simplify OSINT reconnaissance by combining multiple
          security intelligence modules into one modern dashboard — for
          faster analysis, better visibility and professional reporting.
        </p>
      </div>
    </section>
  );
}

export default About;
