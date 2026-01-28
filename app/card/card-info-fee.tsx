import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function CardInfoFeeScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { accountType, cardType, getCardFee } = useCard();

    const fee = getCardFee();
    const feeDisplay = accountType === 'dollar' ? `$${fee}` : `₦${fee}`;
    const cardTypeDisplay = cardType === 'mastercard' ? 'Mastercard' : 'Visa';

    const handleGetCard = () => {
        router.push('/card/card-terms');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>Your Card Details</ThemedText>
                </View>

                {/* Card Preview */}
                <GlassView style={[styles.cardPreview, { backgroundColor: colors.primary }]}>
                    <View style={styles.cardTop}>
                        <CreditCard size={32} color="#fff" />
                        <ThemedText style={styles.cardBrand}>{cardTypeDisplay}</ThemedText>
                    </View>
                    <View style={styles.cardMiddle}>
                        <ThemedText style={styles.cardNumber}>•••• •••• •••• 4829</ThemedText>
                    </View>
                    <View style={styles.cardBottom}>
                        <View>
                            <ThemedText style={styles.cardLabel}>CARDHOLDER</ThemedText>
                            <ThemedText style={styles.cardValue}>Your Name</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={styles.cardLabel}>EXPIRES</ThemedText>
                            <ThemedText style={styles.cardValue}>MM/YY</ThemedText>
                        </View>
                    </View>
                </GlassView>

                {/* Card Info */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Card Information</ThemedText>

                    <View style={styles.infoItem}>
                        <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                            Card Type
                        </ThemedText>
                        <ThemedText style={styles.infoValue}>{cardTypeDisplay}</ThemedText>
                    </View>

                    <View style={styles.infoItem}>
                        <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                            Account Type
                        </ThemedText>
                        <ThemedText style={styles.infoValue}>
                            {accountType === 'dollar' ? 'USD' : 'NGN'}
                        </ThemedText>
                    </View>

                    <View style={[styles.infoItem, { paddingBottom: 0 }]}>
                        <ThemedText style={[styles.infoLabel, { color: colors.textSecondary }]}>
                            Validity
                        </ThemedText>
                        <ThemedText style={styles.infoValue}>3 Years</ThemedText>
                    </View>
                </GlassView>

                {/* Fee Section */}
                <GlassView style={[styles.card, { borderWidth: 1, borderColor: `${colors.primary}40` }]}>
                    <ThemedText style={styles.sectionTitle}>Creation Fee</ThemedText>

                    <View style={[styles.feeContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                        <ThemedText style={[styles.feeLabel, { color: colors.textSecondary }]}>
                            One-time Card Creation Fee
                        </ThemedText>
                        <ThemedText style={styles.feeAmount}>{feeDisplay}</ThemedText>
                    </View>

                    <ThemedText style={[styles.feeNote, { color: colors.textSecondary }]}>
                        This fee is charged only once when you create your virtual card. It will be deducted from your {accountType === 'dollar' ? 'Dollar' : 'Nigerian'} wallet.
                    </ThemedText>
                </GlassView>

                {/* CTA Button */}
                <TouchableOpacity
                    style={[styles.getCardButton, { backgroundColor: colors.primary }]}
                    onPress={handleGetCard}
                >
                    <ThemedText style={styles.getCardButtonText}>Continue</ThemedText>
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
    cardPreview: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        height: 200,
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardBrand: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardMiddle: {
        justifyContent: 'center',
    },
    cardNumber: {
        fontSize: 18,
        color: '#fff',
        letterSpacing: 2,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
    },
    cardValue: {
        fontSize: 12,
        color: '#fff',
        marginTop: 4,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        color: Colors.dark.textSecondary,
        textTransform: 'uppercase',
    },
    infoItem: {
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    infoLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    feeContainer: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    feeLabel: {
        fontSize: 12,
        marginBottom: 8,
    },
    feeAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    feeNote: {
        fontSize: 12,
        lineHeight: 16,
    },
    getCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
    },
    getCardButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
