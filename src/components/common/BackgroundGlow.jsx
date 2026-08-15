function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      
      {/* 1. Subtle Cyber Mesh Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 60%),
            linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* 2. Top-Left Floating Emerald Aura */}
      <div
        className="
          absolute
          -top-32 -left-32
          sm:-top-44 sm:-left-44
          lg:-top-56 lg:-left-56

          w-[20rem] h-[20rem]
          sm:w-[32rem] sm:h-[32rem]
          lg:w-[42rem] lg:h-[42rem]

          rounded-full
          bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent
          blur-[100px] lg:blur-[140px]
          animate-cyber-float-1
        "
      />

      {/* 3. Bottom-Right Cyan/Teal Floating Aura */}
      <div
        className="
          absolute
          -bottom-32 -right-32
          sm:-bottom-44 sm:-right-44
          lg:-bottom-56 lg:-right-56

          w-[20rem] h-[20rem]
          sm:w-[32rem] sm:h-[32rem]
          lg:w-[42rem] lg:h-[42rem]

          rounded-full
          bg-gradient-to-tl from-cyan-500/20 via-emerald-600/10 to-transparent
          blur-[100px] lg:blur-[140px]
          animate-cyber-float-2
        "
      />

      {/* 4. Center Spotlight Pulse Core */}
      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2

          w-[18rem] h-[18rem]
          sm:w-[28rem] sm:h-[28rem]
          lg:w-[38rem] lg:h-[38rem]

          rounded-full
          bg-emerald-500/10
          blur-[90px] lg:blur-[130px]
          animate-pulse
        "
      />

      {/* CSS Keyframe Animations for Floating Effect */}
      <style jsx global>{`
        @keyframes cyberFloat1 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(30px, 20px) scale(1.08);
          }
        }

        @keyframes cyberFloat2 {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-30px, -25px) scale(1.05);
          }
        }

        .animate-cyber-float-1 {
          animation: cyberFloat1 12s ease-in-out infinite;
        }

        .animate-cyber-float-2 {
          animation: cyberFloat2 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default BackgroundGlow;