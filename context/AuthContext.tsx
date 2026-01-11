
import { createContext, useContext, useState, PropsWithChildren } from 'react';

type User = {
    name: string;
    email: string;
} | null;

type AuthContextType = {
    user: User;
    signIn: (email: string) => void;
    signUp: (name: string, email: string) => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>({
        name: 'Ian O', // Default fallback for demo
        email: 'ian@hayofi.com',
    });

    const signIn = (email: string) => {
        // In a real app, you'd fetch user details here.
        // For now, we keep the existing or default user, just updating email if provided
        setUser((prev) => ({
            name: prev?.name || 'User',
            email: email,
        }));
    };

    const signUp = (name: string, email: string) => {
        setUser({ name, email });
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
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
