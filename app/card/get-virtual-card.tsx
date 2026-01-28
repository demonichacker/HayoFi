import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function GetVirtualCardScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { resetCardFlow } = useCard();
    
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Reset card flow when entering this page
        resetCardFlow();

        // Card falling animation
        Animated.sequence([
            Animated.timing(translateY, {
                toValue: 100,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [translateY, resetCardFlow]);

    const handleGetCard = () => {
        router.push('/card/select-account-type');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>Get Virtual Card</ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Instant digital card for online purchases
                    </ThemedText>
                </View>

                {/* Card Animation */}
                <View style={styles.animationContainer}>
                    <Animated.View style={[styles.walletIcon, { transform: [{ translateY }] }]}>
                        <View style={[styles.cardAnimationBox, { backgroundColor: colors.primary }]}>
                            <CreditCard size={48} color="#000" />
                        </View>
                    </Animated.View>
                </View>

                {/* What Can You Do Section */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>What Can You Do?</ThemedText>
                    
                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <ThemedText style={styles.featureBullet}>•</ThemedText>
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Shop Online</ThemedText>
                                <ThemedText style={[styles.featureDesc, { color: colors.textSecondary }]}>
                                    Use anywhere Mastercard or Visa is accepted
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <ThemedText style={styles.featureBullet}>•</ThemedText>
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Secure Transactions</ThemedText>
                                <ThemedText style={[styles.featureDesc, { color: colors.textSecondary }]}>
                                    Industry-leading security with fraud protection
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <ThemedText style={styles.featureBullet}>•</ThemedText>
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Global Acceptance</ThemedText>
                                <ThemedText style={[styles.featureDesc, { color: colors.textSecondary }]}>
                                    Millions of merchants worldwide
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <ThemedText style={styles.featureBullet}>•</ThemedText>
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Instant Setup</ThemedText>
                                <ThemedText style={[styles.featureDesc, { color: colors.textSecondary }]}>
                                    Get your card details immediately
                                </ThemedText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <ThemedText style={styles.featureBullet}>•</ThemedText>
                            <View style={styles.featureContent}>
                                <ThemedText style={styles.featureTitle}>Easy Management</ThemedText>
                                <ThemedText style={[styles.featureDesc, { color: colors.textSecondary }]}>
                                    Control spending limits and freeze/unfreeze your card
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                </GlassView>

                {/* Where Accepted */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Accepted Worldwide</ThemedText>
                    
                    <View style={styles.acceptanceContainer}>
                        <View style={[styles.acceptanceBadge, { backgroundColor: `${colors.primary}20` }]}>
                            <ThemedText style={[styles.acceptanceText, { color: colors.primary }]}>
                                Online Retailers
                            </ThemedText>
                        </View>
                        <View style={[styles.acceptanceBadge, { backgroundColor: `${colors.primary}20` }]}>
                            <ThemedText style={[styles.acceptanceText, { color: colors.primary }]}>
                                Subscription Services
                            </ThemedText>
                        </View>
                        <View style={[styles.acceptanceBadge, { backgroundColor: `${colors.primary}20` }]}>
                            <ThemedText style={[styles.acceptanceText, { color: colors.primary }]}>
                                SaaS Platforms
                            </ThemedText>
                        </View>
                        <View style={[styles.acceptanceBadge, { backgroundColor: `${colors.primary}20` }]}>
                            <ThemedText style={[styles.acceptanceText, { color: colors.primary }]}>
                                Global Merchants
                            </ThemedText>
                        </View>
                    </View>
                </GlassView>

                {/* CTA Button */}
                <TouchableOpacity
                    style={[styles.getCardButton, { backgroundColor: colors.primary }]}
                    onPress={handleGetCard}
                >
                    <ThemedText style={styles.getCardButtonText}>Get Virtual Card</ThemedText>
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
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
    },
    animationContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    walletIcon: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardAnimationBox: {
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    featuresList: {
        gap: 16,
    },
    featureItem: {
        flexDirection: 'row',
        gap: 12,
    },
    featureBullet: {
        fontSize: 20,
        color: Colors.dark.primary,
        fontWeight: 'bold',
        marginTop: -2,
    },
    featureContent: {
        flex: 1,
        gap: 4,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    featureDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
    acceptanceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    acceptanceBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    acceptanceText: {
        fontSize: 12,
        fontWeight: '500',
    },
    getCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        marginTop: 8,
    },
    getCardButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
