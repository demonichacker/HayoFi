import { createContext, useContext, useState, PropsWithChildren } from 'react';

export type AccountType = 'nigerian' | 'dollar' | null;
export type CardType = 'mastercard' | 'visa' | null;

export interface CreatedCard {
    id: string;
    accountType: AccountType;
    cardType: CardType;
    amount: number;
    cardNumber: string;
    expiry: string;
    createdAt: Date;
}

type CardContextType = {
    accountType: AccountType;
    cardType: CardType;
    amount: number;
    pin: string;
    isCardCreated: boolean;
    createdCards: CreatedCard[];
    setAccountType: (type: AccountType) => void;
    setCardType: (type: CardType) => void;
    setAmount: (amount: number) => void;
    setPin: (pin: string) => void;
    setCardCreated: (created: boolean) => void;
    resetCardFlow: () => void;
    getCardFee: () => number;
    getWalletSource: () => string;
    addCard: (card: Omit<CreatedCard, 'id' | 'createdAt'>) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: PropsWithChildren) {
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [cardType, setCardType] = useState<CardType>(null);
    const [amount, setAmount] = useState(0);
    const [pin, setPin] = useState('');
    const [isCardCreated, setIsCardCreated] = useState(false);
    const [createdCards, setCreatedCards] = useState<CreatedCard[]>([]);

    const resetCardFlow = () => {
        // Reset flow data but keep tracking that cards exist
        setAmount(0);
        setPin('');
        setAccountType(null);
        setCardType(null);
    };

    const getCardFee = (): number => {
        return accountType === 'dollar' ? 3 : 1000;
    };

    const getWalletSource = (): string => {
        return accountType === 'dollar' ? 'My Dollar Account Wallet' : 'My Nigerian Wallet';
    };

    const addCard = (card: Omit<CreatedCard, 'id' | 'createdAt'>) => {
        const newCard: CreatedCard = {
            ...card,
            id: `card_${Date.now()}_${Math.random()}`,
            createdAt: new Date(),
        };
        setCreatedCards([...createdCards, newCard]);
    };

    return (
        <CardContext.Provider
            value={{
                accountType,
                cardType,
                amount,
                pin,
                isCardCreated,
                createdCards,
                setAccountType,
                setCardType,
                setAmount,
                setPin,
                setCardCreated: setIsCardCreated,
                resetCardFlow,
                getCardFee,
                getWalletSource,
                addCard,
            }}
        >
            {children}
        </CardContext.Provider>
    );
}

export function useCard() {
    const context = useContext(CardContext);
    if (context === undefined) {
        return {
            accountType: null,
            cardType: null,
            amount: 0,
            pin: '',
            isCardCreated: false,
            createdCards: [],
            setAccountType: () => {},
            setCardType: () => {},
            setAmount: () => {},
            setPin: () => {},
            setCardCreated: () => {},
            resetCardFlow: () => {},
            getCardFee: () => 0,
            getWalletSource: () => '',
            addCard: () => {},
        };
    }
    return context;
}
