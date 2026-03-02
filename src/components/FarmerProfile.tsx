"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { User, MapPin, Ruler, Phone, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function FarmerProfile() {
    const { t } = useLanguage();
    const { user } = useAuth();

    const profileDetails = [
        { label: "profile-name", value: user?.displayName || user?.email?.split('@')[0] || t("farmer-name"), icon: User, isRaw: true },
        { label: "profile-location", value: "farmer-location", icon: MapPin },
        { label: "profile-land", value: "farmer-land", icon: Ruler },
        { label: "profile-contact", value: "farmer-contact", icon: Phone },
        { label: "profile-member-since", value: "farmer-member-since", icon: Calendar },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="glass overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center backdrop-blur-md">
                        <User className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="text-3xl font-bold text-white">
                                {user?.displayName || user?.email?.split('@')[0] || t("farmer-name")}
                            </h1>
                            <ShieldCheck className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <p className="text-white/70 font-medium">{t("farmer-location")}</p>
                        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                            Verified {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Farmer"}
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {profileDetails.map((detail, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center text-[var(--accent)] shrink-0">
                                <detail.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-wide mb-1">
                                    {t(detail.label)}
                                </p>
                                <p className="text-lg font-semibold text-white">
                                    {detail.isRaw ? detail.value : t(detail.value)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Account Actions */}
                <div className="bg-white/5 p-6 border-t border-white/10 flex flex-wrap gap-4 justify-center md:justify-end">
                    <button className="px-6 py-2 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/5 transition-all">
                        Edit Profile
                    </button>
                    <button className="px-6 py-2 bg-[var(--accent)] text-black rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all">
                        Farm Settings
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
