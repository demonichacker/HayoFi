import { View, StyleSheet, Modal, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { X } from 'lucide-react-native';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { useTheme } from '@/context/ThemeContext';
import { useState, useRef, useEffect } from 'react';

type PinModalProps = {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
};

export function PinModal({ visible, onClose, onSuccess, title = "Enter PIN" }: PinModalProps) {
    const { colors, isDark } = useTheme();
    const [pin, setPin] = useState(['', '', '', '']);

    // Create individual refs to avoid hooks violations
    const inputRef0 = useRef<TextInput>(null);
    const inputRef1 = useRef<TextInput>(null);
    const inputRef2 = useRef<TextInput>(null);
    const inputRef3 = useRef<TextInput>(null);
    const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3];

    useEffect(() => {
        if (visible) {
            setPin(['', '', '', '']);
            setTimeout(() => inputRefs[0].current?.focus(), 100);
        }
    }, [visible]);

    const handlePinChange = (value: string, index: number) => {
        if (value.length > 1) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }

        // Auto-submit when all 4 digits are entered
        if (index === 3 && value) {
            const fullPin = [...newPin].join('');
            if (fullPin.length === 4) {
                Keyboard.dismiss();
                // Mock PIN verification (in real app, verify against stored PIN)
                setTimeout(() => {
                    onSuccess();
                    setPin(['', '', '', '']);
                }, 300);
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modal, { backgroundColor: colors.surface }]}>
                    <View style={styles.header}>
                        <ThemedText type="subtitle">{title}</ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Enter your 4-digit PIN to confirm
                    </ThemedText>

                    <View style={styles.pinContainer}>
                        {pin.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                style={[
                                    styles.pinInput,
                                    {
                                        backgroundColor: isDark ? '#1E1E1E' : '#F4F4F5',
                                        borderColor: digit ? colors.primary : (isDark ? '#333' : '#E4E4E7'),
                                        color: colors.text
                                    }
                                ]}
                                value={digit}
                                onChangeText={(value) => handlePinChange(value, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                secureTextEntry
                                selectTextOnFocus
                            />
                        ))}
                    </View>

                    <ThemedText style={[styles.hint, { color: colors.textSecondary }]}>
                        Demo: Use any 4 digits
                    </ThemedText>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modal: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 24,
        padding: 24,
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 20,
    },
    pinInput: {
        width: 56,
        height: 64,
        borderRadius: 12,
        borderWidth: 2,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    hint: {
        fontSize: 12,
        textAlign: 'center',
    },
});
