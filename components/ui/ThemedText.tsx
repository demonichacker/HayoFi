import { Text, type TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'copy';
    textColor?: string;
};

export function ThemedText({
    style,
    type = 'default',
    textColor,
    ...rest
}: ThemedTextProps) {
    const { colors } = useTheme();
    const color = textColor || colors.text;

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? [styles.link, { color: colors.primary }] : undefined,
                type === 'copy' ? [styles.copy, { color: colors.textSecondary }] : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        // color handled in component
    },
    copy: {
        fontSize: 14,
        // color handled in component
    },
});
