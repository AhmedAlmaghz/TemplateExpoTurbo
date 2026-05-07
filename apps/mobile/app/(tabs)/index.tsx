import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppHeader } from '../../src/components/AppHeader';
import {
  Card,
  Button,
  Input,
  useTheme,
  SegmentedControl,
  Accordion,
  Toast,
  IconButton,
  ProgressBar,
  Badge,
  SearchInput,
  Skeleton,
  AlertBanner,
  OtpInput,
} from '@tempexpo/ui';

interface NoteItem {
  id: string;
  title: string;
  content: string;
}

export default function HomeTab() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  // Selected Index for SegmentedControl
  const [selectedView, setSelectedView] = useState(0);

  // States for Notes (Tab 0)
  const [notes, setNotes] = useState<NoteItem[]>([
    { id: '1', title: 'Monorepo scaffold', content: 'Finish TempExpo monorepo scaffold setup.' },
    { id: '2', title: 'Premium UI Kit', content: 'Add premium, responsive interactive widgets.' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // States for simulated loading (Tab 1)
  const [isSyncing, setIsSyncing] = useState(false);

  // States for inline alerts and OTP verification (Tab 2)
  const [showAlert, setShowAlert] = useState(true);
  const [otpSubmittedCode, setOtpSubmittedCode] = useState('');

  // States for Toast component
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger' | 'warning' | 'info'>('success');

  const triggerToast = (msg: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setToastVisible(true);
  };

  const addNote = () => {
    if (!newTitle.trim()) {
      triggerToast('Please provide a note title first!', 'warning');
      return;
    }
    setNotes([
      ...notes,
      {
        id: Date.now().toString(),
        title: newTitle,
        content: newContent,
      },
    ]);
    setNewTitle('');
    setNewContent('');
    triggerToast('Note added successfully!', 'success');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    triggerToast('Note removed from system.', 'danger');
  };

  // Simulate active tasks syncing loading state
  const handleSyncTasks = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      triggerToast('Synced tasks database with api!', 'success');
    }, 2000);
  };

  const isRtl = i18n.language === 'ar';

  // Filter notes based on SearchInput query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTasks = [
    { id: 't1', title: 'Integrate Database Triggers', desc: 'Sync local WatermelonDB instances with backend API triggers seamlessly.', priority: 'High', prColor: 'danger' as any },
    { id: 't2', title: 'Refactor Authentication Hooks', desc: 'Secure local JWT refresh tokens and profile claims using expo-secure-store.', priority: 'Medium', prColor: 'warning' as any },
    { id: 't3', title: 'Optimize Bundle Loading', desc: 'Profile JS bundle sizes and defer loading of heavy native modules.', priority: 'Low', prColor: 'info' as any },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.mainBackground }]}>
      <AppHeader
        title={t('home')}
        onSearchPress={() => triggerToast('Global search indexer activated!', 'info')}
        onNotificationsPress={() => triggerToast('You have 2 pending account changes.', 'warning')}
        notificationCount={2}
      />

      {/* Segmented Tab Switcher */}
      <View style={styles.tabContainer}>
        <SegmentedControl
          values={
            isRtl
              ? ['الملاحظات', 'المهام والتحميل', 'خدمات المقاييس']
              : ['Notes List', 'Tasks & Skeletons', 'SaaS Dashboard']
          }
          selectedIndex={selectedView}
          onChange={setSelectedView}
        />
      </View>

      {/* Floating Animated Toast Banner */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setToastVisible(false)}
        position="top"
        duration={2500}
      />

      {/* Selected Tab content renderer */}
      {selectedView === 0 && (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardTextCol}>
                  <Text style={[styles.noteTitle, { color: theme.colors.textPrimary }]}>{item.title}</Text>
                  <Text style={styles.noteContent}>{item.content}</Text>
                </View>
                {/* Tactile Delete IconButton */}
                <IconButton
                  icon={<Text style={{ fontSize: 16 }}>🗑</Text>}
                  onPress={() => deleteNote(item.id)}
                  variant="ghost"
                  size={38}
                  style={styles.deleteButton}
                />
              </View>
            </Card>
          )}
          ListHeaderComponent={
            <View style={{ marginBottom: 16 }}>
              {/* Premium Search Capsule */}
              <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={isRtl ? 'البحث في الملاحظات المضافة...' : 'Search inside notes...'}
                style={styles.searchBar}
              />

              <Card style={styles.formCard}>
                <Text style={[styles.formHeading, { color: theme.colors.textPrimary }]}>
                  {isRtl ? 'إضافة ملاحظة سريعة' : 'Add New Note'}
                </Text>
                <Input
                  placeholder={isRtl ? 'العنوان...' : 'Note Title'}
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <Input
                  placeholder={isRtl ? 'التفاصيل والوصف...' : 'Note Content'}
                  value={newContent}
                  onChangeText={setNewContent}
                />
                <Button title={isRtl ? 'حفظ الملاحظة' : 'Add Note'} onPress={addNote} />
              </Card>
            </View>
          }
        />
      )}

      {selectedView === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.syncHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginBottom: 0 }]}>
              {isRtl ? 'جدول المهام المجدولة' : 'Scheduled Project Tasks'}
            </Text>
            <Button
              title={isRtl ? 'مزامنة وتحديث' : 'Simulate Sync'}
              onPress={handleSyncTasks}
              disabled={isSyncing}
              style={styles.syncButton}
            />
          </View>

          {isSyncing ? (
            /* Pulsating Wireframe Skeletons for Loading State Showcase */
            <View style={styles.skeletonContainer}>
              {[1, 2, 3].map((item) => (
                <Card key={item} style={StyleSheet.flatten([styles.card, { padding: 16 }])}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Skeleton variant="circle" height={40} width={40} style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Skeleton variant="text" height={16} width="60%" style={{ marginBottom: 6 }} />
                      <Skeleton variant="text" height={12} width="40%" />
                    </View>
                  </View>
                  <Skeleton variant="rect" height={36} width="100%" style={{ marginTop: 14 }} />
                </Card>
              ))}
            </View>
          ) : (
            /* Actual List of Expandable Accordions */
            activeTasks.map((task) => (
              <Accordion
                key={task.id}
                title={task.title}
                subtitle={`${isRtl ? 'مستوى الأولوية' : 'Priority'}: ${task.priority}`}
                style={styles.accordion}
              >
                <View style={styles.accordionInner}>
                  <Text style={styles.accordionDesc}>{task.desc}</Text>
                  <View style={styles.accordionFooter}>
                    <Badge label={task.priority} variant={task.prColor} pill />

                    {/* Tactile Confirm IconButton with spring scale physics */}
                    <IconButton
                      icon={<Text style={{ fontSize: 16, color: '#FFFFFF' }}>✓</Text>}
                      onPress={() => triggerToast(`Task "${task.title}" marked as complete!`, 'success')}
                      variant="filled"
                      color={theme.colors.success}
                      size={36}
                    />
                  </View>
                </View>
              </Accordion>
            ))
          )}
        </ScrollView>
      )}

      {selectedView === 2 && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Dismissible AlertBanner */}
          {showAlert && (
            <AlertBanner
              title={isRtl ? 'تحديث أمان الخادم' : 'Server Security Update'}
              description={
                isRtl
                  ? 'تم تطبيق حزمة الأمان v1.0.8 بنجاح. قواعد البيانات المحلية آمنة الآن ومشفرة بالكامل.'
                  : 'Security patch v1.0.8 has been applied successfully. Local offline storage is now fully encrypted.'
              }
              type="success"
              onClose={() => setShowAlert(false)}
              style={styles.alertBanner}
            />
          )}

          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            {isRtl ? 'مقاييس المزامنة الفورية' : 'Boilerplate Sync Metrics'}
          </Text>

          <Card style={styles.metricCard}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>API Request Quota</Text>
            <Text style={[styles.metricValue, { color: theme.colors.textPrimary }]}>14,832 / 20,000</Text>
            <ProgressBar progress={0.74} color={theme.colors.primary} height={8} style={styles.metricProgress} />
          </Card>

          {/* Secure Passcode Validation Grid */}
          <Card style={styles.otpCard}>
            <Text style={[styles.otpHeading, { color: theme.colors.textPrimary }]}>
              {isRtl ? 'التحقق الثنائي لبيانات السحاب' : 'Two-Factor Cloud Storage Access'}
            </Text>
            <Text style={[styles.otpSubheading, { color: theme.colors.textSecondary }]}>
              {isRtl
                ? 'الرجاء إدخال رمز الأمان المكون من 4 أرقام للوصول إلى تفاصيل التقارير.'
                : 'Enter the 4-digit security code received on your authentication app.'}
            </Text>

            <OtpInput
              codeLength={4}
              onCodeComplete={(code) => {
                setOtpSubmittedCode(code);
                triggerToast(`Authentication code verified: ${code}`, 'success');
              }}
              style={styles.otpGrid}
            />

            {otpSubmittedCode !== '' && (
              <View style={styles.otpResultBox}>
                <Badge label={isRtl ? 'مرخص وآمن' : 'Authorized Token'} variant="success" pill />
                <Text style={styles.otpResultText}>Session Key: TEMP_EXP_{otpSubmittedCode}</Text>
              </View>
            )}
          </Card>

          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginTop: 12 }]}>
            {isRtl ? 'تجارب التنبيه الطائرة' : 'Toast Interactive Demos'}
          </Text>
          <View style={styles.buttonGrid}>
            <Button
              title="Trigger Success Toast"
              onPress={() => triggerToast('Action saved successfully!', 'success')}
              style={styles.demoButton}
            />
            <Button
              title="Trigger Danger Toast"
              onPress={() => triggerToast('Failed to connect to secure store.', 'danger')}
              style={styles.demoButton}
            />
            <Button
              title="Trigger Warning Toast"
              onPress={() => triggerToast('Approaching usage quota threshold!', 'warning')}
              style={styles.demoButton}
            />
            <Button
              title="Trigger Info Toast"
              onPress={() => triggerToast('Synchronizing database files in background...', 'info')}
              style={styles.demoButton}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  listContent: {
    padding: 16,
  },
  scrollContent: {
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTextCol: {
    flex: 1,
    marginRight: 12,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 18,
  },
  deleteButton: {
    alignSelf: 'center',
  },
  formCard: {
    marginBottom: 4,
  },
  formHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  syncHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  syncButton: {
    minHeight: 36,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  skeletonContainer: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
    marginBottom: 12,
  },
  accordion: {
    marginBottom: 12,
  },
  accordionInner: {
    paddingTop: 4,
  },
  accordionDesc: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  accordionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertBanner: {
    marginBottom: 20,
  },
  metricCard: {
    marginBottom: 16,
    padding: 20,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metricProgress: {
    marginTop: 4,
  },
  otpCard: {
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  otpHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  otpSubheading: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  otpGrid: {
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  otpResultBox: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    width: '100%',
    justifyContent: 'space-between',
  },
  otpResultText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#166534',
  },
  buttonGrid: {
    gap: 12,
  },
  demoButton: {
    minHeight: 44,
  },
});
