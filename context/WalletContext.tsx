import { createContext, useContext, useState, PropsWithChildren } from 'react';

type WalletContextType = {
    ngnBalance: number;
    usdBalance: number;
    updateBalances: (ngnAmount: number, usdAmount: number) => void;
    executeSwap: (fromCurrency: 'NGN' | 'USD', amount: number, rate: number) => void;
    addToNgn: (amount: number) => void;
    subtractFromNgn: (amount: number) => boolean;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: PropsWithChildren) {
    const [ngnBalance, setNgnBalance] = useState(12450.00);
    const [usdBalance, setUsdBalance] = useState(7.80);

    const updateBalances = (ngnAmount: number, usdAmount: number) => {
        setNgnBalance(ngnAmount);
        setUsdBalance(usdAmount);
    };

    const executeSwap = (fromCurrency: 'NGN' | 'USD', amount: number, rate: number) => {
        if (fromCurrency === 'NGN') {
            // NGN to USD
            const usdAmount = amount / rate;
            if (ngnBalance >= amount) {
                setNgnBalance(prev => prev - amount);
                setUsdBalance(prev => prev + usdAmount);
            }
        } else {
            // USD to NGN
            const ngnAmount = amount * rate;
            if (usdBalance >= amount) {
                setUsdBalance(prev => prev - amount);
                setNgnBalance(prev => prev + ngnAmount);
            }
        }
    };

    const addToNgn = (amount: number) => {
        if (amount <= 0) return;
        setNgnBalance(prev => prev + amount);
    };

    const subtractFromNgn = (amount: number) => {
        if (amount <= 0) return false;
        if (ngnBalance >= amount) {
            setNgnBalance(prev => prev - amount);
            return true;
        }
        return false;
    };

    return (
        <WalletContext.Provider value={{ ngnBalance, usdBalance, updateBalances, executeSwap, addToNgn, subtractFromNgn }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
