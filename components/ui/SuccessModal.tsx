import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { CheckCircle, X } from 'lucide-react-native';
import { ThemedText } from './ThemedText';
import { Button } from './Button';
import { useTheme } from '@/context/ThemeContext';

type SuccessModalProps = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
};

export function SuccessModal({ visible, onClose, title = "Success!", message }: SuccessModalProps) {
    const { colors } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modal, { backgroundColor: colors.surface }]}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <X size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={[styles.iconContainer, { backgroundColor: `${colors.success}20` }]}>
                        <CheckCircle size={64} color={colors.success} />
                    </View>

                    <ThemedText type="title" style={styles.title}>{title}</ThemedText>

                    {message && (
                        <ThemedText style={[styles.message, { color: colors.textSecondary }]}>
                            {message}
                        </ThemedText>
                    )}

                    <Button title="Done" onPress={onClose} />
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
        padding: 32,
        alignItems: 'center',
        gap: 20,
    },
    closeBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 8,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});
