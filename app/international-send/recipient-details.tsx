import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { useInternationalSend } from '@/context/InternationalSendContext';

type FieldKey =
    | 'fullName'
    | 'email'
    | 'phoneNumber'
    | 'bankName'
    | 'accountNumber'
    | 'accountType'
    | 'swiftCode'
    | 'bankCode'
    | 'routingNumber';

interface FieldConfig {
    key: FieldKey;
    label: string;
    placeholder: string;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric' | 'decimal-pad';
}

// Country-specific field configurations
const COUNTRY_FIELDS: { [key: string]: FieldConfig[] } = {
    US: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+1 (555) 123-4567',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Bank of America' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'routingNumber', label: 'Routing Number', placeholder: '021000021' },
    ],
    GB: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Smith' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+44 (0)20 1234 5678',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'HSBC' },
        { key: 'accountNumber', label: 'Account Number (IBAN)', placeholder: 'GB82 WEST 1234 5698 7654 32' },
        { key: 'swiftCode', label: 'SWIFT Code', placeholder: 'WESTGB2L' },
    ],
    CA: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+1 (613) 555-0123',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Royal Bank of Canada' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'bankCode', label: 'Bank Code', placeholder: '002' },
    ],
    AU: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+61 2 1234 5678',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Commonwealth Bank' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'bankCode', label: 'BSB Number', placeholder: '012-345' },
    ],
    DE: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Schmidt' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+49 30 12345678',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Deutsche Bank' },
        { key: 'accountNumber', label: 'Account Number (IBAN)', placeholder: 'DE89 3704 0044 0532 0130 00' },
        { key: 'swiftCode', label: 'SWIFT Code', placeholder: 'DEUTDEDD' },
    ],
    FR: [
        { key: 'fullName', label: 'Full Name', placeholder: 'Jean Dupont' },
        { key: 'email', label: 'Email Address', placeholder: 'jean@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+33 1 23 45 67 89',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'BNP Paribas' },
        { key: 'accountNumber', label: 'Account Number (IBAN)', placeholder: 'FR14 2004 1010 0505 0001 3M02 606' },
        { key: 'swiftCode', label: 'SWIFT Code', placeholder: 'BNPAFRPP' },
    ],
    IN: [
        { key: 'fullName', label: 'Full Name', placeholder: 'Rajesh Kumar' },
        { key: 'email', label: 'Email Address', placeholder: 'rajesh@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+91 98765 43210',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'HDFC Bank' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789012345' },
        { key: 'bankCode', label: 'IFSC Code', placeholder: 'HDFC0000001' },
    ],
    KE: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John Kipchoge' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+254 712 345678',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Equity Bank' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'bankCode', label: 'Bank Code', placeholder: '014' },
    ],
    ZA: [
        { key: 'fullName', label: 'Full Name', placeholder: 'John van der Merwe' },
        { key: 'email', label: 'Email Address', placeholder: 'john@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+27 11 123 4567',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'ABSA' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'bankCode', label: 'Bank Code', placeholder: '632005' },
    ],
    GH: [
        { key: 'fullName', label: 'Full Name', placeholder: 'Kwame Asante' },
        { key: 'email', label: 'Email Address', placeholder: 'kwame@example.com', keyboardType: 'email-address' },
        {
            key: 'phoneNumber',
            label: 'Phone Number',
            placeholder: '+233 24 123 4567',
            keyboardType: 'phone-pad',
        },
        { key: 'bankName', label: 'Bank Name', placeholder: 'Zenith Bank Ghana' },
        { key: 'accountNumber', label: 'Account Number', placeholder: '123456789' },
        { key: 'bankCode', label: 'Bank Code', placeholder: '012' },
    ],
};

export default function RecipientDetailsScreen() {
    const router = useRouter();
    const { colors, isDark } = useTheme();
    const { selectedCountry, recipientDetails, setRecipientDetails } = useInternationalSend();
    const [formData, setFormData] = useState(recipientDetails);

    useEffect(() => {
        if (!selectedCountry) {
            router.back();
        }
    }, [selectedCountry, router]);

    if (!selectedCountry) {
        return null;
    }

    const fields = COUNTRY_FIELDS[selectedCountry.code] || COUNTRY_FIELDS['US'];
    const isFormValid = fields.every((field) => {
        const value = formData[field.key] || '';
        return value.trim().length > 0;
    });

    const handleInputChange = (key: FieldKey, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleContinue = () => {
        if (isFormValid) {
            setRecipientDetails(formData);
            router.push('/international-send/confirmation');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="title">Recipient Details</ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Enter details for recipient in {selectedCountry.name}
                    </ThemedText>

                    <View style={styles.fieldsContainer}>
                        {fields.map((field, index) => (
                            <View key={field.key} style={styles.fieldWrapper}>
                                <ThemedText style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                                    {field.label}
                                </ThemedText>
                                <TextInput
                                    style={[
                                        styles.fieldInput,
                                        {
                                            backgroundColor: colors.surface,
                                            color: colors.text,
                                            borderColor: colors.textSecondary + '20',
                                        },
                                    ]}
                                    placeholder={field.placeholder}
                                    placeholderTextColor={colors.textSecondary}
                                    keyboardType={field.keyboardType || 'default'}
                                    value={formData[field.key] || ''}
                                    onChangeText={(value) => handleInputChange(field.key, value)}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.spacer} />
                </ScrollView>
            </TouchableWithoutFeedback>

            <View style={[styles.footer, { borderTopColor: colors.textSecondary + '20' }]}>
                <Button title="Continue" onPress={handleContinue} disabled={!isFormValid} />
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
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        paddingBottom: 100,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 24,
    },
    fieldsContainer: {
        gap: 16,
    },
    fieldWrapper: {
        marginBottom: 8,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    fieldInput: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
    },
    spacer: {
        height: 24,
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderTopWidth: 1,
    },
});
