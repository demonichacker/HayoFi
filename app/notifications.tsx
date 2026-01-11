import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, CreditCard, ArrowRightLeft, Info, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function NotificationsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const notifications = [
        {
            id: '1',
            icon: CreditCard,
            title: 'Card Frozen',
            message: 'Your virtual Visa card ending in 4242 has been temporarily frozen.',
            time: '2 min ago',
            read: false,
        },
        {
            id: '2',
            icon: ArrowRightLeft,
            title: 'Money Received',
            message: 'You received ₦2,500.00 from Tech Corp Inc.',
            time: '1 hour ago',
            read: true,
        },
        {
            id: '3',
            icon: Info,
            title: 'Security Alert',
            message: 'New login detected from iPhone 16 Pro.',
            time: '5 hours ago',
            read: true,
        },
        {
            id: '4',
            icon: CheckCircle2,
            title: 'Account Verified',
            message: 'Your identity verification has been successfully completed.',
            time: '1 day ago',
            read: true,
        },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title" style={styles.headerTitle}>Notifications</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {notifications.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.item,
                            { backgroundColor: colors.surface },
                            !item.read && {
                                backgroundColor: isDark ? 'rgba(204, 255, 0, 0.05)' : 'rgba(123, 184, 0, 0.05)',
                                borderWidth: 1,
                                borderColor: isDark ? 'rgba(204, 255, 0, 0.2)' : 'rgba(123, 184, 0, 0.2)'
                            }
                        ]}
                    >
                        <View style={[styles.iconBox, { backgroundColor: isDark ? '#1E1E1E' : '#eee' }]}>
                            <item.icon size={20} color={colors.primary} />
                        </View>
                        <View style={styles.itemContent}>
                            <View style={styles.itemHeader}>
                                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                                <ThemedText style={[styles.time, { color: colors.textSecondary }]}>{item.time}</ThemedText>
                            </View>
                            <ThemedText style={[styles.message, { color: colors.textSecondary }]}>{item.message}</ThemedText>
                        </View>
                        {!item.read && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
                    </TouchableOpacity>
                ))}

                {notifications.length === 0 && (
                    <View style={styles.emptyState}>
                        <Bell size={48} color={colors.textSecondary} />
                        <ThemedText style={[styles.emptyText, { color: colors.textSecondary }]}>No new notifications</ThemedText>
                    </View>
                )}
            </ScrollView>
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
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
    },
    content: {
        padding: 24,
        gap: 16,
    },
    item: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        gap: 16,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        gap: 4,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 12,
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        gap: 16,
    },
    emptyText: {
    },
});
