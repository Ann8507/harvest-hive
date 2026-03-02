"use client";

import { useAuth, UserRole } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { auth, db } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { User, Briefcase, Store, LogIn, Mail, Lock, UserPlus, AlertCircle, Sprout, ArrowLeft } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function AuthForm() {
    const { t } = useLanguage();
    const { user, updateRole, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [mode, setMode] = useState<"login" | "signup">(searchParams.get("mode") === "signup" ? "signup" : "login");
    const [selectedRole, setSelectedRole] = useState<UserRole>("farmer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const categories: { id: UserRole; icon: any; label: string }[] = [
        { id: "farmer", icon: User, label: "role-farmer" },
        { id: "worker", icon: Briefcase, label: "role-worker" },
        { id: "shopkeeper", icon: Store, label: "role-shopkeeper" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "signup") {
                if (password.length < 6) {
                    throw new Error("Password should be at least 6 characters long.");
                }
                const result = await createUserWithEmailAndPassword(auth, email, password);
                if (result.user) {
                    await updateProfile(result.user, { displayName: name });
                    await updateRole(result.user.uid, selectedRole);
                }
            } else {
                const result = await signInWithEmailAndPassword(auth, email, password);
                if (result.user) {
                    // VERIFICATION: Role-based access control
                    const userDoc = await getDoc(doc(db, "users", result.user.uid));
                    const actualRole = userDoc.data()?.role as UserRole | undefined;

                    if (selectedRole === "shopkeeper") {
                        // Strictly block non-shopkeepers from the shopkeeper portal
                        if (actualRole && actualRole !== "shopkeeper") {
                            await auth.signOut();
                            throw { code: "custom/not-a-shopkeeper" };
                        }
                    }

                    // For farmers/workers, if they select the role, we update it to ensure consistent portal access
                    await updateRole(result.user.uid, selectedRole);
                }
            }
            router.push("/");
        } catch (err: any) {
            // Log as info/warn rather than error for typical user-input issues
            console.log("Auth Status:", err.code);

            let message = "Authentication failed. Please check your credentials.";

            if (err.code === "auth/invalid-credential") {
                message = "Invalid email or password. Please try again or create a new account.";
            } else if (err.code === "auth/email-already-in-use") {
                message = "This email is already registered. Try signing in instead.";
            } else if (err.code === "auth/weak-password") {
                message = "Password is too weak. Please use at least 6 characters.";
            } else if (err.code === "auth/user-not-found") {
                message = "No account found with this email. Please sign up.";
            } else if (err.code === "auth/wrong-password") {
                message = "Incorrect password. Please try again.";
            } else if (err.code === "auth/invalid-email") {
                message = "Please enter a valid email address.";
            } else if (err.code === "custom/not-a-shopkeeper") {
                message = "Access Denied: This account is not registered as a Shopkeeper.";
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-wider">Back to Home</span>
                </Link>
                <div className="flex items-center gap-3 text-2xl font-bold text-[var(--accent)]">
                    <Sprout className="w-8 h-8" />
                    <span>Hive</span>
                </div>
            </div>

            <div className="text-center space-y-4 mb-10">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-transparent">
                    {mode === "login" ? t("btn-login") : t("btn-signup")}
                </h2>
                <p className="text-[var(--text-muted)]">
                    {t("auth-sub")}
                </p>
            </div>

            {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col gap-3 text-red-400 text-sm">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                    </div>
                    {error.includes("already registered") && (
                        <button
                            onClick={() => {
                                setMode("login");
                                setError("");
                            }}
                            className="bg-red-500/20 hover:bg-red-500/30 text-white font-bold py-2 px-4 rounded-lg transition-all w-fit text-xs"
                        >
                            Switch to Sign In
                        </button>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] text-center">
                        {mode === "login" ? "Select Portal to Enter" : t("role-selection")}
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedRole(cat.id)}
                                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all ${selectedRole === cat.id
                                    ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]"
                                    : "bg-white/5 border-white/5 text-[var(--text-muted)] hover:bg-white/10"
                                    }`}
                            >
                                <cat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-[10px] sm:text-xs font-bold">{t(cat.label)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {mode === "signup" && (
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="email"
                            placeholder={t("email-label")}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="password"
                            placeholder={t("password-label")}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--accent)] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all group disabled:opacity-50 mt-8"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            {mode === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                            {mode === "login" ? t("btn-login") : t("btn-signup")}
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        setMode(mode === "login" ? "signup" : "login");
                        setError("");
                    }}
                    className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
                >
                    {mode === "login" ? t("toggle-signup") : t("toggle-login")}
                </button>

                <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest font-bold">
                    Securely powered by Firebase
                </p>
            </div>
        </>
    );
}

export default function AuthPage() {
    return (
        <div className="min-h-screen bg-[#0f1a0f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl glass-heavy p-6 sm:p-12 relative z-10"
            >
                <Suspense fallback={<div className="w-12 h-12 border-4 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin mx-auto" />}>
                    <AuthForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
