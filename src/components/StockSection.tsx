import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PackageSearch, MapPin, Navigation, Loader2, Store } from "lucide-react";
import { motion } from "framer-motion";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Baseline essential items that should always be visible
const baselineStock = [
    { id: "base-1", name: "Cardamom Special Bio-Fertilizer", status: "In Stock", qty: "Standard Pack", price: "950", shopName: "Agri-Gov Central" },
    { id: "base-2", name: "Sulfur Fungicide (Wettable)", status: "In Stock", qty: "1kg unit", price: "450", shopName: "Hillside Agro" },
    { id: "base-3", name: "Copper Oxychloride", status: "Low Stock", qty: "500g pack", price: "320", shopName: "Town Supply" },
    { id: "base-4", name: "Cardamom Stimulant XL", status: "In Stock", qty: "1L bottle", price: "1250", shopName: "Agri-Tech Hub" },
];

export default function StockSection() {
    const { t } = useLanguage();
    const [liveInventory, setLiveInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "inventory"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLiveInventory(items);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Merge baseline with live shopkeeper items
    const combinedInventory = [...liveInventory, ...baselineStock];

    // Extract unique shops for the sidebar
    const uniqueShops = Array.from(new Set(combinedInventory.map(item => item.shopName)))
        .map(name => ({
            name,
            dist: (Math.random() * 5 + 1).toFixed(1) + " km", // Mock distance
            stocks: Array.from(new Set(combinedInventory.filter(i => i.shopName === name).map(i => i.name.split(' ')[0])))
        })).slice(0, 4);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                    {t("stock-title")}
                </h1>
                <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                    {t("stock-sub")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-8 md:col-span-2 overflow-x-auto">
                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                        <PackageSearch className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[var(--accent)]">{t("inventory-title")}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Tracking
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-[var(--accent)] text-sm">
                                <th className="pb-4 font-bold">{t("th-item")}</th>
                                <th className="pb-4 font-bold">{t("th-status")}</th>
                                <th className="pb-4 font-bold">{t("th-source")}</th>
                                <th className="pb-4 font-bold">{t("th-option")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && liveInventory.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)] mx-auto" />
                                    </td>
                                </tr>
                            ) : combinedInventory.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-[var(--text-muted)]">
                                        No stock data available at the moment.
                                    </td>
                                </tr>
                            ) : (
                                combinedInventory.map((item) => (
                                    <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                                        <td className="py-6 font-medium">
                                            <div>
                                                <div className="text-white group-hover:text-[var(--accent)] transition-colors">{item.name}</div>
                                                <div className="text-[10px] text-[var(--text-muted)] mt-1">₹{item.price} • {item.qty}</div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'In Stock' ? 'bg-green-500/20 text-green-400' :
                                                item.status === 'Low Stock' ? 'bg-yellow-500/20 text-[var(--accent)]' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-6 text-sm text-[var(--text-muted)]">
                                            <span className="flex items-center gap-2">
                                                <Store className="w-3 h-3 text-[var(--accent)]" />
                                                {item.shopName}
                                            </span>
                                        </td>
                                        <td className="py-6">
                                            <button className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[var(--accent)] hover:text-black transition-all">
                                                Order
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="glass p-8">
                    <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--accent)] mb-2">{t("shop-title")}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-8">{t("shop-sub")}</p>

                    <div className="space-y-4">
                        {uniqueShops.length > 0 ? uniqueShops.map((s, i) => (
                            <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 hover:border-[var(--accent)]/30 transition-all cursor-pointer group">
                                <div>
                                    <div className="font-bold text-sm group-hover:text-[var(--accent)] transition-colors">{s.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{s.stocks.join(', ')}...</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[var(--accent)] font-bold text-sm tracking-tight">{s.dist}</div>
                                    <Navigation className="w-3 h-3 text-[var(--primary-light)] ml-auto mt-1" />
                                </div>
                            </div>
                        )) : (
                            <p className="text-xs text-[var(--text-muted)] text-center py-4">No verified shops nearby.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
