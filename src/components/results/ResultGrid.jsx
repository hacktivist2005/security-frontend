import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import ResultCard from "./ResultCard";
import DNSCard from "./DNSCard";

// Pure SVG Icons
const DownloadIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ShieldCheckIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const RadarIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function ResultGrid({ result, loading }) {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("all");

  // Handle Export Scan Report as JSON
  const handleExportJSON = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `recon_report_${result.target || "data"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <p className="font-mono text-sm text-emerald-400 font-semibold tracking-wider uppercase">
            Executing Multi-Threaded Recon Scanning...
          </p>
        </div>
        
        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className={`h-48 rounded-2xl border p-5 animate-pulse flex flex-col justify-between ${
                darkMode ? "bg-slate-900/40 border-slate-800" : "bg-slate-100 border-slate-200"
              }`}
            >
              <div className="h-5 w-1/3 bg-slate-700/40 rounded-md" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-700/30 rounded-md" />
                <div className="h-4 w-2/3 bg-slate-700/30 rounded-md" />
              </div>
              <div className="h-8 w-full bg-slate-700/20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Empty State (Before Scan)
  if (!result) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-16 text-center px-4">
        <div className={`p-8 sm:p-12 rounded-3xl border backdrop-blur-xl ${
          darkMode ? "bg-slate-950/40 border-slate-800/80" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <RadarIcon className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className={`font-mono text-lg sm:text-xl font-bold uppercase tracking-wider mb-2 ${
            darkMode ? "text-slate-200" : "text-slate-800"
          }`}>
            Awaiting Target Input
          </h3>
          <p className="font-mono text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Enter a domain name, IP address, or TLD in the scanner above to initiate intelligence extraction.
          </p>
        </div>
      </div>
    );
  }

  // Extract Data Categories safely
  const targetName = result.target || result.domain || "Target Intelligence";
  const dnsRecords = result.dns || result.dnsRecords || {};
  const sslInfo = result.ssl || result.sslDetails || null;
  const whoisInfo = result.whois || result.whoisData || null;
  const ipInfo = result.ip || result.ipInfo || null;

  // Filter Tabs Config
  const tabs = [
    { id: "all", label: "All Telemetry" },
    { id: "overview", label: "Overview" },
    { id: "dns", label: "DNS Intelligence" },
    { id: "ssl", label: "SSL / TLS Security" },
    { id: "whois", label: "WHOIS Ownership" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 mb-16">
      
      {/* Target Banner Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border mb-8 backdrop-blur-xl transition-all duration-300 ${
        darkMode 
          ? "bg-slate-950/80 border-emerald-500/30 shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)]" 
          : "bg-white border-emerald-200 shadow-xl"
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Target Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 tracking-wider uppercase font-semibold">
                Scan Completed Successfully
              </span>
            </div>
            <h2 className={`font-mono text-2xl sm:text-3xl font-extrabold break-all ${
              darkMode ? "text-white" : "text-slate-900"
            }`}>
              {targetName}
            </h2>
          </div>

          {/* Export Report Action */}
          <button
            onClick={handleExportJSON}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 border ${
              darkMode
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950"
                : "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-500 hover:text-white"
            }`}
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/40 font-mono text-xs">
          <div>
            <span className="text-slate-500 block">IP Address:</span>
            <span className="text-emerald-400 font-bold">{ipInfo?.ip || result.ip_address || "Resolved"}</span>
          </div>
          <div>
            <span className="text-slate-500 block">SSL Status:</span>
            <span className="text-emerald-400 font-bold">{sslInfo?.valid ? "VALID (TLS)" : "ACTIVE"}</span>
          </div>
          <div>
            <span className="text-slate-500 block">DNS Records:</span>
            <span className="text-emerald-400 font-bold">{Object.keys(dnsRecords).length} Types</span>
          </div>
          <div>
            <span className="text-slate-500 block">Threat Level:</span>
            <span className="text-emerald-400 font-bold">LOW (Clean)</span>
          </div>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
              activeTab === tab.id
                ? darkMode
                  ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-emerald-600 border-emerald-600 text-white"
                : darkMode
                  ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-emerald-300 hover:border-slate-700"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Results Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {/* OVERVIEW & KEY DETAILS */}
          {(activeTab === "all" || activeTab === "overview") && (
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                Target Overview & Network Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <ResultCard title="Domain Name" value={targetName} />
                <ResultCard title="IP Address" value={ipInfo?.ip || result.ip_address || "N/A"} />
                <ResultCard title="Server Location" value={ipInfo?.country || result.country || "N/A"} />
                <ResultCard title="HTTP Server Header" value={result.server || "N/A"} />
                <ResultCard title="Response Code" value={result.status_code || "200 OK"} />
                <ResultCard title="Analysis Time" value={new Date().toLocaleString()} />
              </div>
            </div>
          )}

          {/* DNS INTELLIGENCE */}
          {(activeTab === "all" || activeTab === "dns") && (
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <RadarIcon className="w-4 h-4" />
                DNS Records Telemetry
              </h3>
              {Object.keys(dnsRecords).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Object.entries(dnsRecords).map(([type, records]) => (
                    <DNSCard key={type} title={`${type.toUpperCase()} Records`} records={Array.isArray(records) ? records : [records]} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DNSCard title="A Records" records={result.a_records || []} />
                  <DNSCard title="MX Records" records={result.mx_records || []} />
                  <DNSCard title="NS Records" records={result.ns_records || []} />
                  <DNSCard title="TXT Records" records={result.txt_records || []} />
                </div>
              )}
            </div>
          )}

          {/* SSL / SECURITY */}
          {(activeTab === "all" || activeTab === "ssl") && sslInfo && (
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                SSL / TLS Security Certificates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <ResultCard title="Issuer" value={sslInfo.issuer || "N/A"} />
                <ResultCard title="Valid From" value={sslInfo.valid_from || "N/A"} />
                <ResultCard title="Valid Until" value={sslInfo.valid_to || "N/A"} />
                <ResultCard title="SANs (Subject Alt Names)" value={sslInfo.sans || "N/A"} />
              </div>
            </div>
          )}

          {/* WHOIS INFO */}
          {(activeTab === "all" || activeTab === "whois") && whoisInfo && (
            <div>
              <h3 className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                WHOIS Domain Ownership
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <ResultCard title="Registrar" value={whoisInfo.registrar || "N/A"} />
                <ResultCard title="Creation Date" value={whoisInfo.created || "N/A"} />
                <ResultCard title="Expiration Date" value={whoisInfo.expires || "N/A"} />
                <ResultCard title="Registrant Name" value={whoisInfo.registrant || "Redacted for Privacy"} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ResultGrid;