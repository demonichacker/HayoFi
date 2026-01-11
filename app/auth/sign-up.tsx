import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function SignUpScreen() {
    const router = useRouter();
    const { signUp } = useAuth();
    const { colors, isDark } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        // Mock signup delay
        setTimeout(() => {
            signUp(name, email);
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft color={colors.text} size={24} />
            </TouchableOpacity>

            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>Join HayoFi today</ThemedText>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <ThemedText style={[styles.label, { color: colors.textSecondary }]}>Full Name</ThemedText>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: isDark ? '#333' : '#E4E4E7',
                                    color: colors.text
                                }
                            ]}
                            placeholder="John Doe"
                            placeholderTextColor={colors.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

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

                    <Button
                        title="Create Account"
                        onPress={handleSignUp}
                        loading={loading}
                        style={styles.signUpBtn}
                    />
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
    signUpBtn: {
        marginTop: 24,
    },
});
