"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Sprout, Users, Package, Activity, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function HomeSection({ setActiveSection }: { setActiveSection: (s: string) => void }) {
    const { t } = useLanguage();
    const { user } = useAuth();

    const features = [
        {
            id: "labor",
            icon: Users,
            title: "nav-labor",
            desc: "home-labor-desc",
            color: "from-blue-500/20 to-cyan-500/20"
        },
        {
            id: "stock",
            icon: Package,
            title: "nav-stock",
            desc: "home-stock-desc",
            color: "from-orange-500/20 to-yellow-500/20"
        },
        {
            id: "crop",
            icon: Activity,
            title: "nav-crop",
            desc: "home-crop-desc",
            color: "from-green-500/20 to-emerald-500/20"
        }
    ];

    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden rounded-[2.5rem] glass">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <Sprout className="w-full h-full rotate-12 text-[var(--accent)]" />
                </div>

                <div className="max-w-4xl space-y-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold uppercase tracking-widest"
                    >
                        Harvest Hive Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold leading-tight"
                    >
                        {t("home-title")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed"
                    >
                        {t("home-sub")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-6 pt-4"
                    >
                        {!user ? (
                            <Link
                                href="/auth?mode=signup"
                                className="px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-2xl flex items-center gap-3 hover:shadow-2xl hover:shadow-[var(--accent)]/40 transition-all hover:-translate-y-1"
                            >
                                {t("btn-get-started")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        ) : (
                            <button
                                onClick={() => setActiveSection("labor")}
                                className="px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-2xl flex items-center gap-3 hover:shadow-2xl hover:shadow-[var(--accent)]/40 transition-all hover:-translate-y-1"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}

                        {!user && (
                            <Link
                                href="/auth?mode=login"
                                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all"
                            >
                                <LogIn className="w-5 h-5" />
                                {t("btn-login")}
                            </Link>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* About Cardamom Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center text-[var(--accent)]">
                            <Sprout className="w-6 h-6" />
                        </div>
                        {t("about-cardamom-title")}
                    </h2>
                    <p className="text-xl text-[var(--text-muted)] leading-relaxed">
                        {t("about-cardamom-text")}
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <h4 className="text-3xl font-bold text-[var(--accent)] mb-1">90%</h4>
                            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Global Quality Rank</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <h4 className="text-3xl font-bold text-[var(--accent)] mb-1">12k+</h4>
                            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Active Plantations</p>
                        </div>
                    </div>
                </div>

                <div className="aspect-square relative rounded-[3rem] overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1a0f] via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1599839619133-72262d64581f?q=80&w=2071&auto=format&fit=crop"
                        alt="Cardamom Plantation"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-10 left-10 z-20 space-y-2">
                        <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-widest">Western Ghats</p>
                        <h3 className="text-3xl font-bold text-white">The Cardamom Hills</h3>
                    </div>
                </div>
            </section>

            {/* Navigation / Features Grid */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-white">{t("explore-features")}</h2>
                    <p className="text-[var(--text-muted)] max-w-xl mx-auto">Everything you need to optimize your cardamom plantation in one integrated platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {features.map((feature, idx) => (
                        <motion.button
                            key={feature.id}
                            onClick={() => setActiveSection(feature.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-[var(--accent)]/30 text-left transition-all hover:-translate-y-2 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:text-[var(--accent)] transition-colors">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{t(feature.title)}</h3>
                                    <p className="text-[var(--text-muted)] group-hover:text-white/70 transition-colors leading-relaxed">
                                        {t(feature.desc)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    Launch Section
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            {!user && (
                <section className="px-6">
                    <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-black text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-6xl font-black">{t("btn-get-started")}</h2>
                        <p className="text-xl font-medium opacity-80 max-w-2xl mx-auto">Join thousands of farmers across Idukki and Munnar optimizing their yield with Harvest Hive.</p>
                        <div className="pt-6">
                            <Link
                                href="/auth?mode=signup"
                                className="px-12 py-5 bg-black text-white font-bold rounded-2xl hover:bg-black/80 transition-all inline-block hover:scale-105"
                            >
                                {t("btn-signup")}
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
