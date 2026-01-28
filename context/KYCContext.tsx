import { createContext, useContext, useState, PropsWithChildren } from 'react';

type KYCContextType = {
    tier: number;
    isVerified: boolean;
    ninBvn: string | null;
    setTier: (tier: number) => void;
    setVerified: (verified: boolean) => void;
    setNinBvn: (ninBvn: string) => void;
    upgradeTier2: (ninBvn: string) => void;
    resetKYC: () => void;
};

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export function KYCProvider({ children }: PropsWithChildren) {
    const [tier, setTier] = useState(1);
    const [isVerified, setIsVerified] = useState(false);
    const [ninBvn, setNinBvn] = useState<string | null>(null);

    const upgradeTier2 = (ninBvnValue: string) => {
        setNinBvn(ninBvnValue);
        setTier(2);
        setIsVerified(true);
    };

    const resetKYC = () => {
        setTier(1);
        setIsVerified(false);
        setNinBvn(null);
    };

    return (
        <KYCContext.Provider value={{ tier, isVerified, ninBvn, setTier, setVerified: setIsVerified, setNinBvn, upgradeTier2, resetKYC }}>
            {children}
        </KYCContext.Provider>
    );
}

export function useKYC() {
    const context = useContext(KYCContext);
    if (context === undefined) {
        // Return default context instead of throwing error
        return {
            tier: 1,
            isVerified: false,
            ninBvn: null,
            setTier: () => {},
            setVerified: () => {},
            setNinBvn: () => {},
            upgradeTier2: () => {},
            resetKYC: () => {},
        };
    }
    return context;
}
