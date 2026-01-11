import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

export default function TopUpScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState<'card' | 'bank'>('card');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Top Up Wallet</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Enter Amount (₦)</ThemedText>
                <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
                    placeholder="0.00"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    autoFocus
                />

                <ThemedText style={[styles.label, { color: colors.textSecondary, marginTop: 32 }]}>Select Method</ThemedText>

                <TouchableOpacity
                    style={[styles.methodCard, { backgroundColor: colors.surface, borderColor: method === 'card' ? colors.primary : 'transparent', borderWidth: 1 }]}
                    onPress={() => setMethod('card')}
                >
                    <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                        <CreditCard size={24} color={colors.primary} />
                    </View>
                    <View style={styles.methodInfo}>
                        <ThemedText type="defaultSemiBold">Debit Card</ThemedText>
                        <ThemedText style={[styles.subtext, { color: colors.textSecondary }]}>Instant funding</ThemedText>
                    </View>
                    <View style={[styles.radio, { borderColor: method === 'card' ? colors.primary : colors.textSecondary }]}>
                        {method === 'card' && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.methodCard, { backgroundColor: colors.surface, borderColor: method === 'bank' ? colors.primary : 'transparent', borderWidth: 1 }]}
                    onPress={() => setMethod('bank')}
                >
                    <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                        <Banknote size={24} color={colors.primary} />
                    </View>
                    <View style={styles.methodInfo}>
                        <ThemedText type="defaultSemiBold">Bank Transfer</ThemedText>
                        <ThemedText style={[styles.subtext, { color: colors.textSecondary }]}>Direct deposit</ThemedText>
                    </View>
                    <View style={[styles.radio, { borderColor: method === 'bank' ? colors.primary : colors.textSecondary }]}>
                        {method === 'bank' && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
                    </View>
                </TouchableOpacity>

                <View style={styles.spacer} />

                <Button title={`Top Up ₦${amount || '0.00'}`} onPress={() => router.back()} />
            </View>
        </SafeAreaView>
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
        padding: 4,
    },
    content: {
        padding: 24,
        flex: 1,
    },
    label: {
        fontSize: 14,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    input: {
        fontSize: 48,
        fontFamily: 'space-mono',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        paddingVertical: 16,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        gap: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodInfo: {
        flex: 1,
    },
    subtext: {
        fontSize: 12,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    spacer: {
        flex: 1,
    },
});
