import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, FileText, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useTheme } from '@/context/ThemeContext';
import { useKYC } from '@/context/KYCContext';
import { Colors } from '@/constants/Colors';

export default function KYCChooseTypeScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { isVerified } = useKYC();

    // Redirect if already verified
    useEffect(() => {
        if (isVerified) {
            router.replace('/kyc-status');
        }
    }, [isVerified, router]);

    const handleSelectNIN = () => {
        router.push({
            pathname: '/kyc-verification',
            params: { type: 'nin' },
        });
    };

    const handleSelectBVN = () => {
        router.push({
            pathname: '/kyc-verification',
            params: { type: 'bvn' },
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ThemedText style={styles.backButton}>← Back</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={styles.title}>Choose Verification Type</ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Select which document you'd like to use for verification
                    </ThemedText>
                </View>

                {/* NIN Option */}
                <TouchableOpacity onPress={handleSelectNIN} activeOpacity={0.7}>
                    <GlassView
                        style={[
                            styles.optionCard,
                            { borderWidth: 2, borderColor: colors.primary },
                        ]}
                    >
                        <View style={styles.optionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
                                <FileText size={28} color={colors.primary} />
                            </View>
                            <View style={styles.optionTitleContainer}>
                                <ThemedText style={styles.optionTitle}>National ID (NIN)</ThemedText>
                                <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                                    National Identification Number
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.primary} />
                        </View>

                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

                        <View style={styles.optionDetails}>
                            <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>Format:</ThemedText>
                            <ThemedText style={styles.detailValue}>11 digits</ThemedText>
                        </View>
                    </GlassView>
                </TouchableOpacity>

                {/* BVN Option */}
                <TouchableOpacity onPress={handleSelectBVN} activeOpacity={0.7}>
                    <GlassView style={styles.optionCard}>
                        <View style={styles.optionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
                                <CreditCard size={28} color={colors.primary} />
                            </View>
                            <View style={styles.optionTitleContainer}>
                                <ThemedText style={styles.optionTitle}>Bank Verification (BVN)</ThemedText>
                                <ThemedText style={[styles.optionDescription, { color: colors.textSecondary }]}>
                                    Bank Verification Number
                                </ThemedText>
                            </View>
                            <ChevronRight size={24} color={colors.textSecondary} />
                        </View>

                        <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />

                        <View style={styles.optionDetails}>
                            <ThemedText style={[styles.detailLabel, { color: colors.textSecondary }]}>Format:</ThemedText>
                            <ThemedText style={styles.detailValue}>11 digits</ThemedText>
                        </View>
                    </GlassView>
                </TouchableOpacity>

                {/* Info Card */}
                <GlassView style={styles.infoCard}>
                    <ThemedText style={[styles.infoTitle, { color: colors.textSecondary }]}>What's the difference?</ThemedText>
                    <View style={styles.infoDifference}>
                        <ThemedText style={styles.infoSubtitle}>NIN</ThemedText>
                        <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                            Issued by NIMC (National Identity Management Commission)
                        </ThemedText>
                    </View>
                    <View style={styles.infoDifference}>
                        <ThemedText style={styles.infoSubtitle}>BVN</ThemedText>
                        <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                            Issued by your bank and linked to your account
                        </ThemedText>
                    </View>
                </GlassView>

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
        lineHeight: 20,
    },
    optionCard: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    optionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionTitleContainer: {
        flex: 1,
        gap: 4,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    optionDescription: {
        fontSize: 12,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    optionDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
    },
    detailValue: {
        fontSize: 12,
        fontWeight: '600',
    },
    infoCard: {
        borderRadius: 20,
        padding: 16,
        marginTop: 8,
    },
    infoTitle: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    infoDifference: {
        marginBottom: 12,
        gap: 4,
    },
    infoSubtitle: {
        fontSize: 12,
        fontWeight: '600',
    },
    infoText: {
        fontSize: 12,
        lineHeight: 16,
    },
});
