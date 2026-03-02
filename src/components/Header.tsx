"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Sprout, Languages, User, LogOut, Loader2, UserCircle, LogIn } from "lucide-react";
import Link from "next/link";

export default function Header({ activeSection, setActiveSection }: {
    activeSection: string,
    setActiveSection: (s: string) => void
}) {
    const { t, language, setLanguage } = useLanguage();
    const { user, loading, logout } = useAuth();

    const navItems = [
        { id: "home", label: "nav-home" },
        { id: "labor", label: "nav-labor" },
        { id: "stock", label: "nav-stock" },
        { id: "crop", label: "nav-crop" },
    ];

    if (user?.role === "shopkeeper") {
        navItems.push({ id: "inventory", label: "portal-shopkeeper" });
    }

    return (
        <header className="sticky top-0 z-50 bg-[#0f1a0fcc] backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-[var(--accent)]">
                <Sprout className="w-8 h-8" />
                Harvest Hive
            </Link>

            <nav className="hidden md:flex gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`font-medium transition-colors ${activeSection === item.id ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-white"
                            }`}
                    >
                        {t(item.label)}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Languages className="w-4 h-4 text-[var(--accent)]" />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                        className="bg-[#1a2e1a] border border-white/20 text-white text-sm font-bold focus:outline-none cursor-pointer rounded-lg px-2 py-1 hover:bg-[#254125] transition-colors"
                    >
                        <option value="en" className="bg-[#0f1a0f]">English</option>
                        <option value="ml" className="bg-[#0f1a0f]">മലയാളം</option>
                        <option value="ta" className="bg-[#0f1a0f]">தமிழ்</option>
                        <option value="hi" className="bg-[#0f1a0f]">हिन्दी</option>
                        <option value="kn" className="bg-[#0f1a0f]">ಕನ್ನಡ</option>
                    </select>
                </div>

                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
                ) : user ? (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (user.role === "shopkeeper") setActiveSection("inventory");
                                else if (user.role === "worker") setActiveSection("labor");
                                else setActiveSection("profile");
                            }}
                            className={`hidden sm:flex items-center gap-2 px-4 py-2 border border-[var(--accent)] rounded-xl font-semibold transition-all ${(activeSection === "profile" || activeSection === "inventory")
                                    ? "bg-[var(--accent)] text-[#0f1a0f]"
                                    : "text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#0f1a0f]"
                                }`}
                        >
                            <UserCircle className="w-4 h-4" />
                            {user.role === "farmer" ? t("farmer-portal") : user.role === "worker" ? t("worker-portal") : t("role-shopkeeper")}
                        </button>
                        <button
                            onClick={logout}
                            className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/auth"
                        className="flex items-center gap-2 bg-[var(--accent)] text-black px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all"
                    >
                        <LogIn className="w-4 h-4" />
                        Get Started
                    </Link>
                )}
            </div>
        </header>
    );
}
