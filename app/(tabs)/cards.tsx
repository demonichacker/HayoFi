import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Lock, Eye, Settings as SettingsIcon, Shield, ChevronRight, CreditCard as CardIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { CreditCard } from '@/components/CreditCard';
import { GlassView } from '@/components/ui/GlassView';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';

export default function CardsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const { colors, isDark } = useTheme();
    const { isCardCreated, createdCards } = useCard();
    const [isFrozen, setIsFrozen] = useState(false);

    const handleGetCard = () => {
        router.push('/card/get-virtual-card');
    };

    // Show get card page if no cards have been created
    if (!isCardCreated || createdCards.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.getCardHeader}>
                        <ThemedText type="title" style={styles.getCardTitle}>Get Virtual Card</ThemedText>
                    </View>

                    {/* Illustration */}
                    <View style={styles.illustrationContainer}>
                        <View style={[styles.cardIconBox, { backgroundColor: colors.primary }]}>
                            <CardIcon size={64} color="#000" />
                        </View>
                    </View>

                    {/* Content */}
                    <GlassView style={styles.getCardCard}>
                        <ThemedText style={styles.getCardMessage}>
                            Start your journey with a virtual card. Instant, secure, and globally accepted.
                        </ThemedText>

                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>✓</ThemedText>
                                <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>
                                    Instant card creation
                                </ThemedText>
                            </View>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>✓</ThemedText>
                                <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>
                                    Secure transactions worldwide
                                </ThemedText>
                            </View>
                            <View style={styles.featureItem}>
                                <ThemedText style={styles.featureBullet}>✓</ThemedText>
                                <ThemedText style={[styles.featureText, { color: colors.textSecondary }]}>
                                    Full control and management
                                </ThemedText>
                            </View>
                        </View>
                    </GlassView>

                    {/* CTA Button */}
                    <TouchableOpacity
                        style={[styles.getCardButton, { backgroundColor: colors.primary }]}
                        onPress={handleGetCard}
                    >
                        <ThemedText style={styles.getCardButtonText}>Get Virtual Card Now</ThemedText>
                        <ChevronRight size={20} color="#000" />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Show my cards if card has been created
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <ThemedText type="title">My Cards</ThemedText>
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: colors.primary }]}
                        onPress={handleGetCard}
                    >
                        <Plus size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.cardsScroll}
                    decelerationRate="fast"
                    snapToInterval={Dimensions.get('window').width - 48 + 16}
                >
                    {/* Display all created cards */}
                    {createdCards.map((card, index) => (
                        <View key={card.id}>
                            <CreditCard
                                holderName={user?.name || 'Ian O'}
                                cardNumber={card.cardNumber}
                                expiry={card.expiry}
                                type={card.cardType === 'visa' ? 'visa' : 'mastercard'}
                                variant={card.accountType === 'dollar' ? 'primary' : 'black'}
                            />
                            {index < createdCards.length - 1 && <View style={{ width: 16 }} />}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.controls}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>Card Settings</ThemedText>

                    <View style={[styles.controlRow, { backgroundColor: colors.surface }]}>
                        <View style={styles.controlLeft}>
                            <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                                <Lock size={20} color={colors.primary} />
                            </View>
                            <View>
                                <ThemedText type="defaultSemiBold">Freeze Card</ThemedText>
                                <ThemedText style={[styles.controlDesc, { color: colors.textSecondary }]}>Temporarily disable this card</ThemedText>
                            </View>
                        </View>
                        <Switch
                            value={isFrozen}
                            onValueChange={setIsFrozen}
                            trackColor={{ false: '#333', true: colors.primary }}
                            thumbColor={isFrozen ? '#000' : '#f4f3f4'}
                        />
                    </View>

                    <ControlItem icon={Eye} title="Show PIN" desc="View your 4-digit PIN" />
                    <ControlItem icon={Shield} title="Limits" desc="Set spending limits" />
                    <ControlItem icon={SettingsIcon} title="Settings" desc="Card details & options" />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

function ControlItem({ icon: Icon, title, desc }: any) {
    const { colors, isDark } = useTheme();
    return (
        <TouchableOpacity style={[styles.controlRow, { backgroundColor: colors.surface }]}>
            <View style={styles.controlLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                    <Icon size={20} color={colors.primary} />
                </View>
                <View>
                    <ThemedText type="defaultSemiBold">{title}</ThemedText>
                    <ThemedText style={[styles.controlDesc, { color: colors.textSecondary }]}>{desc}</ThemedText>
                </View>
            </View>
            <ThemedText style={{ color: colors.textSecondary }}>{'>'}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsScroll: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    controls: {
        padding: 24,
        gap: 24,
    },
    sectionTitle: {
        marginBottom: 8,
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
    },
    controlLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlDesc: {
        fontSize: 12,
    },
    getCardHeader: {
        padding: 24,
        paddingBottom: 16,
    },
    getCardTitle: {
        fontSize: 28,
    },
    illustrationContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    cardIconBox: {
        width: 120,
        height: 120,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getCardCard: {
        margin: 24,
        padding: 20,
        borderRadius: 24,
    },
    getCardMessage: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    featureBullet: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#10B981',
    },
    featureText: {
        fontSize: 13,
        flex: 1,
    },
    getCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginBottom: 40,
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
