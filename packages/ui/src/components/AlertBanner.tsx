import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface AlertBannerProps {
  title: string;
  description: string;
  type?: 'success' | 'danger' | 'warning' | 'info';
  onClose?: () => void;
  style?: ViewStyle;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  description,
  type = 'info',
  onClose,
  style,
}) => {
  const theme = useTheme();

  // Color matching corresponding to standard status theme tokens
  let accentColor = theme.colors.info;
  let backgroundColor = theme.colors.infoBackground;

  switch (type) {
    case 'success':
      accentColor = theme.colors.success;
      backgroundColor = theme.colors.successBackground;
      break;
    case 'danger':
      accentColor = theme.colors.danger;
      backgroundColor = theme.colors.dangerBackground;
      break;
    case 'warning':
      accentColor = theme.colors.warning;
      backgroundColor = theme.colors.warningBackground;
      break;
    case 'info':
      accentColor = theme.colors.info;
      backgroundColor = theme.colors.infoBackground;
      break;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderLeftColor: accentColor,
        },
        style,
      ]}
    >
      <View style={styles.textColumn}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          {description}
        </Text>
      </View>

      {/* Dismiss trigger */}
      {onClose && (
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={[styles.closeIcon, { color: theme.colors.textSecondary }]}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  textColumn: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  closeButton: {
    padding: 4,
    marginLeft: 4,
    alignSelf: 'center',
  },
  closeIcon: {
    fontSize: 12,
    fontWeight: '700',
  },
});
