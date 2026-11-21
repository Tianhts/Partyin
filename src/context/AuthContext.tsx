import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "../types/index";

interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    login: (userData: UserProfile) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {
        try {
            const stored = await AsyncStorage.getItem("partyin_user");
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load user session:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (userData: UserProfile) => {
        setUser(userData);
        await AsyncStorage.setItem("partyin_user", JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("partyin_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);