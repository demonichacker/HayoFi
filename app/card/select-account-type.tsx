import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useCard } from '@/context/CardContext';
import { Colors } from '@/constants/Colors';

export default function SelectAccountTypeScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { setAccountType } = useCard();

    const handleSelectNigerian = () => {
        setAccountType('nigerian');
        router.push('/card/select-card-type');
    };

    const handleSelectDollar = () => {
        setAccountType('dollar');
        router.push('/card/select-card-type');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>Select Account Type</ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Choose the currency for your virtual card
                    </ThemedText>
                </View>

                {/* Nigerian Account Option */}
                <TouchableOpacity onPress={handleSelectNigerian} activeOpacity={0.7}>
                    <GlassView
                        style={[
                            styles.accountCard,
                            { borderWidth: 2, borderColor: colors.primary },
                        ]}
                    >
                        <View style={styles.accountContent}>
                            <View style={[styles.currencyBadge, { backgroundColor: `${colors.primary}20` }]}>
                                <ThemedText style={[styles.currencySymbol, { color: colors.primary }]}>
                                    ₦
                                </ThemedText>
                            </View>
                            <View style={styles.accountInfo}>
                                <ThemedText style={styles.accountTitle}>Nigerian Account</ThemedText>
                                <ThemedText style={[styles.accountDesc, { color: colors.textSecondary }]}>
                                    NGN Currency • Local Support
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.primary} />
                        </View>
                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
                        <View style={styles.accountFeatures}>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Access to local merchants
                            </ThemedText>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • NGN funding
                            </ThemedText>
                        </View>
                    </GlassView>
                </TouchableOpacity>

                {/* Dollar Account Option */}
                <TouchableOpacity onPress={handleSelectDollar} activeOpacity={0.7}>
                    <GlassView style={styles.accountCard}>
                        <View style={styles.accountContent}>
                            <View style={[styles.currencyBadge, { backgroundColor: `${colors.primary}20` }]}>
                                <ThemedText style={[styles.currencySymbol, { color: colors.primary }]}>
                                    $
                                </ThemedText>
                            </View>
                            <View style={styles.accountInfo}>
                                <ThemedText style={styles.accountTitle}>Dollar Account</ThemedText>
                                <ThemedText style={[styles.accountDesc, { color: colors.textSecondary }]}>
                                    USD Currency • Global Payments
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.textSecondary} />
                        </View>
                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
                        <View style={styles.accountFeatures}>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • Global merchant acceptance
                            </ThemedText>
                            <ThemedText style={[styles.featureItem, { color: colors.textSecondary }]}>
                                • USD funding
                            </ThemedText>
                        </View>
                    </GlassView>
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
    backButton: {
        fontSize: 14,
        marginBottom: 12,
        color: Colors.dark.primary,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
    },
    accountCard: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    accountContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    currencyBadge: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currencySymbol: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    accountInfo: {
        flex: 1,
        gap: 4,
    },
    accountTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    accountDesc: {
        fontSize: 12,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    accountFeatures: {
        gap: 6,
    },
    featureItem: {
        fontSize: 12,
    },
});
