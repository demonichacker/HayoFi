import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Check } from 'lucide-react-native';
import { useState, useMemo } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useInternationalSend, getCountries, Country } from '@/context/InternationalSendContext';

export default function CountrySelectionScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { selectedCountry, setSelectedCountry } = useInternationalSend();
    const [searchQuery, setSearchQuery] = useState('');

    const countries = getCountries();

    const filteredCountries = useMemo(() => {
        if (!searchQuery) return countries;
        return countries.filter(
            (country) =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                country.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
    };

    const handleContinue = () => {
        if (selectedCountry) {
            router.push('/international-send/amount-preview');
        }
    };

    const renderCountryItem = ({ item }: { item: Country }) => (
        <TouchableOpacity
            style={[
                styles.countryItem,
                {
                    backgroundColor: colors.surface,
                    borderColor:
                        selectedCountry?.code === item.code ? colors.primary : colors.textSecondary + '20',
                    borderWidth: selectedCountry?.code === item.code ? 2 : 1,
                },
            ]}
            onPress={() => handleCountrySelect(item)}
        >
            <View style={styles.countryContent}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText style={[styles.currencyLabel, { color: colors.textSecondary }]}>
                    {item.currency} ({item.currencyCode})
                </ThemedText>
            </View>
            {selectedCountry?.code === item.code && (
                <View style={[styles.checkIcon, { backgroundColor: colors.primary }]}>
                    <Check size={20} color="white" />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Select Country</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchContainer}>
                <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
                    <Search size={20} color={colors.textSecondary} />
                    <TextInput
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholder="Search country or currency code"
                        placeholderTextColor={colors.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.code}
                contentContainerStyle={styles.listContent}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            />

            <View style={[styles.footer, { borderTopColor: colors.textSecondary + '20' }]}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!selectedCountry}
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
    searchContainer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        gap: 12,
    },
    countryItem: {
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countryContent: {
        flex: 1,
    },
    currencyLabel: {
        fontSize: 13,
        marginTop: 4,
    },
    checkIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
});
