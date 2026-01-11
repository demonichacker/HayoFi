import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './ui/ThemedText';
import { GlassView } from './ui/GlassView';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = CARD_WIDTH * 0.63;

interface CreditCardProps {
    holderName: string;
    cardNumber: string; // Last 4 digits mock
    expiry: string;
    type: 'visa' | 'mastercard';
    variant?: 'primary' | 'black';
}

export function CreditCard({ holderName, cardNumber, expiry, type, variant = 'primary' }: CreditCardProps) {
    const { colors, isDark } = useTheme();

    const gradientColors = variant === 'primary'
        ? [colors.primary, isDark ? '#88AA00' : '#65A30D']
        : ['#1A1A1A', '#000000'];

    const textColor = variant === 'primary' ? '#000' : '#FFF';
    const labelColor = variant === 'primary' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)';

    return (
        <View style={[styles.container, { shadowColor: colors.primary }]}>
            <LinearGradient
                colors={gradientColors as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <GlassView intensity={0} style={styles.overlay} />

                {/* Shiny Noise Overlay (Simulated) */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'transparent', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <ThemedText style={{ color: textColor, fontWeight: '700', fontSize: 18 }}>HayoFi</ThemedText>
                        <ThemedText style={{ color: labelColor, fontSize: 13 }}>Virtual</ThemedText>
                    </View>

                    <View style={styles.chipContainer}>
                        <View style={styles.chip} />
                        {/* Contactless Icon could go here */}
                    </View>

                    <View style={styles.numberContainer}>
                        <ThemedText style={{ color: textColor, fontSize: 22, letterSpacing: 2 }}>
                            •••• •••• •••• {cardNumber}
                        </ThemedText>
                    </View>

                    <View style={styles.footer}>
                        <View>
                            <ThemedText style={{ color: labelColor, fontSize: 10, textTransform: 'uppercase' }}>Card Holder</ThemedText>
                            <ThemedText style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{holderName}</ThemedText>
                        </View>
                        <View>
                            <ThemedText style={{ color: labelColor, fontSize: 10, textTransform: 'uppercase' }}>Expires</ThemedText>
                            <ThemedText style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{expiry}</ThemedText>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chipContainer: {
        marginTop: 20,
    },
    chip: {
        width: 40,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    numberContainer: {
        justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});
