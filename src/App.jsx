import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackgroundGlow from "./components/common/BackgroundGlow";
import CursorGlow from "./components/common/CursorGlow";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import Features from "./pages/Features";


import { useTheme } from "./context/ThemeContext";

function App() {
  const { darkMode } = useTheme();

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-[#030712] text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <BackgroundGlow />

        <div className="hidden md:block">
          <CursorGlow />
        </div>

        <Navbar />

        <main className="pt-[68px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;