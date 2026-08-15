import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTerminal,
  FaSpinner,
} from "react-icons/fa";

/* Features section wala Glowing Icon Badge */
function IconBadge({ icon: Icon }) {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl">
      <span className="absolute inset-0 rounded-xl bg-green-400/10 blur-md" />
      <span className="absolute inset-0 rounded-xl border border-green-500/20" />
      <Icon className="relative text-2xl text-green-400" />
    </div>
  );
}

/* Small mono command tag */
function ModuleTag({ children }) {
  return (
    <span className="font-mono text-[11px] tracking-wide text-green-400/70">
      {children}
    </span>
  );
}

function Contact() {
  const { darkMode } = useTheme();
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const bodyText = darkMode ? "text-gray-400" : "text-gray-600";
  const headingText = darkMode ? "text-white" : "text-black";

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_830hgbj",
        "template_m0u2429",
        form.current,
        "sAiu0Voc-DoAqTtVQ"
      )
      .then(
        () => {
          toast.success("Message Sent Successfully!");
          e.target.reset();
          setIsSending(false);
        },
        (error) => {
          toast.error("Failed to send message.");
          console.error(error);
          setIsSending(false);
        }
      );
  };

  const CONTACT_INFO = [
    {
      icon: FaEnvelope,
      tag: "/email",
      label: "Email",
      value: "ansarimuhammad2005@gmail.com",
      href: "mailto:ansarimuhammad2005@gmail.com",
    },
    {
      icon: FaGithub,
      tag: "/github",
      label: "GitHub",
      value: "@hacktivist2005",
      href: "https://github.com/hacktivist2005",
    },
    {
      icon: FaLinkedin,
      tag: "/linkedin",
      label: "LinkedIn",
      value: "Mohamed Ansari",
      href: "https://linkedin.com/in/mohamed-ansari-5ab548321",
    },
    {
      icon: FaMapMarkerAlt,
      tag: "/location",
      label: "Location",
      value: "Mumbai, Maharashtra, India",
    },
  ];

  return (
    <section
      className={`relative overflow-hidden min-h-screen px-5 sm:px-8 lg:px-10 py-16 lg:py-24 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <style>{`
        @keyframes contact-ping {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
          75%, 100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>

      {/* Features Section scan-grid backdrop */}
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
          <filter id="contact-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-grain)" />
        </svg>
      )}

      <div className="relative max-w-7xl mx-auto">
        {/* ===================== Hero / Header ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          {/* Radar pulse animation */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10"
          >
            <span
              className="absolute w-52 h-52 -left-26 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/20"
              style={{
                animation: "contact-ping 3s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="absolute w-36 h-36 -left-18 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15"
              style={{
                animation: "contact-ping 3s cubic-bezier(0,0,0.2,1) infinite",
                animationDelay: "0.7s",
              }}
            />
          </div>

          <span className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/30 font-mono text-[13px] tracking-wide text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            root@osint-analyzer:~# ./contact.sh
          </span>

          <h1
            className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ${headingText}`}
          >
            Let's
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}Build Something Secure
            </span>
          </h1>

          <p
            className={`max-w-3xl mx-auto mt-8 leading-8 text-base sm:text-lg ${bodyText}`}
          >
            Have security questions, technical proposals or OSINT discussions?
            <br />
            Establish a direct channel with me below.
          </p>
        </motion.div>

        {/* ===================== Main Content Grid ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {/* Left: Contact Info Module */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-3xl border p-7 sm:p-10 transition-all duration-300 ${
              darkMode
                ? "bg-zinc-900 border-green-900 hover:border-green-500/60 hover:shadow-[0_0_30px_-8px_rgba(74,222,128,0.35)]"
                : "bg-white border-gray-300 shadow-xl hover:border-green-500/60"
            }`}
          >
            <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80" />

            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${headingText}`}>
                Direct Channels
              </h2>
              <ModuleTag>MODULE / INTEL</ModuleTag>
            </div>

            <div className="space-y-6 mt-8">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    darkMode
                      ? "bg-zinc-950/60 border-green-900/50 hover:border-green-500/40"
                      : "bg-gray-50 border-gray-200 hover:border-green-500/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <IconBadge icon={item.icon} />
                    <div>
                      <p className="text-xs font-mono text-green-400/80">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`hover:text-green-400 transition font-medium text-sm sm:text-base break-all ${headingText}`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className={`font-medium text-sm sm:text-base ${headingText}`}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                  <ModuleTag>{item.tag}</ModuleTag>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Message Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-3xl border p-7 sm:p-10 transition-all duration-300 ${
              darkMode
                ? "bg-zinc-900 border-green-900 hover:border-green-500/60 hover:shadow-[0_0_30px_-8px_rgba(74,222,128,0.35)]"
                : "bg-white border-gray-300 shadow-xl hover:border-green-500/60"
            }`}
          >
            <span className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-80" />

            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${headingText}`}>
                Transmission Dispatch
              </h2>
              <ModuleTag>MODULE / DISPATCH</ModuleTag>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-4 mt-8">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                  className={`w-full rounded-xl px-4 py-3.5 outline-none border transition-all duration-300 ${
                    darkMode
                      ? "bg-zinc-950 border-green-900/60 text-white focus:border-green-400 placeholder:text-gray-600"
                      : "bg-gray-50 border-gray-300 text-black focus:border-green-500 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  className={`w-full rounded-xl px-4 py-3.5 outline-none border transition-all duration-300 ${
                    darkMode
                      ? "bg-zinc-950 border-green-900/60 text-white focus:border-green-400 placeholder:text-gray-600"
                      : "bg-gray-50 border-gray-300 text-black focus:border-green-500 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Subject"
                  required
                  className={`w-full rounded-xl px-4 py-3.5 outline-none border transition-all duration-300 ${
                    darkMode
                      ? "bg-zinc-950 border-green-900/60 text-white focus:border-green-400 placeholder:text-gray-600"
                      : "bg-gray-50 border-gray-300 text-black focus:border-green-500 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write Your Message...."
                  required
                  className={`w-full rounded-xl px-4 py-3.5 outline-none border transition-all duration-300 resize-none ${
                    darkMode
                      ? "bg-zinc-950 border-green-900/60 text-white focus:border-green-400 placeholder:text-gray-600"
                      : "bg-gray-50 border-gray-300 text-black focus:border-green-500 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 rounded-2xl bg-green-500 text-black font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(74,222,128,0.35)] flex justify-center items-center gap-3 disabled:opacity-50 disabled:pointer-events-none group"
              >
                {isSending ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="group-hover:translate-x-1 transition" />
                    <span>Send Secure Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;