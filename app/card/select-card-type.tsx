import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function SelectCardTypeScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { setCardType } = useCard();

    const handleSelectMastercard = () => {
        setCardType('mastercard');
        router.push('/card/card-info-fee');
    };

    const handleSelectVisa = () => {
        setCardType('visa');
        router.push('/card/card-info-fee');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>Select Card Type</ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Choose your preferred card network
                    </ThemedText>
                </View>

                {/* Mastercard Option */}
                <TouchableOpacity onPress={handleSelectMastercard} activeOpacity={0.7}>
                    <GlassView
                        style={[
                            styles.cardOption,
                            { borderWidth: 2, borderColor: colors.primary },
                        ]}
                    >
                        <View style={styles.cardHeader}>
                            <View style={[styles.logoBadge, { backgroundColor: `${colors.primary}20` }]}>
                                <ThemedText style={styles.mastercardLogo}>M</ThemedText>
                            </View>
                            <View style={styles.cardInfo}>
                                <ThemedText style={styles.cardName}>Mastercard</ThemedText>
                                <ThemedText style={[styles.cardDesc, { color: colors.textSecondary }]}>
                                    Worldwide Acceptance
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.primary} />
                        </View>
                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
                        <View style={styles.cardFeatures}>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Accepted at 35+ million merchants
                            </ThemedText>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Zero liability protection
                            </ThemedText>
                        </View>
                    </GlassView>
                </TouchableOpacity>

                {/* Visa Option */}
                <TouchableOpacity onPress={handleSelectVisa} activeOpacity={0.7}>
                    <GlassView style={styles.cardOption}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.logoBadge, { backgroundColor: `${colors.primary}20` }]}>
                                <ThemedText style={styles.visaLogo}>V</ThemedText>
                            </View>
                            <View style={styles.cardInfo}>
                                <ThemedText style={styles.cardName}>Visa</ThemedText>
                                <ThemedText style={[styles.cardDesc, { color: colors.textSecondary }]}>
                                    Global Standard
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.textSecondary} />
                        </View>
                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
                        <View style={styles.cardFeatures}>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Accepted at 40+ million merchants
                            </ThemedText>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Enhanced buyer protection
                            </ThemedText>
                        </View>
                    </GlassView>
                </TouchableOpacity>

                {/* Info Card */}
                <GlassView style={styles.infoCard}>
                    <ThemedText style={[styles.infoTitle, { color: colors.textSecondary }]}>
                        Why Choose?
                    </ThemedText>
                    <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                        Both Mastercard and Visa are widely accepted globally. Choose based on your preference or where you shop most frequently.
                    </ThemedText>
                </GlassView>

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
        marginBottom: 32,
    },
    backButton: {
        fontSize: 14,
        marginBottom: 12,
        color: Colors.dark.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
    },
    cardOption: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    logoBadge: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mastercardLogo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    visaLogo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    cardInfo: {
        flex: 1,
        gap: 4,
    },
    cardName: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardDesc: {
        fontSize: 12,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    cardFeatures: {
        gap: 6,
    },
    featureItem: {
        fontSize: 12,
    },
    infoCard: {
        borderRadius: 20,
        padding: 16,
        marginTop: 8,
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 12,
        lineHeight: 16,
    },
});
