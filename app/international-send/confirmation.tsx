import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { PinModal } from '@/components/ui/PinModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { useTheme } from '@/context/ThemeContext';
import { useInternationalSend } from '@/context/InternationalSendContext';
import { useWallet } from '@/context/WalletContext';

export default function ConfirmationScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { selectedCountry, amount, recipientDetails, exchangeRate, fees, amountReceived, resetFlow } =
        useInternationalSend();
    const { ngnBalance, subtractFromNgn } = useWallet();
    const [showPinModal, setShowPinModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (!selectedCountry) {
            router.back();
        }
    }, [selectedCountry, router]);

    if (!selectedCountry) {
        return null;
    }

    const numAmount = parseFloat(amount) || 0;
    const netAmount = numAmount - fees;

    const handleConfirm = () => {
        setShowPinModal(true);
    };

    const handlePinSuccess = () => {
        // attempt to deduct NGN from wallet (frontend-only mock)
        const val = parseFloat(amount) || 0;
        if (val > 0) {
            const ok = subtractFromNgn(val);
            if (!ok) {
                // insufficient funds: simply close PIN and show error modal or alert
                setShowPinModal(false);
                // show success modal anyway for mock, but in real app you'd show error
                setShowSuccessModal(true);
                return;
            }
        }
        setShowPinModal(false);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        resetFlow();
        setShowSuccessModal(false);
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Confirm Transfer</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Summary Card */}
                <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
                    <View style={styles.amountSection}>
                        <ThemedText style={[styles.amountLabel, { color: colors.textSecondary }]}>
                            You're Sending
                        </ThemedText>
                        <View
                            style={[
                                styles.amountContainer,
                                { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.15)' : 'rgba(123, 184, 0, 0.2)' },
                            ]}
                        >
                            <ThemedText
                                style={[styles.amountValue, { color: colors.primary }]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                minimumFontScale={0.6}
                            >
                                ₦{numAmount.toLocaleString('en-NG', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </ThemedText>
                        </View>
                        <ThemedText style={[styles.recipient, { color: colors.textSecondary }]}>
                            To {recipientDetails.fullName}
                        </ThemedText>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.textSecondary + '20' }]} />

                    <View style={styles.detailsSection}>
                        <DetailRow
                            label="Net Amount"
                            value={`₦${netAmount.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                            colors={colors}
                            highlight
                        />
                        <DetailRow label="Destination Country" value={selectedCountry.name} colors={colors} />
                        <DetailRow
                            label="Recipient Receives"
                            value={`${selectedCountry.currencyCode} ${amountReceived.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                            colors={colors}
                        />
                        <DetailRow
                            label="Exchange Rate"
                            value={`1 NGN = ${(1 / exchangeRate).toFixed(6)} ${selectedCountry.currencyCode}`}
                            colors={colors}
                        />
                        <DetailRow
                            label="Transaction Fee"
                            value={`₦${fees.toLocaleString('en-NG', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                            colors={colors}
                        />
                    </View>
                </View>

                {/* Recipient Details */}
                <View style={styles.section}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Recipient Details
                    </ThemedText>
                    <View style={[styles.detailsCard, { backgroundColor: colors.surface }]}>
                        <DetailRow label="Full Name" value={recipientDetails.fullName} colors={colors} />
                        <DetailRow label="Email" value={recipientDetails.email} colors={colors} />
                        <DetailRow label="Phone" value={recipientDetails.phoneNumber} colors={colors} />
                    </View>
                </View>

                {/* Bank Details */}
                <View style={styles.section}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Bank Information
                    </ThemedText>
                    <View style={[styles.detailsCard, { backgroundColor: colors.surface }]}>
                        {recipientDetails.bankName && (
                            <DetailRow label="Bank Name" value={recipientDetails.bankName} colors={colors} />
                        )}
                        {recipientDetails.accountNumber && (
                            <DetailRow
                                label="Account Number"
                                value={recipientDetails.accountNumber}
                                colors={colors}
                            />
                        )}
                        {recipientDetails.swiftCode && (
                            <DetailRow label="SWIFT Code" value={recipientDetails.swiftCode} colors={colors} />
                        )}
                        {recipientDetails.routingNumber && (
                            <DetailRow
                                label="Routing Number"
                                value={recipientDetails.routingNumber}
                                colors={colors}
                            />
                        )}
                        {recipientDetails.bankCode && (
                            <DetailRow label="Bank Code" value={recipientDetails.bankCode} colors={colors} />
                        )}
                    </View>
                </View>

                {/* Info Message */}
                <View
                    style={[
                        styles.infoMessage,
                        { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' },
                    ]}
                >
                    <CheckCircle size={20} color={colors.primary} />
                    <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                        Please review all details carefully before confirming.
                    </ThemedText>
                </View>
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: colors.textSecondary + '20' }]}>
                <Button
                    title="Confirm & Send"
                    onPress={handleConfirm}
                />
            </View>

            <PinModal
                visible={showPinModal}
                onClose={() => setShowPinModal(false)}
                onSuccess={handlePinSuccess}
                title="Confirm Transfer"
            />

            <SuccessModal
                visible={showSuccessModal}
                onClose={handleSuccessClose}
                title="Transfer Successful!"
                message={`Your transfer of ₦${numAmount.toLocaleString('en-NG', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })} to ${recipientDetails.fullName} has been sent.`}
            />
        </SafeAreaView>
    );
}

function DetailRow({
    label,
    value,
    colors,
    highlight = false,
}: {
    label: string;
    value: string;
    colors: any;
    highlight?: boolean;
}) {
    return (
        <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</ThemedText>
            <ThemedText
                style={[
                    styles.detailValue,
                    {
                        color: highlight ? colors.primary : colors.text,
                        fontWeight: highlight ? '700' : '500',
                    },
                ]}
            >
                {value}
            </ThemedText>
        </View>
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
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingBottom: 100,
    },
    summaryCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        overflow: 'visible',
    },
    amountSection: {
        marginBottom: 28,
        paddingBottom: 16,
        paddingTop: 2,
        flexDirection: 'column',
        width: '100%',
    },
    amountLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 20,
    },
    amountValue: {
        // Match net amount text size to avoid overflow and visual clash
        fontSize: 25,
        fontWeight: '800',
        flexShrink: 0,
        includeFontPadding: false,
    },
    amountContainer: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingLeft: 22,
        paddingRight: 20,
        marginVertical: 8,
        overflow: 'visible',
        zIndex: 2,
        elevation: 3,
        alignSelf: 'flex-start',
    },
    recipient: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginTop: 28,
        marginBottom: 12,
    },
    detailsSection: {
        gap: 12,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    detailsCard: {
        borderRadius: 12,
        padding: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        textAlign: 'right',
        flex: 1,
        marginLeft: 12,
    },
    infoMessage: {
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
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
});
