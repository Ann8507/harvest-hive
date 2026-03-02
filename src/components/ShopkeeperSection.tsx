import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Store, Plus, PackageOpen, ClipboardList, PenLine, Loader2, X, Tag, Hash, IndianRupee, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, onSnapshot, query, where, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ShopkeeperSection() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Form state
    const [newItem, setNewItem] = useState({
        name: "",
        qty: "",
        price: "",
        status: "In Stock",
        shopName: user?.displayName || ""
    });
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (user?.displayName && !newItem.shopName) {
            setNewItem(prev => ({ ...prev, shopName: user.displayName || "" }));
        }
    }, [user?.displayName]);

    useEffect(() => {
        if (!user) return;

        // Fetch only items belonging to this shopkeeper
        const q = query(collection(db, "inventory"), where("ownerId", "==", user.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInventory(items);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSubmitLoading(true);
        try {
            await addDoc(collection(db, "inventory"), {
                ...newItem,
                ownerId: user.uid,
                createdAt: Timestamp.now(),
                // For farmer search
                searchName: newItem.name.toLowerCase()
            });
            setShowAddModal(false);
            setNewItem({
                name: "",
                qty: "",
                price: "",
                status: "In Stock",
                shopName: user.displayName || ""
            });
        } catch (err) {
            console.error("Error adding stock:", err);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await deleteDoc(doc(db, "inventory", id));
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
        >
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                    {t("portal-shopkeeper")}
                </h1>
                <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                    Manage your store inventory, pricing, and view analytics from local farms.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inventory Management */}
                <div className="lg:col-span-2 glass p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)]">
                                <PackageOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Your Inventory</h3>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add Stock
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
                            </div>
                        ) : inventory.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]">
                                <PackageOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                                <p className="text-[var(--text-muted)] font-medium">No items in inventory. Add your first product!</p>
                            </div>
                        ) : (
                            inventory.map((item, i) => (
                                <div key={item.id} className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-[var(--text-muted)] font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{item.name}</h4>
                                            <p className="text-xs text-[var(--text-muted)]">{item.qty} in warehouse</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-[var(--accent)]">₹{item.price}</p>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Low Stock' ? 'text-red-400' : 'text-green-400'}`}>
                                                {item.status}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                                                <PenLine className="w-4 h-4 text-[var(--text-muted)] group-hover:text-white" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                                            >
                                                <Trash2 className="w-4 h-4 text-[var(--text-muted)] group-hover:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Dashboard Panel */}
                <div className="space-y-8">
                    <div className="glass p-8 bg-gradient-to-br from-[var(--accent)]/10 to-[#0f1a0f]">
                        <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                            <ClipboardList className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--accent)] mb-2">Order Requests</h3>
                        <p className="text-[var(--text-muted)] text-sm mb-6">4 new requests from Idukki farmers.</p>
                        <button className="w-full bg-white/5 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all border border-white/10">
                            View All Requests
                        </button>
                    </div>

                    <div className="glass p-8">
                        <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                            <Store className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Store Profile</h3>
                        <p className="text-[var(--text-muted)] text-sm mb-6">{user?.displayName || "Thomas & Sons Agro Hub"}, Vandanmedu.</p>
                        <hr className="border-white/5 mb-6" />
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className="text-[var(--text-muted)]">Daily Revenue</span>
                                <span className="text-[var(--accent)] font-bold">₹12,450</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[var(--text-muted)]">Active Customers</span>
                                <span className="font-bold text-white">12 Farmers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Stock Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-lg glass-heavy p-8 sm:p-10 relative z-10"
                        >
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)]">
                                    <PackageOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Add New Stock</h3>
                                    <p className="text-sm text-[var(--text-muted)]">Item will be visible to all farmers instantly.</p>
                                </div>
                            </div>

                            <form onSubmit={handleAddStock} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest pl-1">Shop Name</label>
                                    <div className="relative">
                                        <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Thomas & Sons Agro Hub"
                                            required
                                            value={newItem.shopName}
                                            onChange={(e) => setNewItem({ ...newItem, shopName: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest pl-1">Item Name</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                        <input
                                            type="text"
                                            placeholder="e.g. Cardamom Bio-Fertilizer"
                                            required
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest pl-1">Quantity</label>
                                        <div className="relative">
                                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                            <input
                                                type="text"
                                                placeholder="e.g. 50 Bags"
                                                required
                                                value={newItem.qty}
                                                onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest pl-1">Price</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                            <input
                                                type="number"
                                                placeholder="e.g. 1200"
                                                required
                                                value={newItem.price}
                                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest pl-1">Stock Status</label>
                                    <select
                                        value={newItem.status}
                                        onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                        className="w-full bg-[#1a2e1a] border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer appearance-none"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full bg-[var(--accent)] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all disabled:opacity-50 mt-4"
                                >
                                    {submitLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Publish to Shop"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
