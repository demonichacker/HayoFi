
import { createContext, useContext, useState, PropsWithChildren } from 'react';

type User = {
    name: string;
    email: string;
    tier?: number;
} | null;

type AuthContextType = {
    user: User;
    signIn: (email: string) => void;
    signUp: (name: string, email: string) => void;
    signOut: () => void;
    updateUserTier: (tier: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>(null);

    const signIn = (email: string) => {
        // In a real app, you'd fetch user details here.
        setUser({ name: 'User', email, tier: 1 });
    };

    const signUp = (name: string, email: string) => {
        setUser({ name, email, tier: 1 });
    };

    const signOut = () => {
        setUser(null);
    };

    const updateUserTier = (tier: number) => {
        setUser((prev) => prev ? { ...prev, tier } : null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateUserTier }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
