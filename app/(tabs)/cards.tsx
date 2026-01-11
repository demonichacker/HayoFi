import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Lock, Eye, Settings as SettingsIcon, Shield } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { CreditCard } from '@/components/CreditCard';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function CardsScreen() {
    const { user } = useAuth();
    const { colors, isDark } = useTheme();
    const [isFrozen, setIsFrozen] = useState(false);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <ThemedText type="title">My Cards</ThemedText>
                    <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
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
                    <CreditCard
                        holderName={user?.name || 'Ian O'}
                        cardNumber="4242"
                        expiry="12/28"
                        type="visa"
                        variant="primary"
                    />
                    <View style={{ width: 16 }} />
                    <CreditCard
                        holderName={user?.name || 'Ian O'}
                        cardNumber="9012"
                        expiry="08/29"
                        type="mastercard"
                        variant="black"
                    />
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
});
