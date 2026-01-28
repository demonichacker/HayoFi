import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { User, Bell, Plus, ArrowRightLeft, MoreHorizontal, Car, Music, Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ui/ThemedText';
import { GlassView } from '@/components/ui/GlassView';

import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@/context/WalletContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const { ngnBalance, usdBalance } = useWallet();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const contentWidth = screenWidth - 48;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / contentWidth);
    setActiveSlide(slide);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[isDark ? 'rgba(204, 255, 0, 0.05)' : 'rgba(123, 184, 0, 0.1)', 'transparent']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.userInfo} onPress={() => router.push('/(tabs)/settings')}>
              <View style={[styles.avatar, { backgroundColor: isDark ? '#333' : '#eee', borderColor: isDark ? '#444' : '#ddd' }]}>
                <User size={20} color={colors.primary} />
              </View>
              <View>
                <ThemedText style={[styles.greeting, { color: colors.textSecondary }]}>{getGreeting()}</ThemedText>
                <ThemedText type="defaultSemiBold">{user?.name || 'User'}</ThemedText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? '#1E1E1E' : '#f4f4f5' }]} onPress={() => router.push('/notifications')}>
              <Bell size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <View style={styles.balanceHeader}>
              <ThemedText style={[styles.balanceLabel, { color: colors.textSecondary }]}>
                {activeSlide === 0 ? 'Total Balance (NGN)' : 'Total Balance (USD)'}
              </ThemedText>
              <TouchableOpacity onPress={() => setIsBalanceHidden(!isBalanceHidden)} style={styles.eyeBtn}>
                {isBalanceHidden ? <EyeOff size={16} color={colors.textSecondary} /> : <Eye size={16} color={colors.textSecondary} />}
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              style={{ width: contentWidth }}
            >
              {/* NGN Slide */}
              <View style={{ width: contentWidth, alignItems: 'center' }}>
                <ThemedText style={[styles.balanceAmount, { color: colors.text }]}>
                  {isBalanceHidden ? '****' : `₦${ngnBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </ThemedText>
                <View style={[styles.pctBadge, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)', borderColor: isDark ? 'rgba(204, 255, 0, 0.2)' : 'rgba(123, 184, 0, 0.2)' }]}>
                  <ThemedText style={[styles.pctText, { color: colors.primary }]}>+2.5% today</ThemedText>
                </View>
              </View>

              {/* USD Slide */}
              <View style={{ width: contentWidth, alignItems: 'center' }}>
                <ThemedText style={[styles.balanceAmount, { color: colors.text }]}>
                  {isBalanceHidden ? '****' : `$${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </ThemedText>
                <View style={[styles.pctBadge, { backgroundColor: isDark ? 'rgba(204, 255, 0, 0.1)' : 'rgba(123, 184, 0, 0.1)', borderColor: isDark ? 'rgba(204, 255, 0, 0.2)' : 'rgba(123, 184, 0, 0.2)' }]}>
                  <ThemedText style={[styles.pctText, { color: colors.primary }]}>+0.0% today</ThemedText>
                </View>
              </View>
            </ScrollView>

            <View style={styles.pagination}>
              <View style={[styles.dot, { backgroundColor: activeSlide === 0 ? colors.primary : colors.textSecondary }]} />
              <View style={[styles.dot, { backgroundColor: activeSlide === 1 ? colors.primary : colors.textSecondary }]} />
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <ActionButton icon={Plus} label="Top Up" onPress={() => router.push('/top-up')} />
            <ActionButton icon={ArrowRightLeft} label="Send" onPress={() => router.push('/international-send/send-type')} />
            <ActionButton icon={MoreHorizontal} label="More" onPress={() => router.push('/more')} />
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Recent Activity</ThemedText>
              <TouchableOpacity onPress={() => router.push('/(tabs)/activity')}>
                <ThemedText style={[styles.seeAll, { color: colors.primary }]}>See All</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.transactions}>
              <TransactionItem
                icon={Car}
                title="Uber Ride"
                subtitle="Today, 8:45 PM"
                amount="-₦14.20"
              />
              <TransactionItem
                icon={Music}
                title="Spotify Premium"
                subtitle="Yesterday"
                amount="-₦9.99"
              />
              <TransactionItem
                icon={ArrowRightLeft}
                title="Salary Received"
                subtitle="Aug 25"
                amount="+₦2,500.00"
                isPositive
              />
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ActionButton({ icon: Icon, label, onPress }: { icon: any, label: string, onPress: () => void }) {
  const { colors, isDark } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionBtnWrapper}>
      <GlassView style={[styles.actionBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
        <Icon size={24} color={colors.primary} />
      </GlassView>
      <ThemedText style={[styles.actionLabel, { color: colors.textSecondary }]}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

function TransactionItem({ icon: Icon, title, subtitle, amount, isPositive }: any) {
  const { colors, isDark } = useTheme();
  return (
    <View style={[styles.transactionItem, { backgroundColor: colors.surface, borderColor: isDark ? '#1F1F1F' : '#E4E4E7' }]}>
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIcon, { backgroundColor: isDark ? '#1E1E1E' : '#f4f4f5' }]}>
          <Icon size={20} color={colors.text} />
        </View>
        <View>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          <ThemedText style={[styles.transactionDate, { color: colors.textSecondary }]}>{subtitle}</ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.amount, isPositive ? { color: colors.success } : { color: colors.text }]}>
        {amount}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120, // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  greeting: {
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  eyeBtn: {
    padding: 4,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 60,
    paddingVertical: 4,
  },
  pctBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pctText: {
    fontWeight: '600',
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  actionBtnWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {

  },
  transactions: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
