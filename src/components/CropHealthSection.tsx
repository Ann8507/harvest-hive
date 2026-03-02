"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ScanEye, BookOpen, Microscope, Camera, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CropHealthSection() {
    const { t } = useLanguage();

    const diseases = [
        { key: "dis-katte", label: "Katte (Mosaic Disease)" },
        { key: "dis-azhukal", label: "Azhukal (Capsule Rot)" },
        { key: "dis-rhizome", label: "Rhizome Rot management" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                    {t("crop-title")}
                </h1>
                <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                    {t("crop-sub")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* AI Scan */}
                <div className="glass p-8">
                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                        <ScanEye className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("ai-scan-title")}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-8">{t("ai-scan-sub")}</p>

                    <button className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-xl hover:bg-[var(--primary-light)] transition-all flex items-center justify-center gap-3">
                        <Camera className="w-5 h-5" />
                        {t("btn-scan")}
                    </button>
                </div>

                {/* Disease Library */}
                <div className="glass p-8">
                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("lib-title")}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-6">{t("lib-sub")}</p>

                    <div className="space-y-4">
                        {diseases.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-yellow-500/30 transition-all cursor-pointer">
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium group-hover:text-yellow-500 transition-colors">{t(d.key)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pathology Support */}
                <div className="glass p-8">
                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                        <Microscope className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("path-title")}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-8">{t("path-sub")}</p>

                    <button className="w-full border border-[var(--accent)] text-[var(--accent)] font-bold py-4 rounded-xl hover:bg-[var(--accent)] hover:text-black transition-all">
                        {t("btn-consult")}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
