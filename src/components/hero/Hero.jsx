import DNSCard from "../results/DNSCard";
import ResultCard from "../results/ResultCard";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import FeatureCard from "./FeatureCard";
import LoadingCard from "../results/LoadingCard";
import "react-circular-progressbar/dist/styles.css";


import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import {
  FaGlobe,
  FaLock,
  FaServer,
  FaShieldAlt,
  FaUserSecret,
  FaFilePdf,
  FaTerminal,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaNetworkWired,
  FaBug,
  FaArrowUp,
} from "react-icons/fa";

const formatServer = (server) => {
  if (!server) return "🌐 Unknown Server";
  if (server === "gws") return "🌐 Google Web Server (gws)";
  if (server === "LiteSpeed") return "🌐 LiteSpeed";
  if (server === "cloudflare") return "☁ Cloudflare";
  if (server === "nginx") return "🌐 Nginx";
  if (server === "Apache") return "🌐 Apache";
  return `🌐 ${server}`;
};

const icons = {
  "javascript-frameworks": "⚛",
  "javascript-libraries": "📚",
  "font-scripts": "🖋",
  "web-servers": "🌐",
  "video-players": "🎥",
  cms: "📰",
  analytics: "📊",
  widgets: "🧩",
};

const formatSSLDate = (dateString) => {
  if (!dateString) return "Not Available";

  const date = new Date(dateString);

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

/* Reusable Cyber Section Title Component */
function SectionTitle({ icon: Icon, title, moduleTag }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-14 sm:mt-16 md:mt-20 mb-6 sm:mb-8 border-b border-green-500/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 sm:h-9 rounded-full bg-gradient-to-b from-green-400 to-emerald-600 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
        <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
          <Icon className="text-xl" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-green-400">
          {title}
        </h2>
      </div>
      {moduleTag && (
        <span className="font-mono text-xs text-green-400/70 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 self-start sm:self-auto">
          [{moduleTag}]
        </span>
      )}
    </div>
  );
}

