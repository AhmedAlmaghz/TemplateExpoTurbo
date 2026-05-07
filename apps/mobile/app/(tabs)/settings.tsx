import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../../src/components/AppHeader';
import { changeLanguage } from '../../src/core/i18n';
import {
  Card,
  Button,
  useTheme,
  Avatar,
  Badge,
  Switch,
  ListItem,
  ProgressBar,
  BottomSheet,
} from '@tempexpo/ui';

export default function SettingsTab() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  // State for newly added interactive components
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [infoSheetVisible, setInfoSheetVisible] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0.75); // 75% complete

  const toggleLanguage = async () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    Alert.alert(
      t('language'),
      nextLang === 'ar' ? 'هل تريد التحويل إلى اللغة العربية؟' : 'Switch to English?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await changeLanguage(nextLang);
          },
        },
      ]
    );
  };

  const isRtl = i18n.language === 'ar';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.mainBackground }]}>
      <AppHeader title={t('settings')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              initials="AE"
              size="xl"
              status="online"
              style={styles.avatar}
            />
            <Text style={[styles.profileName, { color: theme.colors.textPrimary }]}>Abu Emad</Text>
            <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>abuemad@tempexpo.com</Text>
            
            <View style={styles.badgeRow}>
              <Badge label="Premium User" variant="primary" pill />
              <View style={{ width: 8 }} />
              <Badge label="Active" variant="success" pill />
            </View>
          </View>

          {/* Profile Completion Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabelRow}>
              <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                {isRtl ? 'إكمال الحساب' : 'Profile Completion'}
              </Text>
              <Text style={[styles.progressPercentage, { color: theme.colors.primary }]}>
                {Math.round(profileCompletion * 100)}%
              </Text>
            </View>
            <ProgressBar
              progress={profileCompletion}
              color={theme.colors.primary}
              height={8}
            />
          </View>
        </Card>

        {/* General Settings Section */}
        <Text style={[styles.sectionHeading, { color: theme.colors.textSecondary }]}>
          {isRtl ? 'الإعدادات العامة' : 'General Settings'}
        </Text>
        <Card style={styles.menuCard}>
          <ListItem
            title={t('language')}
            subtitle={isRtl ? 'تغيير لغة التطبيق الحالية' : 'Change current application language'}
            onPress={toggleLanguage}
            rightElement={
              <Badge
                label={i18n.language === 'ar' ? 'العربية' : 'English'}
                variant="info"
                outline
              />
            }
            showChevron
          />
          <ListItem
            title={isRtl ? 'الإشعارات الفورية' : 'Push Notifications'}
            subtitle={isRtl ? 'تلقي تنبيهات وتحديثات فورية' : 'Receive instant updates and alerts'}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            }
            divider={true}
          />
          <ListItem
            title={isRtl ? 'الوضع الداكن' : 'Dark Mode'}
            subtitle={isRtl ? 'تحويل واجهة التطبيق إلى مظهر داكن' : 'Turn the application background dark'}
            rightElement={
              <Switch
                value={darkModeEnabled}
                onValueChange={(val) => {
                  setDarkModeEnabled(val);
                  Alert.alert(
                    isRtl ? 'الوضع الداكن' : 'Dark Mode',
                    isRtl ? 'سيتم تفعيل المظهر الداكن بالكامل في التحديث القادم!' : 'Full dark theme styling is coming in the next update!'
                  );
                }}
                activeColor={theme.colors.primary}
              />
            }
            divider={false}
          />
        </Card>

        {/* Support & Information Section */}
        <Text style={[styles.sectionHeading, { color: theme.colors.textSecondary }]}>
          {isRtl ? 'الدعم والمعلومات' : 'Support & Info'}
        </Text>
        <Card style={styles.menuCard}>
          <ListItem
            title={isRtl ? 'معلومات التطبيق' : 'About Application'}
            subtitle={isRtl ? 'عرض معلومات وبيانات التطبيق' : 'View system specifications and detail info'}
            onPress={() => setInfoSheetVisible(true)}
            rightElement={<Badge label="v1.0.0" variant="secondary" />}
            showChevron
          />
          <ListItem
            title={isRtl ? 'تسجيل الخروج' : t('logout')}
            subtitle={isRtl ? 'إنهاء الجلسة الحالية والعودة' : 'Log out from current secure account'}
            onPress={() => Alert.alert(t('logout'), isRtl ? "تم تسجيل الخروج بنجاح" : "Logged out successfully")}
            divider={false}
            titleStyle={{ color: theme.colors.danger }}
          />
        </Card>
      </ScrollView>

      {/* About App Premium Bottom Sheet */}
      <BottomSheet
        visible={infoSheetVisible}
        onClose={() => setInfoSheetVisible(false)}
        title={isRtl ? 'معلومات المنصة' : 'Platform Specifications'}
      >
        <View style={styles.sheetContent}>
          <View style={styles.sheetLogoContainer}>
            <Avatar initials="TE" size="l" />
            <Text style={[styles.sheetLogoText, { color: theme.colors.textPrimary }]}>TempExpo Monorepo</Text>
            <Badge label="SaaS Template" variant="primary" style={styles.sheetLogoBadge} />
          </View>

          <Text style={[styles.sheetDesc, { color: theme.colors.textSecondary }]}>
            {isRtl
              ? 'تيمب إكسبو هو قالب متكامل فائق الأداء لبناء مشاريع الـ SaaS والشركات الناشئة بسرعات عالية باستخدام تقنيات React Native و Expo في بيئة عمل Monorepo منظمة للغاية.'
              : 'TempExpo is a high-performance boilerplate for scaling robust micro-SaaS and mobile platforms in a beautifully organized React Native & Expo monorepo environment.'}
          </Text>

          <View style={[styles.techStackRow, { borderColor: theme.colors.border }]}>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Framework</Text>
              <Text style={[styles.techValue, { color: theme.colors.primary }]}>Expo SDK 54</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>DB Engine</Text>
              <Text style={[styles.techValue, { color: theme.colors.success }]}>Watermelondb</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techLabel}>Design</Text>
              <Text style={[styles.techValue, { color: theme.colors.info }]}>Restyle UI</Text>
            </View>
          </View>

          <Button
            title={isRtl ? 'إغلاق النافذة' : 'Close Details'}
            onPress={() => setInfoSheetVisible(false)}
            style={styles.sheetCloseButton}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    padding: 24,
    marginBottom: 24,
    alignItems: 'stretch',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 8,
    marginBottom: 10,
  },
  menuCard: {
    padding: 0,
    marginBottom: 24,
    overflow: 'hidden',
  },
  sheetContent: {
    alignItems: 'center',
    paddingTop: 16,
  },
  sheetLogoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetLogoText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  sheetLogoBadge: {
    marginTop: 6,
  },
  sheetDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  techStackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  techItem: {
    alignItems: 'center',
    flex: 1,
  },
  techLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '500',
  },
  techValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  sheetCloseButton: {
    width: '100%',
    marginTop: 8,
  },
});
