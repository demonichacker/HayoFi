import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, ChevronRight, Shield, Bell, HelpCircle, LogOut, Mail, Phone, BadgeCheck, Lock } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useKYC } from '@/context/KYCContext';
import { Moon, Sun } from 'lucide-react-native';

export default function SettingsScreen() {
    const router = useRouter();
    const { user, signOut } = useAuth();
    const { toggleTheme, isDark, colors } = useTheme();
    const { isVerified, tier, resetKYC } = useKYC();

    const handleLogOut = () => {
        resetKYC();
        signOut(); // Clear user state
        router.replace('/auth/sign-in');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatar, { borderColor: isDark ? '#333' : '#ddd', backgroundColor: isDark ? '#1E1E1E' : '#eee' }]}>
                            <User size={40} color={colors.primary} />
                        </View>
                        {isVerified && (
                            <View style={[styles.verifiedBadge, { backgroundColor: colors.background }]}>
                                <BadgeCheck size={20} color={colors.primary} fill={colors.background} />
                            </View>
                        )}
                    </View>
                    <ThemedText type="title" style={styles.name}>{user?.name || 'User'}</ThemedText>
                    <ThemedText style={styles.username}>@{user?.name?.toLowerCase().replace(' ', '_') || 'user'}{isVerified ? ' • Premium' : ''}</ThemedText>
                </View>

                {/* Personal Info Card */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>

                    <View style={[styles.infoRow, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
                        <View style={[styles.infoIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                            <Mail size={18} color={colors.textSecondary} />
                        </View>
                        <View style={styles.infoContent}>
                            <ThemedText style={styles.label}>Email</ThemedText>
                            <ThemedText style={[styles.value, { color: colors.text }]}>{user?.email || 'email@example.com'}</ThemedText>
                        </View>
                    </View>

                    <View style={[styles.infoRow, { paddingBottom: 0, borderBottomWidth: 0 }]}>
                        <View style={[styles.infoIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                            <Phone size={18} color={colors.textSecondary} />
                        </View>
                        <View style={styles.infoContent}>
                            <ThemedText style={styles.label}>Phone</ThemedText>
                            <ThemedText style={[styles.value, { color: colors.text }]}>+1 (555) 000-0000</ThemedText>
                        </View>
                    </View>
                </GlassView>

                {/* KYC Status Card */}
                <GlassView style={styles.card}>
                    <ThemedText style={styles.sectionTitle}>Verification</ThemedText>

                    <TouchableOpacity style={[styles.kycRow, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} onPress={() => router.push('/kyc-status')}>
                        <View style={styles.kycContent}>
                            <View style={[styles.infoIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                                <Lock size={18} color={colors.primary} />
                            </View>
                            <View style={styles.infoContent}>
                                <ThemedText style={styles.label}>KYC Status</ThemedText>
                                <ThemedText style={[styles.value, { color: colors.text }]}>Tier {user?.tier || 1}</ThemedText>
                            </View>
                        </View>
                        <View style={styles.kycRight}>
                            {isVerified && (
                                <View style={[styles.kycBadge, { backgroundColor: '#10B981' }]}>
                                    <ThemedText style={styles.kycBadgeText}>✓ Verified</ThemedText>
                                </View>
                            )}
                            <ChevronRight size={20} color={colors.textSecondary} />
                        </View>
                    </TouchableOpacity>
                </GlassView>

                {/* Settings Options */}
                <View style={styles.optionsSection}>
                    <ThemedText style={styles.sectionLabel}>General</ThemedText>

                    {/* Theme Toggle */}
                    <View style={[styles.optionItem, { backgroundColor: colors.surface }]}>
                        <View style={styles.optionLeft}>
                            {isDark ? <Moon size={20} color={colors.text} /> : <Sun size={20} color={colors.text} />}
                            <ThemedText style={styles.optionTitle}>Dark Mode</ThemedText>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={isDark ? '#000' : '#f4f3f4'}
                        />
                    </View>

                    <OptionItem icon={Shield} title="Security & Privacy" />
                    <OptionItem
                        icon={Bell}
                        title="Notifications"
                        badge="2"
                        onPress={() => router.push('/notifications')}
                    />
                    <OptionItem icon={HelpCircle} title="Help & Support" />

                    <TouchableOpacity
                        style={[styles.optionItem, styles.logoutBtn, { backgroundColor: isDark ? 'rgba(255, 69, 58, 0.05)' : 'rgba(255, 69, 58, 0.1)', borderColor: 'rgba(255, 69, 58, 0.2)' }]}
                        onPress={handleLogOut}
                    >
                        <View style={styles.optionLeft}>
                            <LogOut size={20} color={Colors.dark.error} />
                            <ThemedText style={{ color: Colors.dark.error, fontSize: 16 }}>Log Out</ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

function OptionItem({ icon: Icon, title, badge, onPress }: any) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.optionItem, { backgroundColor: colors.surface }]} onPress={onPress}>
            <View style={styles.optionLeft}>
                <Icon size={20} color={colors.text} />
                <ThemedText style={styles.optionTitle}>{title}</ThemedText>
            </View>
            <View style={styles.optionRight}>
                {badge && (
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                        <ThemedText style={[styles.badgeText, { color: '#000' }]}>{badge}</ThemedText>
                    </View>
                )}
                <ChevronRight size={20} color={colors.textSecondary} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    content: {
        padding: 24,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        borderRadius: 12,
    },
    name: {
        fontSize: 24,
        marginBottom: 4,
    },
    username: {
        color: Colors.dark.textSecondary,
        fontSize: 14,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 32,
        gap: 16,
    },
    sectionTitle: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: Colors.dark.textSecondary,
    },
    value: {
        fontSize: 16,
        color: '#fff',
        marginTop: 2,
    },
    optionsSection: {
        gap: 12,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.dark.surface,
        padding: 16,
        borderRadius: 16,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionTitle: {
        fontSize: 16,
    },
    optionRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        backgroundColor: Colors.dark.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    logoutBtn: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 69, 58, 0.2)',
        backgroundColor: 'rgba(255, 69, 58, 0.05)',
    },
    kycRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    kycContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    kycRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    kycBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    kycBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
});
