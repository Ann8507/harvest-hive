"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type UserRole = "farmer" | "worker" | "shopkeeper";

interface AuthUser {
    uid: string;
    email: string | null;
    role: UserRole;
    displayName: string | null;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    updateRole: (uid: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch user role from Firestore
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: (userData.role || "farmer") as UserRole,
                            displayName: firebaseUser.displayName || userData.displayName || null
                        });
                    } else {
                        // User exists in Auth but no Firestore doc yet (possible during signup race)
                        // Don't create a default 'farmer' doc here to avoid conflicts
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: "farmer", // Transient default until updateRole happens
                            displayName: firebaseUser.displayName
                        });
                    }
                } catch (error: any) {
                    console.warn("Firestore access issues (likely offline):", error.message);

                    // Fallback for offline mode: Use basic auth data and default to farmer
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: "farmer", // Default fallback
                        displayName: firebaseUser.displayName
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await auth.signOut();
    };

    const updateRole = async (uid: string, role: UserRole) => {
        try {
            await setDoc(doc(db, "users", uid), { role }, { merge: true });

            // Forcefully update local state to reflect the new role immediately
            setUser(prev => {
                if (prev && prev.uid === uid) {
                    return { ...prev, role };
                }
                return prev;
            });
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, updateRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
