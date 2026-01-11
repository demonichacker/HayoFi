import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { forwardRef } from 'react';

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
    ({ title, onPress, variant = 'primary', loading, style, textStyle }, ref) => {
        const { colors } = useTheme();

        const backgroundColor =
            variant === 'primary'
                ? colors.primary
                : variant === 'secondary'
                    ? colors.surfaceHighlight
                    : 'transparent';

        const textColor =
            variant === 'primary'
                ? '#000000'
                : variant === 'outline'
                    ? colors.primary
                    : colors.text;

        const borderColor = variant === 'outline' ? colors.primary : 'transparent';

        return (
            <TouchableOpacity
                ref={ref}
                style={[
                    styles.button,
                    { backgroundColor, borderColor, borderWidth: variant === 'outline' ? 1 : 0 },
                    style,
                ]}
                onPress={onPress}
                disabled={loading}
                activeOpacity={0.8}>
                {loading ? (
                    <ActivityIndicator color={textColor} />
                ) : (
                    <ThemedText type="defaultSemiBold" style={{ color: textColor, ...textStyle }}>
                        {title}
                    </ThemedText>
                )}
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
