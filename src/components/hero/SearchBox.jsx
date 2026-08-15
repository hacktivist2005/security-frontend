import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

// Pure SVG Icons
const SearchIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SpinnerIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const GlobeIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

// --- SMART INPUT CLEANER & VALIDATOR ---
function processTargetInput(rawInput) {
  if (!rawInput) return { isValid: false, error: "Please enter a target to analyze." };

  let cleaned = rawInput.trim().toLowerCase();

  // Remove http://, https://, and trailing slashes/paths
  cleaned = cleaned.replace(/^https?:\/\//, "").split("/")[0].split("?")[0];

  // 1. IPv4 Regex Check
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(cleaned)) {
    return { isValid: true, type: "ip", target: cleaned };
  }

  // 2. TLD Check (e.g., .com, .io, or net)
  const tldRegex = /^\.?[a-zA-Z]{2,63}$/;
  if (tldRegex.test(cleaned)) {
    const formattedTld = cleaned.startsWith(".") ? cleaned : `.${cleaned}`;
    return { isValid: true, type: "tld", target: formattedTld };
  }

  // 3. Domain Name Check (e.g., example.com, sub.domain.org)
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (domainRegex.test(cleaned)) {
    return { isValid: true, type: "domain", target: cleaned };
  }

  return { isValid: false, error: "Invalid target. Enter a valid Domain, TLD (.com) or IPv4 (8.8.8.8)." };
}

function SearchBox({ setResult, loading, setLoading }) {
  const { darkMode } = useTheme();
  const [domain, setDomain] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [targetType, setTargetType] = useState(null); // 'domain' | 'ip' | 'tld' | null

  const handleAnalyze = async () => {
    setErrorMsg("");
    
    // Process & Validate Target
    const validation = processTargetInput(domain);

    if (!validation.isValid) {
      setErrorMsg(validation.error);
      return;
    }

    setTargetType(validation.type);

    try {
      setLoading(true);
      const { analyzeDomain } = await import("../../services/api");
      
      // Send cleaned & validated target to API
      const data = await analyzeDomain(validation.target);
      setResult(data);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        setResult(err.response.data);
      } else {
        setResult({
          success: false,
          message: "Server is unreachable. Please check your network connection.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 px-4 sm:px-6">
      
      {/* Search Box Container */}
      <div className="relative w-full max-w-xl group">
        
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 rounded-2xl blur-lg opacity-40 transition duration-500 group-hover:opacity-75 ${
          errorMsg 
            ? "bg-gradient-to-r from-red-500 to-rose-500"
            : darkMode ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-emerald-400 to-green-300"
        }`} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleAnalyze();
          }}
          className={`relative flex flex-col sm:flex-row items-center rounded-2xl p-2 border transition-all duration-300 backdrop-blur-xl shadow-2xl ${
            errorMsg 
              ? "border-red-500/50" 
              : darkMode ? "bg-slate-950/90 border-emerald-500/30 text-white" : "bg-white/95 border-emerald-200 text-slate-900"
          }`}
        >
          {/* Input Wrapper */}
          <div className="relative flex items-center w-full px-3 py-1">
            <GlobeIcon className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors ${
              errorMsg ? "text-red-400" : darkMode ? "text-emerald-400/70" : "text-emerald-600/70"
            }`} />
            
            <input
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              disabled={loading}
              type="text"
              placeholder="Target: domain.com, 8.8.8.8, or .io"
              className={`w-full bg-transparent py-2.5 outline-none font-mono text-sm sm:text-base placeholder:text-slate-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap tracking-wide transition-all duration-300 shadow-md ${
              loading
                ? "bg-emerald-600/50 cursor-not-allowed text-emerald-100"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <>
                <SpinnerIcon className="w-5 h-5 animate-spin text-white" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <SearchIcon className="w-4 h-4 text-slate-950" />
                <span>Analyze Target</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Inline Validation / Error Message */}
      {errorMsg ? (
        <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-red-400 animate-bounce">
          <span>⚠️ {errorMsg}</span>
        </div>
      ) : (
        <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-slate-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Supports Domain Names (`example.com`), TLDs (`.io`) & IPv4 (`1.1.1.1`)</span>
        </div>
      )}

    </div>
  );
}

export default SearchBox;