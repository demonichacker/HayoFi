import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Wallet } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withSequence,
    withDelay,
    Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';

export default function LandingScreen() {
    const router = useRouter();

    // Shared Values for Animation
    const rotate = useSharedValue(0);
    const contentOpacity = useSharedValue(0);
    const contentScale = useSharedValue(0.3);
    const contentTranslateY = useSharedValue(-50);

    useEffect(() => {
        // 1. Roll the Logo (0 -> 360 degrees) - Slower
        rotate.value = withSequence(
            withTiming(360, {
                duration: 2000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            })
        );

        // 2. Reveal Content "coming out" of the logo - Slower
        const delay = 1200;

        contentOpacity.value = withDelay(delay, withTiming(1, { duration: 1500 }));
        contentScale.value = withDelay(delay, withSpring(1, { damping: 20, stiffness: 90 }));
        contentTranslateY.value = withDelay(delay, withSpring(0, { damping: 20, stiffness: 90 }));

    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }]
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [
            { scale: contentScale.value },
            { translateY: contentTranslateY.value }
        ]
    }));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.contentContainer}>
                {/* Logo Section */}
                <Animated.View style={[styles.iconContainer, logoStyle]}>
                    <Wallet size={64} color={Colors.dark.primary} />
                </Animated.View>

                {/* Content Section (Text + Buttons) */}
                <Animated.View style={[styles.mainContent, contentStyle]}>
                    <View style={styles.textSection}>
                        <ThemedText type="title" style={styles.title}>HayoFi</ThemedText>
                        <ThemedText style={styles.subtitle}>The Future of Virtual Banking</ThemedText>
                    </View>

                    <View style={styles.footer}>
                        <Button
                            title="Get Started"
                            onPress={() => router.push('/auth/sign-up')}
                            style={styles.button}
                        />
                        <Button
                            title="Log In"
                            variant="outline"
                            onPress={() => router.push('/auth/sign-in')}
                            style={styles.button}
                        />
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(204, 255, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(204, 255, 0, 0.2)',
        zIndex: 10,
    },
    mainContent: {
        width: '100%',
        alignItems: 'center',
    },
    textSection: {
        alignItems: 'center',
        marginBottom: 80, // Space between text and buttons
    },
    title: {
        fontSize: 42,
        lineHeight: 48,
        marginBottom: 8,
        color: '#ffffff',
    },
    subtitle: {
        color: Colors.dark.textSecondary,
        fontSize: 18,
    },
    footer: {
        width: '100%',
        gap: 16,
    },
    button: {
        width: '100%',
    },
});
