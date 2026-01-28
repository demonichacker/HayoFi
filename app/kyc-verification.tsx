import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useKYC } from '@/context/KYCContext';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

export default function KYCVerificationScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colors, isDark } = useTheme();
    const { upgradeTier2 } = useKYC();
    const { updateUserTier } = useAuth();
    const [ninBvn, setNinBvn] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const verificationType = params.type as string || 'nin';
    const isNIN = verificationType === 'nin';
    const title = isNIN ? 'Enter Your NIN' : 'Enter Your BVN';
    const placeholder = isNIN ? 'Enter your 11-digit NIN' : 'Enter your 11-digit BVN';
    const label = isNIN ? 'National Identity Number (NIN)' : 'Bank Verification Number (BVN)';

    const handleVerification = async () => {
        if (!ninBvn.trim()) {
            Alert.alert('Error', `Please enter your ${isNIN ? 'NIN' : 'BVN'}`);
            return;
        }

        if (ninBvn.length < 11) {
            Alert.alert('Error', `${isNIN ? 'NIN' : 'BVN'} must be at least 11 characters long`);
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            upgradeTier2(ninBvn);
            updateUserTier(2);
            setIsLoading(false);
            Alert.alert('Success', 'Your account has been upgraded to Tier 2!', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/kyc-status'),
                },
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>{title}</ThemedText>
                </View>

                {/* Info Card */}
                <GlassView style={styles.card}>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        To upgrade to Tier 2, please provide your {isNIN ? 'National Identity Number (NIN)' : 'Bank Verification Number (BVN)'}.
                    </ThemedText>

                    <View style={styles.infoBox}>
                        <ThemedText style={styles.infoTitle}>What is this for?</ThemedText>
                        <View style={styles.infoList}>
                            <View style={styles.infoItem}>
                                <ThemedText style={styles.infoBullet}>•</ThemedText>
                                <ThemedText style={styles.infoText}>Compliance with Nigerian financial regulations</ThemedText>
                            </View>
                            <View style={styles.infoItem}>
                                <ThemedText style={styles.infoBullet}>•</ThemedText>
                                <ThemedText style={styles.infoText}>Verify your identity and protect your account</ThemedText>
                            </View>
                            <View style={styles.infoItem}>
                                <ThemedText style={styles.infoBullet}>•</ThemedText>
                                <ThemedText style={styles.infoText}>Unlock higher transaction limits</ThemedText>
                            </View>
                        </View>
                    </View>
                </GlassView>

                {/* Input Card */}
                <GlassView style={styles.card}>
                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>{label} *</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    color: colors.text,
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor={colors.textSecondary}
                            value={ninBvn}
                            onChangeText={setNinBvn}
                            keyboardType="numeric"
                            maxLength={20}
                            editable={!isLoading}
                        />
                        <ThemedText style={[styles.helperText, { color: colors.textSecondary }]}>
                            {ninBvn.length}/20 characters
                        </ThemedText>
                    </View>
                </GlassView>

                {/* Verify Button */}
                <TouchableOpacity
                    style={[
                        styles.verifyButton,
                        { backgroundColor: colors.primary, opacity: isLoading ? 0.6 : 1 },
                    ]}
                    onPress={handleVerification}
                    disabled={isLoading}
                >
                    <ThemedText style={styles.verifyButtonText}>
                        {isLoading ? 'Verifying...' : 'Verify & Upgrade'}
                    </ThemedText>
                    {!isLoading && <ChevronRight size={20} color="#000" />}
                </TouchableOpacity>

                {/* Security Notice */}
                <View style={styles.securityNotice}>
                    <ThemedText style={[styles.securityText, { color: colors.textSecondary }]}>
                        Your information is encrypted and stored securely. We never share your data with third parties.
                    </ThemedText>
                </View>

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
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    infoBox: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 16,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    infoList: {
        gap: 8,
    },
    infoItem: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-start',
    },
    infoBullet: {
        fontSize: 12,
        color: Colors.dark.primary,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 12,
        flex: 1,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    helperText: {
        fontSize: 12,
        marginTop: 4,
    },
    verifyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        marginBottom: 24,
    },
    verifyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    securityNotice: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    securityText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 16,
    },
});
