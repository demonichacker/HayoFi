import { View, StyleSheet, SectionList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Coffee, ShoppingBag, DollarSign } from 'lucide-react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';

const TRANSACTIONS = [
    {
        title: 'Today',
        data: [
            { id: '1', title: 'Starbucks', category: 'Coffee', amount: '-₦5.40', type: 'expense', icon: Coffee },
            { id: '2', title: 'Uber Ride', category: 'Transport', amount: '-₦14.20', type: 'expense', icon: ArrowUpRight },
        ],
    },
    {
        title: 'Yesterday',
        data: [
            { id: '3', title: 'Upwork', category: 'Freelance', amount: '+₦450.00', type: 'income', icon: DollarSign },
            { id: '4', title: 'Apple Store', category: 'Gadgets', amount: '-₦1,299.00', type: 'expense', icon: ShoppingBag },
        ],
    },
    {
        title: 'August 24',
        data: [
            { id: '5', title: 'Netflix', category: 'Subscription', amount: '-₦15.99', type: 'expense', icon: ArrowUpRight },
        ],
    },
];

export default function ActivityScreen() {
    const { colors, isDark } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <ThemedText type="title">Activity</ThemedText>
                <TouchableOpacity style={[styles.filterBtn, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)' }]}>
                    <Filter size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, { backgroundColor: colors.surface, color: colors.text, placeholderTextColor: colors.textSecondary }]}
                    placeholder="Search transactions..."
                    placeholderTextColor={colors.textSecondary}
                />
            </View>

            {/* Transactions List */}
            <SectionList
                sections={TRANSACTIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({ section: { title } }) => (
                    <ThemedText style={[styles.sectionHeader, { color: colors.textSecondary }]}>{title}</ThemedText>
                )}
                renderItem={({ item }) => (
                    <View style={[styles.transactionItem, { backgroundColor: colors.surface }]}>
                        <View style={styles.itemLeft}>
                            <View style={[styles.iconBox, { backgroundColor: isDark ? '#1E1E1E' : '#eee' }, item.type === 'income' && { backgroundColor: isDark ? colors.primary : colors.primary }]}>
                                <item.icon size={20} color={item.type === 'income' ? '#000' : colors.text} />
                            </View>
                            <View>
                                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                                <ThemedText style={[styles.category, { color: colors.textSecondary }]}>{item.category}</ThemedText>
                            </View>
                        </View>
                        <ThemedText
                            style={[
                                styles.amount,
                                { color: colors.text },
                                item.type === 'income' && { color: colors.success }
                            ]}
                        >
                            {item.amount}
                        </ThemedText>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 24,
        marginBottom: 16,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        marginHorizontal: 24,
        marginBottom: 24,
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 1,
    },
    searchInput: {
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 48,
        fontSize: 16,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    sectionHeader: {
        fontSize: 14,
        marginBottom: 12,
        marginTop: 12,
        textTransform: 'uppercase',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
});