function Hero() {
  const [result, setResult] = useState(null);
  const [findingFilter, setFindingFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [showAllNS, setShowAllNS] = useState(false);
  const { darkMode } = useTheme();

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const countryNames = {
    IN: "India",
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    FR: "France",
    DE: "Germany",
    JP: "Japan",
    SG: "Singapore",
    CN: "China",
    AE: "United Arab Emirates",
  };

  const countryFlags = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    Iceland: "🇮🇸",
    Germany: "🇩🇪",
    France: "🇫🇷",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
    Japan: "🇯🇵",
    Singapore: "🇸🇬",
  };

  const features = [
    { icon: <FaGlobe />, title: "WHOIS Lookup" },
    { icon: <FaServer />, title: "DNS Records" },
    { icon: <FaLock />, title: "SSL Check" },
    { icon: <FaShieldAlt />, title: "Security Headers" },
    { icon: <FaNetworkWired />, title: "IP Information" },
    { icon: <FaUserSecret />, title: "Username Search" },
    { icon: <FaFilePdf />, title: "PDF Report" },
    { icon: <FaBug />, title: "Risk Score" },
  ];

  const downloadPDF = async () => {
    if (!result) return;

    try {
      const response = await fetch("https://security-scanner-api-6rct.onrender.com/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `OSINT_Report_${result.whois?.domain || "Target"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Unable to generate PDF report.");
    }
  };

  return (
    
    <section
      id="hero"
      className={`relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center transition-colors duration-500 ${
        darkMode ? "text-white" : "text-slate-900"
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-green-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2d1e_1px,transparent_1px),linear-gradient(to_bottom,#0f2d1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(74,222,128,0.15)]"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]" />
        <span className="text-green-400 text-xs sm:text-sm font-mono tracking-wider font-semibold">
          NEXT-GEN OSINT INTELLIGENCE ENGINE
        </span>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-green-400 drop-shadow-[0_0_35px_rgba(74,222,128,0.4)] tracking-tight"
      >
        OSINT Cyber
      </motion.h1>

      <h2
        className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-1 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        Footprint Analyzer
      </h2>

      <p
        className={`mt-6 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Discover digital footprints using WHOIS, DNS, SSL, IP intelligence,
        technology detection, and vulnerability reconnaissance — all from one
        unified command dashboard.
      </p>

      {/* Search Bar Component */}
      <div className="mt-10">
        <SearchBox
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      {loading && <LoadingCard />}

      {/* Feature Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5 mt-12 sm:mt-16">
        {features.map((item, index) => (
          <FeatureCard key={index} icon={item.icon} title={item.title} />
        ))}
      </div>

      {/* RESULTS DISPLAY AREA */}
      {result && !result.success ? (
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-center backdrop-blur-xl shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400 text-3xl mb-4">
              <FaTimesCircle />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-400">
              Analysis Failed
            </h2>
            <p className="mt-3 text-lg font-medium text-red-200">
              {result.message}
            </p>
            <p className="mt-2 text-sm text-gray-400 font-mono">
              Please verify the domain or IP target and try again.
            </p>
          </div>
        </div>
      ) : (
        result && (
          <div className="mt-20 text-left">
            {/* Target Domain HUD Header Card */}
            <div className="mb-12">
              <div
                className={`rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all duration-300 backdrop-blur-xl ${
                  darkMode
                    ? "bg-zinc-950/80 border-green-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                    : "bg-white border-slate-200 shadow-xl"
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left Target Badge */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-green-500/10 border border-green-500/30 font-mono text-xs text-green-400 font-bold">
                        TARGET_LOCKED
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        • RECON COMPLETED
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold break-all tracking-tight flex items-center gap-3">
                      <span className="text-green-400">🌐</span>
                      {result.whois.domain}
                    </h1>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm shadow-[0_0_15px_rgba(74,222,128,0.25)]">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Target Active
                      </span>

                      <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-400 px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm">
                        ✔ Verified Registrar
                      </span>
                    </div>
                  </div>

                  {/* Right Meta Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl">
                    <div>
                      <div className="text-gray-400 text-xs font-mono uppercase">
                        Registrar
                      </div>
                      <div className="font-bold text-sm mt-1 break-all">
                        {result.whois.registrar}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-xs font-mono uppercase">
                        Country
                      </div>
                      <div className="font-bold text-sm mt-1">
                        {result.whois.country
                          ? `${countryFlags[result.whois.country] || "🌍"} ${
                              result.whois.country
                            }`
                          : "🌍 Not Available"}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-xs font-mono uppercase">
                        Created
                      </div>
                      <div className="font-bold text-sm mt-1 font-mono">
                        {result.whois.creation_date}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-400 text-xs font-mono uppercase">
                        Expiration
                      </div>
                      <div className="font-bold text-sm mt-1 font-mono">
                        {result.whois.expiration_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WHOIS INFORMATION */}
            <SectionTitle
              icon={FaGlobe}
              title="WHOIS Reconnaissance"
              moduleTag="MOD-01 // WHOIS"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <ResultCard title="Domain" value={result.whois.domain} />
              <ResultCard title="Domain Type" value={result.whois.domain_type} />
              <ResultCard
                title="Domain Health"
                value={
                  result.whois.health === "Excellent"
                    ? "🟢 Excellent"
                    : result.whois.health === "Healthy"
                    ? "🟢 Healthy"
                    : result.whois.health === "Warning"
                    ? "🟡 Warning"
                    : result.whois.health === "Critical"
                    ? "🟠 Critical"
                    : result.whois.health === "Expired"
                    ? "🔴 Expired"
                    : "⚪ Unknown"
                }
              />
              <ResultCard title="Registrar" value={result.whois.registrar} />
              <ResultCard
                title="Registrar Website"
                value={
                  result.whois.registrar_url !== "Not Available" ? (
                    <a
                      href={result.whois.registrar_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 underline inline-flex items-center gap-1 hover:text-green-300"
                    >
                      Visit Website <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    "Not Available"
                  )
                }
              />
              <ResultCard
                title="Country"
                value={
                  result.whois.country
                    ? `${countryFlags[result.whois.country] || "🌍"} ${
                        countryNames[result.whois.country] || result.whois.country
                      }`
                    : "🌍 Not Available"
                }
              />
              <ResultCard title="Created" value={result.whois.creation_date} />
              <ResultCard
                title="Registrant Email"
                value={
                  Array.isArray(result.whois.registrant_email)
                    ? result.whois.registrant_email.join(", ")
                    : result.whois.registrant_email
                }
              />
              <ResultCard
                title="Registrar Abuse Email"
                value={
                  Array.isArray(result.whois.abuse_email)
                    ? result.whois.abuse_email.join(", ")
                    : result.whois.abuse_email
                }
              />
              <ResultCard title="Expires" value={result.whois.expiration_date} />
              <ResultCard title="Domain Age" value={result.whois.domain_age} />
              <ResultCard
                title="Status"
                value={
                  <div className="flex flex-wrap gap-1.5">
                    {result.whois.status?.map((item, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                }
              />
              <ResultCard
                title="Name Servers"
                value={
                  <div className="space-y-2">
                    {(showAllNS
                      ? result.whois.name_servers
                      : result.whois.name_servers?.slice(0, 3)
                    )?.map((server, index) => (
                      <div
                        key={index}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 break-all text-xs font-mono text-green-300"
                      >
                        {server}
                      </div>
                    ))}

                    {result.whois.name_servers?.length > 3 && (
                      <button
                        onClick={() => setShowAllNS(!showAllNS)}
                        className="text-xs text-green-400 hover:text-green-300 font-semibold transition"
                      >
                        {showAllNS
                          ? "▲ Show Less"
                          : `▼ Show ${result.whois.name_servers.length - 3} More`}
                      </button>
                    )}
                  </div>
                }
              />
            </div>

            {/* DNS RECORDS */}
            <SectionTitle
              icon={FaServer}
              title="DNS Resolution"
              moduleTag="MOD-02 // DNS"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <DNSCard title="A Records" records={result.dns.A} />
              <DNSCard title="AAAA Records" records={result.dns.AAAA} />
              <DNSCard title="MX Records" records={result.dns.MX} />
              <DNSCard title="NS Records" records={result.dns.NS} />
              <DNSCard title="TXT Records" records={result.dns.TXT} />
              <DNSCard title="CNAME Records" records={result.dns.CNAME} />
              <DNSCard
                title="SOA Records"
                records={
                  result.dns.SOA && Object.keys(result.dns.SOA).length > 0
                    ? [result.dns.SOA]
                    : []
                }
              />
            </div>

            {/* IP INTELLIGENCE */}
            <SectionTitle
              icon={FaNetworkWired}
              title="IP Intelligence"
              moduleTag="MOD-03 // IP_GEO"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <ResultCard title="IP Address" value={result.ip.ip} />
              <ResultCard
                title="Country"
                value={`${countryFlags[result.ip.country_code] || "🌍"} ${
                  result.ip.country
                }`}
              />
              <ResultCard title="Region" value={result.ip.region} />
              <ResultCard title="City" value={result.ip.city} />
              <ResultCard title="ISP" value={result.ip.isp} />
              <ResultCard title="Timezone" value={result.ip.timezone} />
              <ResultCard
                title="Organization"
                value={result.ip.organization ?? "Not Available"}
              />
              <ResultCard title="ASN" value={result.ip.asn ?? "Not Available"} />
              <ResultCard
                title="Reverse DNS"
                value={result.ip.hostname ?? "Not Available"}
              />
              <ResultCard
                title="Network Owner"
                value={result.ip.network_domain ?? "Not Available"}
              />
              <ResultCard
                title="Coordinates"
                value={`${result.ip.latitude}°, ${result.ip.longitude}°`}
              />
              <ResultCard
                title="Google Maps"
                value={
                  <a
                    href={`https://www.google.com/maps?q=${result.ip.latitude},${result.ip.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline hover:text-green-300 inline-flex items-center gap-1 text-sm"
                  >
                    🗺 Open in Google Maps <FaExternalLinkAlt className="text-xs" />
                  </a>
                }
              />
            </div>

            {/* PORT SCANNER */}
            <SectionTitle
              icon={FaBug}
              title="Port Reconnaissance"
              moduleTag="MOD-04 // PORTS"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div
                className={`rounded-2xl border p-5 text-center ${
                  darkMode
                    ? "border-green-500/20 bg-zinc-950"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-3xl font-extrabold text-green-400 font-mono">
                  {result.ports.total}
                </div>
                <div className="mt-1 text-xs font-mono text-gray-400 uppercase">
                  Common Ports Scanned
                </div>
              </div>

              <div
                className={`rounded-2xl border p-5 text-center ${
                  darkMode
                    ? "border-green-500/20 bg-zinc-950"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-3xl font-extrabold text-green-400 font-mono">
                  {result.ports.open}
                </div>
                <div className="mt-1 text-xs font-mono text-gray-400 uppercase">
                  Open Services
                </div>
              </div>

              <div
                className={`rounded-2xl border p-5 text-center ${
                  darkMode
                    ? "border-green-500/20 bg-zinc-950"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-3xl font-extrabold text-red-400 font-mono">
                  {result.ports.closed}
                </div>
                <div className="mt-1 text-xs font-mono text-gray-400 uppercase">
                  Closed Ports
                </div>
              </div>
            </div>

            <div className="max-h-[380px] overflow-y-auto pr-2 custom-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.ports.ports.map((port) => (
                  <ResultCard
                    key={port.port}
                    title={`${port.port} • ${port.service}`}
                    value={
                      <div className="space-y-1.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                            port.status === "Open"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {port.status}
                        </span>

                        {port.status === "Open" && (
                          <div className="text-xs text-gray-400 break-all font-mono">
                            Banner: {port.banner}
                          </div>
                        )}
                      </div>
                    }
                  />
                ))}
              </div>
            </div>

            {/* SSL CERTIFICATE */}
            <SectionTitle
              icon={FaLock}
              title="SSL/TLS Encryption"
              moduleTag="MOD-05 // SSL"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <ResultCard
                title="Status"
                value={
                  result.ssl.status === "Valid" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      VALID CERTIFICATE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      INVALID CERTIFICATE
                    </span>
                  )
                }
              />
              <ResultCard title="Issued To" value={`🌐 ${result.ssl.issued_to}`} />
              <ResultCard title="Issued By" value={`🏢 ${result.ssl.issued_by}`} />
              <ResultCard
                title="TLS Version"
                value={
                  <span className="inline-block px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">
                    {result.ssl.tls_version}
                  </span>
                }
              />
              <ResultCard
                title="Cipher"
                value={
                  <span className="font-mono text-green-300 text-xs break-all">
                    {result.ssl.cipher}
                  </span>
                }
              />
              <ResultCard title="Valid From" value={formatSSLDate(result.ssl.valid_from)} />
              <ResultCard title="Valid Until" value={formatSSLDate(result.ssl.valid_to)} />
              <ResultCard
                title="Days Remaining"
                value={
                  <span
                    className={`font-mono font-bold text-base ${
                      result.ssl.days_remaining > 60
                        ? "text-green-400"
                        : result.ssl.days_remaining > 30
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {result.ssl.days_remaining} Days
                  </span>
                }
              />
            </div>

            {/* SECURITY HEADERS */}
            <SectionTitle
              icon={FaShieldAlt}
              title="Security Headers"
              moduleTag="MOD-06 // HEADERS"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Object.entries(result.headers).map(([key, value]) => (
                <ResultCard
                  key={key}
                  title={key.replaceAll("-", " ")}
                  value={
                    <>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${
                          value
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            value ? "bg-green-400" : "bg-red-400"
                          }`}
                        />
                        {value ? "Present" : "Missing"}
                      </span>

                      <div
                        className={`mt-3 text-xs leading-relaxed break-all font-mono ${
                          value ? "text-gray-300" : "text-gray-500 italic"
                        }`}
                      >
                        {value ? value : "Not Configured"}
                      </div>
                    </>
                  }
                />
              ))}
            </div>

            {/* TECHNOLOGY DETECTION */}
            <SectionTitle
              icon={FaTerminal}
              title="Technology Stack"
              moduleTag="MOD-07 // TECH"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Object.entries(result.technology || {})
                .filter(([_, values]) => Array.isArray(values) && values.length > 0)
                .map(([category, values]) => (
                  <ResultCard
                    key={category}
                    title={`${icons[category] || "🔹"} ${category
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}`}
                    value={
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(values) ? (
                          values.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono break-all"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-red-400">{String(values)}</span>
                        )}
                      </div>
                    }
                  />
                ))}
            </div>

            {/* HTTP INFORMATION */}
            <SectionTitle
              icon={FaGlobe}
              title="HTTP Configuration"
              moduleTag="MOD-08 // HTTP"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <ResultCard
                title="HTTP Status"
                value={
                  <span className="text-green-400 font-mono font-semibold text-sm">
                    🟢 {result.http?.status_code} OK
                  </span>
                }
              />
              <ResultCard
                title="Web Server"
                value={formatServer(result.http?.server)}
              />
              <ResultCard
                title="Powered By"
                value={`⚙ ${result.http?.powered_by}`}
              />
              <ResultCard
                title="HTTP Version"
                value={`📡 ${result.http?.http_version}`}
              />
              <ResultCard title="Content Type" value={result.http?.content_type} />
              <ResultCard
                title="Compression"
                value={`🗜 ${result.http?.compression}`}
              />
              <ResultCard
                title="Redirect"
                value={result.http?.redirect ? "🟢 Enabled" : "🔴 Disabled"}
              />
              <ResultCard
                title="Cookies"
                value={
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                      result.http?.cookies === "Present"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {result.http?.cookies}
                  </span>
                }
              />
              <ResultCard
                title="Final URL"
                value={
                  <a
                    href={result.http?.final_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 hover:text-green-300 underline break-all text-xs font-mono inline-flex items-center gap-1"
                  >
                    Visit Website <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                }
              />
            </div>

            {/* WAF DETECTION */}
            <SectionTitle
              icon={FaShieldAlt}
              title="WAF & CDN Defense"
              moduleTag="MOD-09 // DEFENSE"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResultCard
                title="WAF Status"
                value={
                  result.waf?.provider === "Not Detected" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-semibold">
                      🔴 Not Detected
                    </span>
                  ) : result.waf?.provider === "Not Publicly Detected" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-mono font-semibold">
                      🟡 Not Publicly Detected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-mono font-semibold">
                      🟢 Detected
                    </span>
                  )
                }
              />
              <ResultCard title="WAF Provider" value={result.waf?.provider} />
              <ResultCard title="CDN Network" value={result.waf?.cdn} />
            </div>

            {/* SUBDOMAIN ENUMERATION */}
            <SectionTitle
              icon={FaNetworkWired}
              title="Subdomain Enumeration"
              moduleTag="MOD-10 // SUBDOMAINS"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-green-500/20 bg-zinc-950/80 p-5 backdrop-blur-lg">
                <p className="text-gray-400 text-xs font-mono uppercase">
                  Total Discovered Subdomains
                </p>
                <h2 className="text-4xl font-extrabold text-green-400 mt-2 font-mono">
                  {result.subdomains?.count || 0}
                </h2>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-zinc-950/80 p-5 backdrop-blur-lg">
                <p className="text-gray-400 text-xs font-mono uppercase mb-3">
                  Intelligence Sources
                </p>
                <div className="space-y-2">
                  {Object.entries(result.subdomains?.sources || {}).map(
                    ([name, count]) => (
                      <div
                        key={name}
                        className="flex justify-between items-center text-xs font-mono"
                      >
                        <span className="text-gray-300">{name}</span>
                        <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-300">
                          {count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="max-h-[350px] overflow-y-auto pr-2 custom-scroll mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {result.subdomains?.subdomains.map((sub) => (
                  <div
                    key={sub}
                    className="rounded-xl border border-green-500/20 bg-zinc-950/60 p-3 hover:border-green-400 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span>🌐</span>
                      <span className="text-green-300 break-all">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECURITY RISK ASSESSMENT */}
            <SectionTitle
              icon={FaShieldAlt}
              title="Security Risk Scorecard"
              moduleTag="MOD-11 // ASSESSMENT"
            />
            <div className="w-full">
              <div className="rounded-3xl border border-green-500/30 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 lg:p-10 shadow-2xl shadow-green-500/10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left: Score Wheel */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
                      <CircularProgressbar
                        value={result.risk.score}
                        text={`${result.risk.score}`}
                        styles={buildStyles({
                          textSize: "20px",
                          pathColor:
                            result.risk.score >= 80
                              ? "#22c55e"
                              : result.risk.score >= 60
                              ? "#facc15"
                              : "#ef4444",
                          trailColor: "#18181b",
                          textColor: "#ffffff",
                        })}
                      />
                    </div>

                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Target Security Posture
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md leading-relaxed">
                        Calculated dynamically using SSL configuration, security headers, open ports, HTTP parameters, WAF presence, and known exposures.
                      </p>

                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2.5 font-mono text-xs">
                        <span className="px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 font-bold">
                          Grade : {result.risk.grade}
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300">
                          {result.risk.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Severity Badge */}
                  <div>
                    <div
                      className={`px-6 py-3 rounded-2xl font-mono text-sm sm:text-base font-extrabold border tracking-wider uppercase ${
                        result.risk.severity === "Low"
                          ? "bg-green-500/15 text-green-400 border-green-500/30"
                          : result.risk.severity === "Medium"
                          ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/15 text-red-400 border-red-500/30"
                      }`}
                    >
                      {result.risk.severity} RISK EXPOSURE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY FINDINGS */}
            <div className="mt-12">
              <div className="rounded-3xl border border-green-500/20 bg-zinc-950 p-6 sm:p-8 flex flex-col h-[550px]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                    <FaBug /> Security Findings
                  </h3>

                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {["ALL", "PASS", "WARNING", "FAIL", "INFO"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFindingFilter(status)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-mono transition-all duration-300 ${
                          findingFilter === status
                            ? "bg-green-500 text-black font-bold shadow-[0_0_12px_rgba(74,222,128,0.5)]"
                            : "bg-zinc-900 text-gray-400 hover:bg-zinc-800"
                        }`}
                      >
                        {status} (
                        {status === "ALL"
                          ? result.risk.findings.length
                          : result.risk.findings.filter(
                              (item) => item.status === status
                            ).length}
                        )
                      </button>
                    ))}
                  </div>
                </div>

                {/* Findings List */}
                <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scroll">
                  {result.risk.findings
                    .filter((item) => {
                      if (findingFilter === "ALL") return true;
                      return item.status === findingFilter;
                    })
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-green-500/30"
                      >
                        <span className="mt-1 text-lg shrink-0">
                          {item.status === "PASS" ? (
                            <FaCheckCircle className="text-green-400" />
                          ) : item.status === "WARNING" ? (
                            <FaExclamationTriangle className="text-yellow-400" />
                          ) : item.status === "INFO" ? (
                            <FaInfoCircle className="text-blue-400" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                        </span>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-white">
                              {item.title}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                item.status === "PASS"
                                  ? "bg-green-500/15 text-green-400"
                                  : item.status === "WARNING"
                                  ? "bg-yellow-500/15 text-yellow-400"
                                  : item.status === "INFO"
                                  ? "bg-blue-500/15 text-blue-400"
                                  : "bg-red-500/15 text-red-400"
                              }`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[10px] font-mono bg-zinc-800 text-gray-400 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>

                          <p className="text-xs text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <FaShieldAlt /> Hardening Recommendations
              </h3>

              <div className="rounded-3xl border border-green-500/20 bg-zinc-950 p-6 sm:p-8">
                {result.risk.recommendations.length === 0 ? (
                  <div className="py-12 text-center">
                    <span className="text-4xl">🛡️</span>
                    <h4 className="text-xl font-bold text-green-400 mt-2">
                      Optimal Security Configuration
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      No critical hardening recommendations detected for this target.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
                    {result.risk.recommendations.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-green-500/30"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 font-mono ${
                            item.priority === "High"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : item.priority === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                              : "bg-green-500/20 text-green-400 border border-green-500/30"
                          }`}
                        >
                          P{index + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              Recommendation #{index + 1}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                item.priority === "High"
                                  ? "bg-red-500/20 text-red-400"
                                  : item.priority === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              Priority: {item.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DOWNLOAD REPORT CTA */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-extrabold text-white">
                Export Executive Security Report
              </h3>
              <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
                Download a comprehensive PDF audit report formatted for security teams and compliance records.
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={downloadPDF}
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-400 to-green-400 text-zinc-950 font-extrabold text-base tracking-wide shadow-[0_0_25px_rgba(74,222,128,0.3)] hover:shadow-[0_0_35px_rgba(74,222,128,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span className="absolute top-0 left-[-120%] h-full w-20 bg-white/30 rotate-12 group-hover:left-[120%] transition-all duration-700" />
                  <span className="relative flex items-center gap-3">
                    <FaDownload className="text-lg" />
                    Download Executive Security PDF
                  </span>
                </button>
              </div>
            </div>
          </div>
        )
      )}

      {/* 🔹 SCROLL TO TOP FLOATING BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 rounded-full bg-green-500 text-zinc-950 shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:bg-green-400 hover:scale-110 active:scale-95 transition-all duration-300 border border-green-300 flex items-center justify-center"
        >
          <FaArrowUp className="text-lg sm:text-xl font-bold" />
        </button>
      )}

    </section>
  );
}

export default Hero;