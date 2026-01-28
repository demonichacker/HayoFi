import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function CardTermsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const handleAgree = () => {
        router.push('/card/fund-card-modal');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>Terms & Conditions</ThemedText>
                </View>

                {/* Warning Banner */}
                <GlassView style={[styles.warningBanner, { backgroundColor: isDark ? 'rgba(255, 193, 7, 0.05)' : 'rgba(255, 193, 7, 0.1)' }]}>
                    <AlertCircle size={20} color="#FFC107" />
                    <ThemedText style={[styles.warningText, { color: '#FFC107' }]}>
                        Please read carefully before proceeding
                    </ThemedText>
                </GlassView>

                {/* Important Information Card */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Important Information</ThemedText>

                    <View style={styles.warningContent}>
                        <ThemedText style={[styles.warningMessage, { color: colors.textSecondary }]}>
                            Your virtual card is a prepaid card linked to your Hayo Fi wallet. Please understand the following important terms and conditions before creating your card:
                        </ThemedText>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>1. Card Funding</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • Your card must be funded with money from your connected wallet• Only funds available in your wallet can be used on the card• The card creation fee is non-refundable
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>2. Security & Safety</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • Keep your card details confidential• Do not share your PIN or card number with anyone• Report suspicious activity immediately• Hayo Fi is not responsible for unauthorized use if you share your details
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>3. Transaction Limits</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • Daily spending limit: 5,000 USD or equivalent• Monthly spending limit: 20,000 USD or equivalent• Limits may vary based on account tier• Exceeding limits will result in declined transactions
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>4. Charges & Fees</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • One-time creation fee applies (as shown in previous screen)• Foreign transaction fees may apply• ATM withdrawal fees: 2.5% or minimum 1 USD• Inactivity fee: 5 USD per month after 12 months of no usage
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>5. Fraud & Disputes</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • Report disputes within 90 days of transaction• Chargeback disputes must be initiated through Hayo Fi• We will investigate and assist in resolution• Fraudulent activity may result in account suspension
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>6. Card Cancellation</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • You can freeze/unfreeze your card anytime• Cancellation is permanent and cannot be undone• Remaining balance will be refunded to your wallet• Creation fee is not refundable
                            </ThemedText>
                        </View>

                        <View style={styles.termsSection}>
                            <ThemedText style={styles.termTitle}>7. Compliance</ThemedText>
                            <ThemedText style={[styles.termText, { color: colors.textSecondary }]}>
                                • Your account must comply with all regulations• Hayo Fi reserves the right to freeze accounts for suspicious activity• Terms may be updated at any time• Continued use implies acceptance of new terms
                            </ThemedText>
                        </View>
                    </View>
                </GlassView>

                {/* Acknowledgment */}
                <GlassView style={styles.acknowledgmentCard}>
                    <ThemedText style={[styles.acknowledgmentText, { color: colors.textSecondary }]}>
                        By clicking "I Agree", you confirm that you have read, understood, and accept these terms and conditions.
                    </ThemedText>
                </GlassView>

                {/* CTA Button */}
                <TouchableOpacity
                    style={[styles.agreeButton, { backgroundColor: colors.primary }]}
                    onPress={handleAgree}
                >
                    <ThemedText style={styles.agreeButtonText}>I Agree & Continue</ThemedText>
                    <ChevronRight size={20} color="#000" />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 24,
    },
    backButton: {
        fontSize: 14,
        marginBottom: 12,
        color: Colors.dark.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
    },
    warningText: {
        fontSize: 12,
        fontWeight: '600',
        flex: 1,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    warningContent: {
        gap: 16,
    },
    warningMessage: {
        fontSize: 12,
        lineHeight: 18,
    },
    termsSection: {
        gap: 8,
    },
    termTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.dark.primary,
    },
    termText: {
        fontSize: 11,
        lineHeight: 16,
    },
    acknowledgmentCard: {
        borderRadius: 24,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: Colors.dark.primary + '40',
    },
    acknowledgmentText: {
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
    agreeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
    },
    agreeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
