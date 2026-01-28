import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function CardPinEntryScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { setPin, accountType, getCardFee } = useCard();
    const [pin, setLocalPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateCard = async () => {
        if (!pin.trim()) {
            Alert.alert('Error', 'Please enter a PIN');
            return;
        }

        if (pin.length < 4) {
            Alert.alert('Error', 'PIN must be at least 4 digits');
            return;
        }

        if (pin !== confirmPin) {
            Alert.alert('Error', 'PINs do not match');
            return;
        }

        setIsLoading(true);
        setPin(pin);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/card/card-success');
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <ThemedText type="title" style={styles.title}>Create PIN</ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Set a 4-digit PIN to secure your card
                    </ThemedText>
                </View>

                {/* Order Summary */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>

                    <View style={styles.summaryItem}>
                        <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                            Card Creation Fee
                        </ThemedText>
                        <ThemedText style={styles.summaryValue}>
                            {accountType === 'dollar' ? `$${getCardFee()}` : `₦${getCardFee()}`}
                        </ThemedText>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

                    <View style={styles.summaryItem}>
                        <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                            Total Amount
                        </ThemedText>
                        <ThemedText style={styles.totalValue}>
                            {accountType === 'dollar' ? `$${getCardFee()}` : `₦${getCardFee()}`}
                        </ThemedText>
                    </View>
                </GlassView>

                {/* PIN Input */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Set Your PIN</ThemedText>

                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>PIN (4 digits) *</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    color: colors.text,
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            placeholder="Enter 4-digit PIN"
                            placeholderTextColor={colors.textSecondary}
                            value={pin}
                            onChangeText={setLocalPin}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            editable={!isLoading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>Confirm PIN *</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    color: colors.text,
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            placeholder="Confirm your PIN"
                            placeholderTextColor={colors.textSecondary}
                            value={confirmPin}
                            onChangeText={setConfirmPin}
                            keyboardType="numeric"
                            maxLength={4}
                            secureTextEntry
                            editable={!isLoading}
                        />
                    </View>

                    <ThemedText style={[styles.helpText, { color: colors.textSecondary }]}>
                        You'll need this PIN to authorize card transactions
                    </ThemedText>
                </GlassView>

                {/* Create Card Button */}
                <TouchableOpacity
                    style={[
                        styles.createButton,
                        { backgroundColor: colors.primary, opacity: isLoading ? 0.6 : 1 },
                    ]}
                    onPress={handleCreateCard}
                    disabled={isLoading}
                >
                    <ThemedText style={styles.createButtonText}>
                        {isLoading ? 'Creating Card...' : 'Create Card'}
                    </ThemedText>
                    {!isLoading && <ChevronRight size={20} color="#000" />}
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
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
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 12,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.dark.primary,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    inputGroup: {
        marginBottom: 16,
        gap: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 2,
    },
    helpText: {
        fontSize: 12,
        marginTop: 8,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
