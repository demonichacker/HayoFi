import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Globe, Building2 } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useInternationalSend } from '@/context/InternationalSendContext';

export default function SendTypeScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { sendType, setSendType } = useInternationalSend();

    const handleSendTypeSelect = (type: 'local' | 'international') => {
        setSendType(type);
        if (type === 'local') {
            router.push('/send');
        } else {
            router.push('/international-send/country-selection');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Send Money</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Choose where you want to send money
                </ThemedText>

                <View style={styles.optionsContainer}>
                    {/* Local Send Option */}
                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            {
                                backgroundColor: colors.surface,
                                borderColor: sendType === 'local' ? colors.primary : colors.textSecondary + '20',
                                borderWidth: sendType === 'local' ? 2 : 1,
                            },
                        ]}
                        onPress={() => handleSendTypeSelect('local')}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
                            <Building2 size={40} color={colors.primary} />
                        </View>
                        <View style={styles.optionContent}>
                            <ThemedText type="subtitle" style={styles.optionTitle}>
                                Send Locally
                            </ThemedText>
                            <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                                Send money to friends or businesses in Nigeria
                            </ThemedText>
                        </View>
                    </TouchableOpacity>

                    {/* International Send Option */}
                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            {
                                backgroundColor: colors.surface,
                                borderColor: sendType === 'international' ? colors.primary : colors.textSecondary + '20',
                                borderWidth: sendType === 'international' ? 2 : 1,
                            },
                        ]}
                        onPress={() => handleSendTypeSelect('international')}
                    >
                        <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
                            <Globe size={40} color={colors.primary} />
                        </View>
                        <View style={styles.optionContent}>
                            <ThemedText type="subtitle" style={styles.optionTitle}>
                                Send International
                            </ThemedText>
                            <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                                Send money internationally with competitive rates
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.spacer} />

                <Button
                    title="Continue"
                    onPress={() => {
                        if (sendType === 'local') {
                            router.push('/send');
                        } else if (sendType === 'international') {
                            router.push('/international-send/country-selection');
                        }
                    }}
                    disabled={!sendType}
                />
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
        padding: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        fontWeight: '500',
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 13,
        lineHeight: 18,
    },
    spacer: {
        flex: 1,
    },
});
