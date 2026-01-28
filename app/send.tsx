import { View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Search } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';

export default function SendScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const { ngnBalance, subtractFromNgn } = useWallet();

    const recentContacts = [
        { id: '1', name: 'Alex M', tag: '@alexdev' },
        { id: '2', name: 'Sarah J', tag: '@sarahjs' },
        { id: '3', name: 'Mom', tag: '@bestmom' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Send Money</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <ThemedText style={[styles.label, { color: colors.textSecondary }]}>To</ThemedText>
                    <View style={[styles.inputGroup, { backgroundColor: colors.surface }]}>
                        <Search size={20} color={colors.textSecondary} />
                        <TextInput
                            style={[styles.recipientInput, { color: colors.text }]}
                            placeholder="Username, Tag, or Phone"
                            placeholderTextColor={colors.textSecondary}
                            value={recipient}
                            onChangeText={setRecipient}
                        />
                    </View>

                    {recentContacts.length > 0 && !recipient && (
                        <View style={styles.contacts}>
                            {recentContacts.map(contact => (
                                <TouchableOpacity
                                    key={contact.id}
                                    style={styles.contactItem}
                                    onPress={() => {
                                        setRecipient(contact.tag);
                                        Keyboard.dismiss();
                                    }}
                                >
                                    <View style={[styles.avatar, { backgroundColor: isDark ? '#333' : '#eee' }]}>
                                        <ThemedText style={{ fontWeight: 'bold' }}>{contact.name[0]}</ThemedText>
                                    </View>
                                    <ThemedText style={styles.contactName}>{contact.name}</ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <ThemedText style={[styles.label, { color: colors.textSecondary, marginTop: 32 }]}>Amount</ThemedText>
                    <TextInput
                        style={[styles.amountInput, { color: colors.text, borderColor: colors.primary }]}
                        placeholder="₦0.00"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <View style={styles.spacer} />

                    <Button
                        title={`Send ₦${amount || '0.00'}`}
                        onPress={() => {
                            Keyboard.dismiss();
                            const val = parseFloat(amount);
                            if (!val || isNaN(val) || val <= 0) {
                                Alert.alert('Invalid amount', 'Please enter a valid amount to send.');
                                return;
                            }
                            if (ngnBalance < val) {
                                Alert.alert('Insufficient funds', 'You do not have enough NGN balance to send that amount.');
                                return;
                            }
                            const ok = subtractFromNgn(val);
                            if (ok) {
                                router.back();
                            } else {
                                Alert.alert('Error', 'Could not complete transaction.');
                            }
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
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
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    recipientInput: {
        flex: 1,
        fontSize: 16,
    },
    contacts: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 20,
    },
    contactItem: {
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactName: {
        fontSize: 12,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        paddingVertical: 16,
    },
    spacer: {
        flex: 1,
    },
});
