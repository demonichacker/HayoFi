import { View, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, Keyboard, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function FundCardModalScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { accountType, getCardFee, getWalletSource, setAmount } = useCard();
    const [amount, setLocalAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const cardFee = getCardFee();
    const walletSource = getWalletSource();
    const totalAmount = (parseFloat(amount) || 0) + cardFee;

    const handleProceed = () => {
        if (!amount.trim() || parseFloat(amount) === 0) {
            Alert.alert('Error', 'Please enter an amount to fund');
            return;
        }

        if (parseFloat(amount) < 1) {
            Alert.alert('Error', 'Amount must be greater than 0');
            return;
        }

        Keyboard.dismiss();
        setIsLoading(true);
        setAmount(parseFloat(amount));

        // Simulate processing
        setTimeout(() => {
            setIsLoading(false);
            router.push('/card/card-pin-entry');
        }, 1000);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.header}>
                <ThemedText style={styles.title}>Fund Your Card</ThemedText>
                <TouchableOpacity onPress={() => {
                    Keyboard.dismiss();
                    router.back();
                }}>
                    <ThemedText style={[styles.closeButton, { color: colors.textSecondary }]}>✕</ThemedText>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
                {/* Wallet Source */}
                <GlassView style={styles.card}>
                    <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                        Wallet Source
                    </ThemedText>
                    <ThemedText style={styles.walletName}>{walletSource}</ThemedText>
                </GlassView>

                {/* Amount Input */}
                <GlassView style={styles.card}>
                    <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                        Amount to Fund
                    </ThemedText>
                    <View style={styles.amountInput}>
                        <ThemedText style={styles.currencySymbol}>
                            {accountType === 'dollar' ? '$' : '₦'}
                        </ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color: colors.text,
                                },
                            ]}
                            placeholder="0.00"
                            placeholderTextColor={colors.textSecondary}
                            value={amount}
                            onChangeText={setLocalAmount}
                            keyboardType="decimal-pad"
                            editable={!isLoading}
                        />
                    </View>
                </GlassView>

                {/* Summary */}
                <GlassView style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                            Fund Amount
                        </ThemedText>
                        <ThemedText style={styles.summaryValue}>
                            {accountType === 'dollar' ? '$' : '₦'}
                            {amount || '0'}
                        </ThemedText>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

                    <View style={styles.summaryRow}>
                        <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                            Card Creation Fee
                        </ThemedText>
                        <ThemedText style={styles.summaryValue}>
                            {accountType === 'dollar' ? '$' : '₦'}
                            {cardFee}
                        </ThemedText>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

                    <View style={styles.summaryRow}>
                        <ThemedText style={[styles.totalLabel, { color: colors.textSecondary }]}>
                            Total Amount
                        </ThemedText>
                        <ThemedText style={styles.totalValue}>
                            {accountType === 'dollar' ? '$' : '₦'}
                            {totalAmount.toFixed(2)}
                        </ThemedText>
                    </View>
                </GlassView>

                {/* Info */}
                <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                    This amount will be deducted from your {accountType === 'dollar' ? 'Dollar' : 'Nigerian'} wallet
                </ThemedText>

                {/* Proceed Button */}
                <TouchableOpacity
                    style={[
                        styles.proceedButton,
                        { backgroundColor: colors.primary, opacity: isLoading ? 0.6 : 1 },
                    ]}
                    onPress={handleProceed}
                    disabled={isLoading}
                >
                    <ThemedText style={styles.proceedButtonText}>
                        {isLoading ? 'Processing...' : 'Continue to PIN'}
                    </ThemedText>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 24,
        fontWeight: '300',
    },
    content: {
        paddingHorizontal: 24,
        gap: 16,
    },
    card: {
        borderRadius: 16,
        padding: 16,
    },
    label: {
        fontSize: 12,
        marginBottom: 8,
        fontWeight: '500',
    },
    walletName: {
        fontSize: 16,
        fontWeight: '600',
    },
    amountInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currencySymbol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    input: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
    },
    summaryCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.dark.primary + '40',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 12,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    infoText: {
        fontSize: 12,
        textAlign: 'center',
    },
    proceedButton: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 24,
    },
    proceedButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
});
