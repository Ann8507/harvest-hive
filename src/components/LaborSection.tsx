"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Users, Truck, QrCode, Camera, Briefcase, MapPin, BadgeDollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const workers = [
    { name: "Suresh Mani", location: "Peermade", exp: "5 years", rating: 4.8 },
    { name: "Anish Kumar", location: "Kattappana", exp: "3 years", rating: 4.5 },
    { name: "Meera Nair", location: "Kumily", exp: "7 years", rating: 4.9 },
];

const transportLogs = [
    { route: "Valley → High Range", time: "05:30 AM", type: "Mini-bus", slots: "4/15" },
    { route: "Town → East Slope", time: "06:15 AM", type: "Jeep", slots: "2/6" },
];

const availableJobs = [
    { title: "Harvesting Assistant", farm: "Highland Estates", location: "Kattappana", pay: "₹800/day", type: "Urgent" },
    { title: "Plantation Maintenance", farm: "Green Valley", location: "Kumily", pay: "₹750/day", type: "Regular" },
    { title: "Transport Helper", farm: "Logistics Hub", location: "Munnar", pay: "₹650/day", type: "Shift" },
];

export default function LaborSection() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [portal, setPortal] = useState<"farmer" | "worker">("farmer");

    useEffect(() => {
        if (user?.role === "worker") {
            setPortal("worker");
        } else if (user?.role === "farmer") {
            setPortal("farmer");
        }
    }, [user?.role]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            <div className="flex flex-col items-center space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                        {portal === "farmer" ? t("labor-title") : t("worker-portal")}
                    </h1>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                        {portal === "farmer" ? t("labor-sub") : t("job-sub")}
                    </p>
                </div>

                {/* Hide switcher if logged in, only show for guests (optional) or remove entirely as per request */}
                {!user && (
                    <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-fit">
                        <button
                            onClick={() => setPortal("farmer")}
                            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${portal === "farmer" ? "bg-[var(--accent)] text-black shadow-lg shadow-[var(--accent)]/20" : "text-[var(--text-muted)] hover:text-white"}`}
                        >
                            <Users className="w-4 h-4" />
                            {t("portal-farmer")}
                        </button>
                        <button
                            onClick={() => setPortal("worker")}
                            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${portal === "worker" ? "bg-[var(--accent)] text-black shadow-lg shadow-[var(--accent)]/20" : "text-[var(--text-muted)] hover:text-white"}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            {t("portal-worker")}
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">
                {portal === "farmer" ? (
                    <motion.div
                        key="farmer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Worker Matching */}
                        <div className="glass p-8">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("worker-match")}</h3>
                            <p className="text-[var(--text-muted)] text-sm mb-6">{t("worker-sub")}</p>

                            <div className="space-y-4 mb-8">
                                {workers.map((w, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                                        <div>
                                            <div className="font-semibold text-sm">{w.name}</div>
                                            <div className="text-xs text-[var(--text-muted)]">{w.location} • {w.exp}</div>
                                        </div>
                                        <div className="text-[var(--accent)] font-bold text-sm">★ {w.rating}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--primary-light)] transition-all">
                                {t("btn-find")}
                            </button>
                        </div>

                        {/* Transport */}
                        <div className="glass p-8">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("transport-title")}</h3>
                            <p className="text-[var(--text-muted)] text-sm mb-6">{t("transport-sub")}</p>

                            <div className="space-y-4 mb-8">
                                {transportLogs.map((t_item, i) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-semibold text-sm">{t_item.route}</span>
                                            <span className="text-[var(--accent)] font-bold text-sm">{t_item.time}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-[var(--text-muted)]">
                                            <span>{t_item.type}</span>
                                            <span>{t_item.slots} filled</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full border border-[var(--accent)] text-[var(--accent)] font-bold py-3 rounded-xl hover:bg-[var(--accent)] hover:text-black transition-all">
                                {t("btn-schedule")}
                            </button>
                        </div>

                        {/* QR Section */}
                        <div className="glass p-8">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                                <QrCode className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("qr-title")}</h3>
                            <p className="text-[var(--text-muted)] text-sm mb-8">{t("qr-sub")}</p>

                            <div className="bg-white/5 p-8 rounded-2xl flex flex-col items-center justify-center border border-dashed border-white/20 gap-4">
                                <Camera className="w-12 h-12 text-[var(--accent)]" />
                                <p className="text-xs text-[var(--text-muted)] text-center">{t("qr-scan")}</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="worker"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {availableJobs.map((job, i) => (
                            <div key={i} className="glass p-8 space-y-6 group hover:border-[var(--accent)]/40 transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)]">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.type === 'Urgent' ? 'bg-red-500/20 text-red-400' : 'bg-[var(--accent)]/20 text-[var(--accent)]'}`}>
                                        {job.type}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--accent)] transition-colors">{job.title}</h3>
                                    <p className="text-[var(--accent)] font-medium text-sm">{job.farm}</p>
                                </div>

                                <div className="space-y-3 py-4 border-y border-white/5">
                                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                        <MapPin className="w-4 h-4 text-[var(--accent)]" />
                                        {t("job-location")}: {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                        <BadgeDollarSign className="w-4 h-4 text-[var(--accent)]" />
                                        {t("job-pay")}: {job.pay}
                                    </div>
                                </div>

                                <button className="w-full bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-[var(--accent)] hover:text-black transition-all border border-white/10">
                                    {t("btn-apply")}
                                </button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
