import { View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ScanFace } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function SignInScreen() {
    const router = useRouter();
    const { signIn } = useAuth();
    const { colors, isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);
        // Mock login delay
        setTimeout(() => {
            signIn(email);
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    const handleBiometricAuth = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware) {
                Alert.alert('Not Available', 'Face ID / Touch ID hardware not detected.');
                return;
            }

            if (!isEnrolled) {
                Alert.alert(
                    'Not Set Up',
                    'Face ID is not set up. If in Simulator, go to Features > Face ID > Enrolled.'
                );
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login to HayoFi',
                fallbackLabel: 'Use Password',
            });

            if (result.success) {
                signIn('ian@hayofi.com'); // Login with default biometric email
                router.replace('/(tabs)');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred with Face ID.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
                <ArrowLeft color={colors.text} size={24} />
            </TouchableOpacity>

            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
                <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</ThemedText>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Email Address</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: isDark ? '#333' : '#E4E4E7',
                                    color: colors.text
                                }
                            ]}
                            placeholder="name@example.com"
                            placeholderTextColor={colors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Password</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: isDark ? '#333' : '#E4E4E7',
                                    color: colors.text
                                }
                            ]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity>
                        <ThemedText style={[styles.forgotPassword, { color: colors.primary }]}>Forgot Password?</ThemedText>
                    </TouchableOpacity>

                    <Button
                        title="Sign In"
                        onPress={handleSignIn}
                        loading={loading}
                        style={styles.signInBtn}
                    />

                    <View style={styles.divider}>
                        <View style={[styles.line, { backgroundColor: isDark ? '#333' : '#E4E4E7' }]} />
                        <ThemedText style={[styles.orText, { color: colors.textSecondary }]}>OR</ThemedText>
                        <View style={[styles.line, { backgroundColor: isDark ? '#333' : '#E4E4E7' }]} />
                    </View>

                    <TouchableOpacity onPress={handleBiometricAuth} style={styles.biometricBtn}>
                        <ScanFace size={32} color={colors.primary} />
                        <ThemedText style={[styles.biometricText, { color: colors.primary }]}>Login with Face ID</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    backButton: {
        marginBottom: 32,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 48,
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
    },
    input: {
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
    },
    forgotPassword: {
        textAlign: 'right',
        fontSize: 14,
    },
    signInBtn: {
        marginTop: 12,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
    },
    orText: {
        marginHorizontal: 16,
    },
    biometricBtn: {
        alignItems: 'center',
        gap: 8,
    },
    biometricText: {
        fontSize: 14,
    },
});
