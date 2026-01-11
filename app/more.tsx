import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRightLeft, Smartphone, Lightbulb, FileText, ChevronRight } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';

export default function MoreScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();

    const menuItems = [
        {
            title: 'Financial Services',
            items: [
                { icon: ArrowRightLeft, label: 'Swap Currency', route: '/swap', desc: 'Convert between currencies' },
                { icon: Smartphone, label: 'Airtime & Data', route: null, desc: 'Top up mobile instantly' },
                { icon: Lightbulb, label: 'Pay Bills', route: null, desc: 'Electricity, Cable TV, Internet' },
            ]
        },
        {
            title: 'Account',
            items: [
                { icon: FileText, label: 'Statements', route: null, desc: 'View monthly breakdown' },
            ]
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">More</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {menuItems.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <ThemedText style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.title}</ThemedText>
                        <View style={[styles.card, { backgroundColor: colors.surface }]}>
                            {section.items.map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.item, i !== section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? '#1F1F1F' : '#F4F4F5' }]}
                                    onPress={() => item.route && router.push(item.route as any)}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                                        <item.icon size={20} color={colors.primary} />
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <ThemedText type="defaultSemiBold">{item.label}</ThemedText>
                                        <ThemedText style={[styles.itemDesc, { color: colors.textSecondary }]}>{item.desc}</ThemedText>
                                    </View>
                                    <ChevronRight size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
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
    backBtn: {
        padding: 4,
    },
    content: {
        padding: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    card: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
        gap: 2,
    },
    itemDesc: {
        fontSize: 12,
    },
});
