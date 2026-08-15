import { useEffect, useState, useRef } from "react";

function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  // Refs for smooth animation frame processing
  const cursorRef = useRef({ x: -100, y: -100 });
  const glowOuterRef = useRef(null);
  const glowInnerRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    // Mobile / Touch Devices check
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

    const handleMouseMove = (e) => {
      if (!visible) setVisible(true);
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => setVisible(false);

    // Smooth animation loop using requestAnimationFrame (prevents React re-render lag)
    const updateGlowPosition = () => {
      const { x, y } = cursorRef.current;

      if (glowOuterRef.current) {
        glowOuterRef.current.style.transform = `translate3d(${x - 175}px, ${y - 175}px, 0)`;
      }
      if (glowInnerRef.current) {
        glowInnerRef.current.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateGlowPosition);
    };

    // Click Ripple Burst Handler
    const handleClick = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]); // Max 3 active ripples
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    requestRef.current = requestAnimationFrame(updateGlowPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [visible]);

  // Remove ripple after animation finishes
  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      {/* --- Ambient Outer Spotlight Glow --- */}
      <div
        ref={glowOuterRef}
        className={`fixed top-0 left-0 w-[350px] h-[350px] pointer-events-none rounded-full transition-opacity duration-500 ease-out z-0 mix-blend-screen ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.08) 40%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* --- Crisp Neon Center Torch --- */}
      <div
        ref={glowInnerRef}
        className={`fixed top-0 left-0 w-12 h-12 pointer-events-none rounded-full transition-opacity duration-300 ease-out z-0 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(52, 211, 153, 0.6) 0%, rgba(16, 185, 129, 0.2) 60%, rgba(0,0,0,0) 100%)",
          filter: "blur(12px)",
          willChange: "transform",
        }}
      />

      {/* --- Interactive Cyber Click Ripples --- */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => removeRipple(ripple.id)}
          className="fixed pointer-events-none z-50 rounded-full border border-emerald-400/80 animate-ping-once"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: "40px",
            height: "40px",
            animation: "cyberPulse 0.6s cubic-bezier(0, 0, 0.2, 1) forwards",
          }}
        />
      ))}

      {/* Embedded Animation CSS for Ripple */}
      <style jsx global>{`
        @keyframes cyberPulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
            box-shadow: 0 0 10px #10b981;
          }
          100% {
            transform: scale(3.5);
            opacity: 0;
            box-shadow: 0 0 25px rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </>
  );
}

export default CursorGlow;