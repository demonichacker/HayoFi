import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';
import { InternationalSendProvider } from '@/context/InternationalSendContext';
import { KYCProvider } from '@/context/KYCContext';
import { CardProvider } from '@/context/CardContext';

import { AppThemeProvider, useTheme } from '@/context/ThemeContext';

function RootLayoutContent() {
  const { theme, colors } = useTheme();
  const { user } = useAuth();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <WalletProvider>
        <InternationalSendProvider>
          <KYCProvider>
            <CardProvider>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
                {!user ? (
                  // Show auth screens if user is not logged in
                  <>
                    <Stack.Screen 
                      name="index" 
                      options={{
                        gestureEnabled: false,
                        animationEnabled: false,
                      }} 
                    />
                    <Stack.Screen name="auth/sign-in" />
                    <Stack.Screen name="auth/sign-up" />
                  </>
                ) : (
                  // Show app screens if user is logged in
                  <>
                    <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
                    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="send" />
                    <Stack.Screen name="kyc-status" />
                    <Stack.Screen name="kyc-choose-type" />
                    <Stack.Screen name="kyc-verification" />
                    <Stack.Screen name="card/get-virtual-card" />
                    <Stack.Screen name="card/select-account-type" />
                    <Stack.Screen name="card/select-card-type" />
                    <Stack.Screen name="card/card-info-fee" />
                    <Stack.Screen name="card/card-terms" />
                    <Stack.Screen name="card/fund-card-modal" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="card/card-pin-entry" />
                    <Stack.Screen name="card/card-success" />
                    <Stack.Screen name="international-send/send-type" />
                    <Stack.Screen name="international-send/country-selection" />
                    <Stack.Screen name="international-send/amount-preview" />
                    <Stack.Screen name="international-send/recipient-details" />
                    <Stack.Screen name="international-send/confirmation" />
                  </>
                )}
              </Stack>
              <StatusBar key={theme} style={theme === 'dark' ? 'light' : 'dark'} />
            </CardProvider>
          </KYCProvider>
        </InternationalSendProvider>
      </WalletProvider>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </AppThemeProvider>
  );
}
