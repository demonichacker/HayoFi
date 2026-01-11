import { View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowDown } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { PinModal } from '@/components/ui/PinModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@/context/WalletContext';
import { useState } from 'react';

export default function SwapScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { ngnBalance, usdBalance, executeSwap } = useWallet();
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState<'NGN' | 'USD'>('NGN');
    const [showPinModal, setShowPinModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Mock exchange rate: 1 USD = 1,600 NGN
    const RATE = 1600;

    const toggleSwap = () => {
        setFromCurrency(prev => prev === 'NGN' ? 'USD' : 'NGN');
        setAmount(''); // Clear amount on toggle
    };

    const handleConfirmClick = () => {
        const amountNum = parseFloat(amount);
        if (!amountNum || amountNum <= 0) return;

        // Check if user has sufficient balance
        const hasBalance = fromCurrency === 'NGN'
            ? ngnBalance >= amountNum
            : usdBalance >= amountNum;

        if (!hasBalance) {
            alert('Insufficient balance');
            return;
        }

        setShowPinModal(true);
    };

    const handlePinSuccess = () => {
        const amountNum = parseFloat(amount);
        setShowPinModal(false);
        executeSwap(fromCurrency, amountNum, RATE);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        setAmount('');
        router.back();
    };

    const isNairaToUsd = fromCurrency === 'NGN';

    const convertedAmount = amount
        ? isNairaToUsd
            ? (parseFloat(amount) / RATE).toFixed(2)
            : (parseFloat(amount) * RATE).toFixed(2)
        : '0.00';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Swap Currency</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    {/* From Card */}
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={styles.row}>
                            <ThemedText style={{ color: colors.textSecondary }}>From</ThemedText>
                            <View style={styles.currencyBadge}>
                                <ThemedText style={styles.flag}>{isNairaToUsd ? '🇳🇬' : '🇺🇸'}</ThemedText>
                                <ThemedText type="defaultSemiBold">{fromCurrency}</ThemedText>
                            </View>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.text }]}
                            placeholder="0.00"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
                            Balance: {isNairaToUsd ? `₦${ngnBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </ThemedText>
                    </View>

                    {/* Swap Icon */}
                    <View style={styles.swapIconWrapper}>
                        <TouchableOpacity
                            onPress={toggleSwap}
                            activeOpacity={0.8}
                            style={[styles.swapIcon, { backgroundColor: colors.primary, borderColor: colors.background }]}
                        >
                            <ArrowDown size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* To Card */}
                    <View style={[styles.card, { backgroundColor: colors.surface }]}>
                        <View style={styles.row}>
                            <ThemedText style={{ color: colors.textSecondary }}>To</ThemedText>
                            <View style={styles.currencyBadge}>
                                <ThemedText style={styles.flag}>{isNairaToUsd ? '🇺🇸' : '🇳🇬'}</ThemedText>
                                <ThemedText type="defaultSemiBold">{isNairaToUsd ? 'USD' : 'NGN'}</ThemedText>
                            </View>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.text }]}
                            value={convertedAmount}
                            editable={false}
                        />
                        <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
                            Rate: 1 USD = ₦{RATE.toLocaleString()}
                        </ThemedText>
                    </View>

                    <View style={styles.spacer} />

                    <Button
                        title="Confirm Swap"
                        onPress={handleConfirmClick}
                        style={{ opacity: !amount ? 0.5 : 1 }}
                        loading={false}
                    />
                </View>
            </TouchableWithoutFeedback>

            <PinModal
                visible={showPinModal}
                onClose={() => setShowPinModal(false)}
                onSuccess={handlePinSuccess}
                title="Confirm Swap"
            />

            <SuccessModal
                visible={showSuccessModal}
                onClose={handleSuccessClose}
                title="Swap Successful!"
                message={`You have successfully swapped ${amount} ${fromCurrency} to ${convertedAmount} ${isNairaToUsd ? 'USD' : 'NGN'}`}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        padding: 4,
    },
    content: {
        padding: 24,
        flex: 1,
    },
    card: {
        padding: 20,
        borderRadius: 24,
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currencyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(128,128,128, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    flag: {
        fontSize: 16,
    },
    input: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingVertical: 8,
    },
    swapIconWrapper: {
        alignItems: 'center',
        height: 24,
        zIndex: 1,
        marginVertical: -12,
    },
    swapIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
    },
    spacer: {
        flex: 1,
    },
});
