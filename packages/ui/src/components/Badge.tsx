import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme';

export interface BadgeProps {
  label: string | number;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  size?: 'small' | 'medium';
  pill?: boolean;
  outline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  pill = true,
  outline = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();

  // Determine background and text colors based on the variant
  let backgroundColor = theme.colors.primary;
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';

  switch (variant) {
    case 'primary':
      backgroundColor = outline ? 'transparent' : theme.colors.primary;
      textColor = outline ? theme.colors.primary : '#FFFFFF';
      borderColor = theme.colors.primary;
      break;
    case 'success':
      backgroundColor = outline ? 'transparent' : theme.colors.successBackground;
      textColor = theme.colors.success;
      borderColor = theme.colors.success;
      break;
    case 'warning':
      backgroundColor = outline ? 'transparent' : theme.colors.warningBackground;
      textColor = theme.colors.warning;
      borderColor = theme.colors.warning;
      break;
    case 'danger':
      backgroundColor = outline ? 'transparent' : theme.colors.dangerBackground;
      textColor = theme.colors.danger;
      borderColor = theme.colors.danger;
      break;
    case 'info':
      backgroundColor = outline ? 'transparent' : theme.colors.infoBackground;
      textColor = theme.colors.info;
      borderColor = theme.colors.info;
      break;
    case 'secondary':
      backgroundColor = outline ? 'transparent' : theme.colors.grayLight;
      textColor = theme.colors.textSecondary;
      borderColor = theme.colors.border;
      break;
  }

  const containerStyles = [
    styles.badge,
    size === 'small' ? styles.smallBadge : styles.mediumBadge,
    {
      backgroundColor,
      borderRadius: pill ? 999 : 6,
      borderWidth: outline ? 1 : 0,
      borderColor,
    },
    style,
  ];

  const labelStyles = [
    styles.text,
    size === 'small' ? styles.smallText : styles.mediumText,
    {
      color: textColor,
    },
    textStyle,
  ];

  return (
    <View style={containerStyles}>
      <Text style={labelStyles} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 18,
    height: 18,
  },
  mediumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    minWidth: 24,
    height: 24,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 10,
    lineHeight: 12,
  },
  mediumText: {
    fontSize: 12,
    lineHeight: 14,
  },
});
