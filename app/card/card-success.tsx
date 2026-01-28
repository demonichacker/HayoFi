import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { CreditCard } from '@/components/CreditCard';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function CardSuccessScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { accountType, cardType, amount, resetCardFlow, setCardCreated, addCard } = useCard();
    const { user } = useAuth();

    const handleDone = () => {
        // Add card to created cards array
        if (accountType && cardType) {
            addCard({
                accountType,
                cardType,
                amount,
                cardNumber: accountType === 'dollar' ? '4242' : '9012',
                expiry: accountType === 'dollar' ? '12/28' : '08/29',
            });
        }
        setCardCreated(true);
        resetCardFlow();
        router.replace('/(tabs)/cards');
    };

    const handleViewCard = () => {
        // Add card to created cards array
        if (accountType && cardType) {
            addCard({
                accountType,
                cardType,
                amount,
                cardNumber: accountType === 'dollar' ? '4242' : '9012',
                expiry: accountType === 'dollar' ? '12/28' : '08/29',
            });
        }
        setCardCreated(true);
        resetCardFlow();
        router.replace('/(tabs)/cards');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Success Icon */}
                <View style={styles.successIconContainer}>
                    <CheckCircle size={80} color={colors.primary} />
                </View>

                {/* Success Message */}
                <View style={styles.messageContainer}>
                    <ThemedText type="title" style={styles.successTitle}>
                        Card Created Successfully!
                    </ThemedText>
                    <ThemedText style={[styles.successMessage, { color: colors.textSecondary }]}>
                        Your virtual card is ready to use
                    </ThemedText>
                </View>

                {/* Glowing Card Display */}
                <View style={styles.cardDisplayContainer}>
                    {accountType === 'dollar' && (
                        <CreditCard
                            holderName={user?.name || 'Ian O'}
                            cardNumber="4242"
                            expiry="12/28"
                            type={cardType === 'visa' ? 'visa' : 'mastercard'}
                            variant="primary"
                        />
                    )}
                    {accountType === 'nigerian' && (
                        <CreditCard
                            holderName={user?.name || 'Ian O'}
                            cardNumber="9012"
                            expiry="08/29"
                            type={cardType === 'visa' ? 'visa' : 'mastercard'}
                            variant="black"
                        />
                    )}
                </View>

                {/* Card Details Summary */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Card Details</ThemedText>

                    <View style={styles.detailItem}>
                        <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>
                            Card Type
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                            {cardType === 'mastercard' ? 'Mastercard' : 'Visa'}
                        </ThemedText>
                    </View>

                    <View style={styles.detailItem}>
                        <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>
                            Currency
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                            {accountType === 'dollar' ? 'USD (Dollar)' : 'NGN (Naira)'}
                        </ThemedText>
                    </View>

                    <View style={styles.detailItem}>
                        <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>
                            Card Balance
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                            {accountType === 'dollar' ? '$' : '₦'}{amount?.toFixed(2)}
                        </ThemedText>
                    </View>

                    <View style={[styles.detailItem, { paddingBottom: 0 }]}>
                        <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>
                            Status
                        </ThemedText>
                        <ThemedText style={[styles.detailValue, { color: '#10B981' }]}>
                            ✓ Active
                        </ThemedText>
                    </View>
                </GlassView>

                {/* Next Steps */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>What's Next?</ThemedText>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                            <ThemedText style={styles.stepNumberText}>1</ThemedText>
                        </View>
                        <View style={styles.stepContent}>
                            <ThemedText style={styles.stepTitle}>View Your Card</ThemedText>
                            <ThemedText style={[styles.stepDesc, { color: colors.textSecondary }]}>
                                Access your card details in the Cards section
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                            <ThemedText style={styles.stepNumberText}>2</ThemedText>
                        </View>
                        <View style={styles.stepContent}>
                            <ThemedText style={styles.stepTitle}>Add to Wallet</ThemedText>
                            <ThemedText style={[styles.stepDesc, { color: colors.textSecondary }]}>
                                Add your card to your mobile wallet for contactless payments
                            </ThemedText>
                        </View>
                    </View>

                    <View style={styles.stepItem}>
                        <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                            <ThemedText style={styles.stepNumberText}>3</ThemedText>
                        </View>
                        <View style={styles.stepContent}>
                            <ThemedText style={styles.stepTitle}>Start Shopping</ThemedText>
                            <ThemedText style={[styles.stepDesc, { color: colors.textSecondary }]}>
                                Use your card anywhere Mastercard or Visa is accepted
                            </ThemedText>
                        </View>
                    </View>
                </GlassView>

                {/* CTA Buttons */}
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                    onPress={handleViewCard}
                >
                    <ThemedText style={styles.primaryButtonText}>View My Card</ThemedText>
                    <ChevronRight size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.secondaryButton, { borderColor: colors.primary }]}
                    onPress={handleDone}
                >
                    <ThemedText style={[styles.secondaryButtonText, { color: colors.primary }]}>
                        Done
                    </ThemedText>
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
        alignItems: 'center',
    },
    successIconContainer: {
        marginVertical: 32,
    },
    messageContainer: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%',
    },
    successTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 14,
        textAlign: 'center',
    },
    cardDisplayContainer: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.dark.textSecondary,
        textTransform: 'uppercase',
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    detailLabel: {
        fontSize: 12,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    stepItem: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    stepNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
        gap: 4,
    },
    stepTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    stepDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
    primaryButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        marginBottom: 12,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    secondaryButton: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
