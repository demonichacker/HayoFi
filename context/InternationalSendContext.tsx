import { createContext, useContext, useState, PropsWithChildren } from 'react';

export type SendType = 'local' | 'international' | null;

export interface Country {
    code: string;
    name: string;
    currency: string;
    currencyCode: string;
}

export interface RecipientDetails {
    fullName: string;
    email: string;
    phoneNumber: string;
    bankName?: string;
    accountNumber?: string;
    accountType?: string;
    swiftCode?: string;
    bankCode?: string;
    routingNumber?: string;
}

interface InternationalSendContextType {
    sendType: SendType;
    setSendType: (type: SendType) => void;
    selectedCountry: Country | null;
    setSelectedCountry: (country: Country | null) => void;
    amount: string;
    setAmount: (amount: string) => void;
    recipientDetails: RecipientDetails;
    setRecipientDetails: (details: RecipientDetails) => void;
    exchangeRate: number;
    fees: number;
    amountReceived: number;
    calculateAmounts: (amountNGN: number) => void;
    resetFlow: () => void;
}

const InternationalSendContext = createContext<InternationalSendContextType | undefined>(undefined);

const MOCK_COUNTRIES: Country[] = [
    { code: 'US', name: 'United States', currency: 'US Dollar', currencyCode: 'USD' },
    { code: 'GB', name: 'United Kingdom', currency: 'British Pound', currencyCode: 'GBP' },
    { code: 'CA', name: 'Canada', currency: 'Canadian Dollar', currencyCode: 'CAD' },
    { code: 'AU', name: 'Australia', currency: 'Australian Dollar', currencyCode: 'AUD' },
    { code: 'DE', name: 'Germany', currency: 'Euro', currencyCode: 'EUR' },
    { code: 'FR', name: 'France', currency: 'Euro', currencyCode: 'EUR' },
    { code: 'JP', name: 'Japan', currency: 'Japanese Yen', currencyCode: 'JPY' },
    { code: 'IN', name: 'India', currency: 'Indian Rupee', currencyCode: 'INR' },
    { code: 'KE', name: 'Kenya', currency: 'Kenyan Shilling', currencyCode: 'KES' },
    { code: 'ZA', name: 'South Africa', currency: 'South African Rand', currencyCode: 'ZAR' },
    { code: 'GH', name: 'Ghana', currency: 'Ghanaian Cedi', currencyCode: 'GHS' },
    { code: 'UG', name: 'Uganda', currency: 'Ugandan Shilling', currencyCode: 'UGX' },
];

// Mock exchange rates (NGN to target currency)
const MOCK_EXCHANGE_RATES: { [key: string]: number } = {
    USD: 1550,
    GBP: 1950,
    CAD: 1150,
    AUD: 1000,
    EUR: 1700,
    JPY: 10.5,
    INR: 18.5,
    KES: 19.3,
    ZAR: 82,
    GHS: 168,
    UGX: 5.8,
};

const initialRecipientDetails: RecipientDetails = {
    fullName: '',
    email: '',
    phoneNumber: '',
};

export function InternationalSendProvider({ children }: PropsWithChildren) {
    const [sendType, setSendType] = useState<SendType>(null);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [amount, setAmount] = useState('');
    const [recipientDetails, setRecipientDetails] = useState<RecipientDetails>(initialRecipientDetails);
    const [exchangeRate, setExchangeRate] = useState(1550);
    const [fees, setFees] = useState(0);
    const [amountReceived, setAmountReceived] = useState(0);

    const calculateAmounts = (amountNGN: number) => {
        const feePercentage = 0.015; // 1.5% fee
        const calculatedFees = amountNGN * feePercentage;
        const netAmount = amountNGN - calculatedFees;
        const rate = selectedCountry ? MOCK_EXCHANGE_RATES[selectedCountry.currencyCode] || 1550 : 1550;
        const received = netAmount / rate;

        setFees(calculatedFees);
        setExchangeRate(rate);
        setAmountReceived(received);
    };

    const resetFlow = () => {
        setSendType(null);
        setSelectedCountry(null);
        setAmount('');
        setRecipientDetails(initialRecipientDetails);
        setExchangeRate(1550);
        setFees(0);
        setAmountReceived(0);
    };

    return (
        <InternationalSendContext.Provider
            value={{
                sendType,
                setSendType,
                selectedCountry,
                setSelectedCountry,
                amount,
                setAmount,
                recipientDetails,
                setRecipientDetails,
                exchangeRate,
                fees,
                amountReceived,
                calculateAmounts,
                resetFlow,
            }}
        >
            {children}
        </InternationalSendContext.Provider>
    );
}

export function useInternationalSend() {
    const context = useContext(InternationalSendContext);
    if (context === undefined) {
        throw new Error('useInternationalSend must be used within an InternationalSendProvider');
    }
    return context;
}

export function getCountries(): Country[] {
    return MOCK_COUNTRIES;
}
