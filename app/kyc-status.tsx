import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Shield, Crown } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useKYC } from '@/context/KYCContext';
import { Colors } from '@/constants/Colors';

export default function KYCStatusScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { tier, isVerified } = useKYC();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>KYC Verification</ThemedText>
                </View>

                {/* Current Tier Card */}
                <GlassView style={styles.card}>
                    <View style={styles.tierHeader}>
                        <Shield size={24} color={colors.primary} />
                        <ThemedText type="subtitle" style={styles.cardTitle}>Current Tier</ThemedText>
                    </View>

                    <View style={[styles.tierContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                        <View style={styles.tierContent}>
                            <View style={[styles.tierBadge, { backgroundColor: colors.primary }]}>
                                <ThemedText style={styles.tierBadgeText}>Tier {tier}</ThemedText>
                            </View>
                            <View style={styles.tierInfo}>
                                <ThemedText style={styles.tierName}>Tier {tier}</ThemedText>
                                <ThemedText style={[styles.tierDescription, { color: colors.textSecondary }]}>
                                    {isVerified ? 'Verified & Premium' : 'Basic account with limited features'}
                                </ThemedText>
                            </View>
                        </View>
                        {isVerified && (
                            <View style={[styles.verifiedBadge, { backgroundColor: '#10B981' }]}>
                                <ThemedText style={styles.verifiedText}>✓ Verified</ThemedText>
                            </View>
                        )}
                    </View>
                </GlassView>

                {/* Upgrade Section - Only show if not verified */}
                {!isVerified && (
                    <GlassView style={styles.card}>
                        <View style={styles.tierHeader}>
                            <Crown size={24} color={colors.primary} />
                            <ThemedText type="subtitle" style={styles.cardTitle}>Upgrade to Tier 2</ThemedText>
                        </View>

                        <ThemedText style={[styles.upgradeDescription, { color: colors.textSecondary }]}>
                            Unlock higher transaction limits and premium features by upgrading to Tier 2.
                        </ThemedText>

                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>•</ThemedText>
                                <ThemedText style={styles.featureText}>Higher daily transaction limits</ThemedText>
                            </View>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>•</ThemedText>
                                <ThemedText style={styles.featureText}>Access to premium features</ThemedText>
                            </View>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>•</ThemedText>
                                <ThemedText style={styles.featureText}>Priority customer support</ThemedText>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.upgradeButton, { backgroundColor: colors.primary }]}
                            onPress={() => router.push('/kyc-choose-type')}
                        >
                            <ThemedText style={styles.upgradeButtonText}>Upgrade to Tier 2</ThemedText>
                            <ChevronRight size={20} color="#000" />
                        </TouchableOpacity>
                    </GlassView>
                )}

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
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    tierHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
    },
    tierContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    tierContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tierBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tierBadgeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    tierInfo: {
        gap: 4,
    },
    tierName: {
        fontSize: 16,
        fontWeight: '600',
    },
    tierDescription: {
        fontSize: 12,
    },
    verifiedBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    upgradeDescription: {
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 20,
    },
    featuresList: {
        gap: 12,
        marginBottom: 20,
    },
    featureItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    featureBullet: {
        fontSize: 16,
        color: Colors.dark.primary,
        fontWeight: 'bold',
    },
    featureText: {
        fontSize: 14,
        flex: 1,
    },
    upgradeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
    },
    upgradeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
