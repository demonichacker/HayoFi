import { View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useInternationalSend } from '@/context/InternationalSendContext';

export default function AmountPreviewScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { selectedCountry, amount, setAmount, calculateAmounts, exchangeRate, fees, amountReceived } =
        useInternationalSend();
    const [localAmount, setLocalAmount] = useState(amount);

    useEffect(() => {
        if (localAmount && !isNaN(parseFloat(localAmount))) {
            const numAmount = parseFloat(localAmount);
            calculateAmounts(numAmount);
            setAmount(localAmount);
        }
    }, [localAmount]);

    useEffect(() => {
        if (!selectedCountry) {
            router.back();
        }
    }, [selectedCountry, router]);

    if (!selectedCountry) {
        return null;
    }

    const handleContinue = () => {
        if (localAmount && parseFloat(localAmount) > 0) {
            router.push('/international-send/recipient-details');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Amount & Preview</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    {/* Amount Input Section */}
                    <View style={styles.section}>
                        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
                            How much do you want to send?
                        </ThemedText>
                        <View style={[styles.amountInputContainer, { backgroundColor: colors.surface }]}>
                            <ThemedText style={[styles.currencySymbol, { color: colors.text }]}>₦</ThemedText>
                            <TextInput
                                style={[styles.amountInput, { color: colors.text }]}
                                placeholder="0.00"
                                placeholderTextColor={colors.textSecondary}
                                keyboardType="decimal-pad"
                                value={localAmount}
                                onChangeText={setLocalAmount}
                            />
                        </View>
                        <ThemedText style={[styles.hint, { color: colors.textSecondary }]}>
                            Sending to {selectedCountry.name}
                        </ThemedText>
                    </View>

                    {/* Preview Section */}
                    {localAmount && !isNaN(parseFloat(localAmount)) && parseFloat(localAmount) > 0 && (
                        <View style={[styles.section, { backgroundColor: colors.surface, borderRadius: 12, padding: 16 }]}>
                            <View style={styles.previewRow}>
                                <ThemedText style={[styles.previewLabel, { color: colors.textSecondary }]}>
                                    Amount to Send
                                </ThemedText>
                                <ThemedText style={[styles.previewValue, { color: colors.text }]}>
                                    ₦{parseFloat(localAmount).toLocaleString('en-NG', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </ThemedText>
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.textSecondary + '20' }]} />

                            <View style={styles.previewRow}>
                                <View>
                                    <ThemedText style={[styles.previewLabel, { color: colors.textSecondary }]}>
                                        Exchange Rate
                                    </ThemedText>
                                    <ThemedText style={[styles.previewHint, { color: colors.textSecondary }]}>
                                        1 NGN = {(1 / exchangeRate).toFixed(6)} {selectedCountry.currencyCode}
                                    </ThemedText>
                                </View>
                                <ThemedText style={[styles.previewValue, { color: colors.text }]}>
                                    {selectedCountry.currencyCode} 1 = ₦{exchangeRate.toFixed(2)}
                                </ThemedText>
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.textSecondary + '20' }]} />

                            <View style={styles.previewRow}>
                                <View>
                                    <ThemedText style={[styles.previewLabel, { color: colors.textSecondary }]}>
                                        Transaction Fee
                                    </ThemedText>
                                    <ThemedText style={[styles.previewHint, { color: colors.textSecondary }]}>
                                        1.5% of amount
                                    </ThemedText>
                                </View>
                                <ThemedText style={[styles.previewValue, { color: colors.text }]}>
                                    ₦{fees.toLocaleString('en-NG', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </ThemedText>
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.textSecondary + '20' }]} />

                            <View style={styles.previewRow}>
                                <ThemedText style={[styles.previewLabel, { color: colors.textSecondary, fontWeight: '600' }]}>
                                    Recipient Receives
                                </ThemedText>
                                <ThemedText
                                    style={[
                                        styles.previewValue,
                                        { color: colors.primary, fontWeight: '700', fontSize: 18 },
                                    ]}
                                >
                                    {selectedCountry.currencyCode}{' '}
                                    {amountReceived.toLocaleString('en-NG', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </ThemedText>
                            </View>
                        </View>
                    )}

                    {/* Info Box */}
                    <View
                        style={[
                            styles.infoBox,
                            { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' },
                        ]}
                    >
                        <Info size={16} color={colors.primary} />
                        <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                            Exchange rate is live. Fee is fixed for this transaction.
                        </ThemedText>
                    </View>

                    <View style={styles.spacer} />

                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        disabled={!localAmount || parseFloat(localAmount) <= 0}
                    />
                </View>
            </TouchableWithoutFeedback>
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
        padding: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 12,
        minHeight: 64,
    },
    currencySymbol: {
        fontSize: 32,
        fontWeight: '700',
        marginRight: 8,
        marginTop: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 28,
        fontWeight: '600',
        padding: 0,
        minHeight: 40,
    },
    hint: {
        fontSize: 13,
        marginTop: 8,
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    previewLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    previewHint: {
        fontSize: 12,
        marginTop: 2,
    },
    previewValue: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
    },
    divider: {
        height: 1,
        marginVertical: 8,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 12,
        gap: 12,
        marginBottom: 24,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
    },
    spacer: {
        flex: 1,
    },
});
