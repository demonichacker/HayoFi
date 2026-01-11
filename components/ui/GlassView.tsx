import { BlurView, BlurViewProps } from 'expo-blur';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { PropsWithChildren } from 'react';

interface GlassViewProps extends BlurViewProps, PropsWithChildren {
    style?: ViewStyle;
}

export function GlassView({ style, intensity = 20, tint, ...props }: GlassViewProps) {
    const { theme, isDark } = useTheme();
    const resolvedTint = tint || (isDark ? 'dark' : 'light');

    return (
        <BlurView
            intensity={intensity}
            tint={resolvedTint}
            style={[
                styles.glass,
                {
                    backgroundColor: isDark ? 'rgba(20, 20, 20, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                },
                style
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    glass: {
        overflow: 'hidden',
        borderWidth: 1,
    },
});
