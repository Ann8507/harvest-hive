"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import LaborSection from "@/components/LaborSection";
import StockSection from "@/components/StockSection";
import CropHealthSection from "@/components/CropHealthSection";
import FarmerProfile from "@/components/FarmerProfile";
import ShopkeeperSection from "@/components/ShopkeeperSection";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("home");


  return (
    <div className="min-h-screen bg-[#0f1a0f] text-white selection:bg-[var(--accent)] selection:text-black">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="max-w-7xl mx-auto px-6 py-20 bg-earth-gradient min-h-[70vh]">
        <AnimatePresence mode="wait">
          {activeSection === "home" && <HomeSection key="home" setActiveSection={setActiveSection} />}
          {activeSection === "labor" && <LaborSection key="labor" />}
          {activeSection === "stock" && <StockSection key="stock" />}
          {activeSection === "crop" && <CropHealthSection key="crop" />}
          {activeSection === "profile" && <FarmerProfile key="profile" />}
          {activeSection === "inventory" && <ShopkeeperSection key="inventory" />}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[var(--accent)] font-bold opacity-50">
            Harvest Hive &copy; 2026
          </div>
          <div className="flex gap-8 text-[var(--text-muted)] text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
