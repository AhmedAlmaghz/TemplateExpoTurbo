import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@tempexpo/ui';

interface AppHeaderProps {
  title: string;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
  onAvatarPress?: () => void;
  notificationCount?: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onSearchPress,
  onNotificationsPress,
  onAvatarPress,
  notificationCount = 0,
}) => {
  const theme = useTheme();
  
  return (
    <View style={[styles.header, { backgroundColor: 'white', borderBottomColor: '#E5E7EB' }]}>
      <TouchableOpacity onPress={onAvatarPress} style={styles.avatarButton}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
      
      <View style={styles.rightActions}>
        {onSearchPress && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        )}
        
        {onNotificationsPress && (
          <TouchableOpacity onPress={onNotificationsPress} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
            {notificationCount > 0 && (
              <View style={[styles.badge, { backgroundColor: 'red' }]}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  avatarButton: {
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    marginLeft: 8,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
