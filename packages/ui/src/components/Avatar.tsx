import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface AvatarProps {
  source?: ImageSourcePropType;
  initials?: string;
  size?: 's' | 'm' | 'l' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials = '?',
  size = 'm',
  status,
  style,
}) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  // Map sizes to pixel values
  const sizeMap = {
    s: { box: 32, font: 12, border: 1, badge: 8, badgeOffset: -1 },
    m: { box: 48, font: 18, border: 2, badge: 12, badgeOffset: 0 },
    l: { box: 64, font: 24, border: 2, badge: 16, badgeOffset: 2 },
    xl: { box: 96, font: 36, border: 3, badge: 22, badgeOffset: 4 },
  };

  const currentSize = sizeMap[size];

  // Helper to generate a stable, beautiful background color based on the initials
  const getInitialsBgColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      theme.colors.primary,
      theme.colors.success,
      theme.colors.info,
      '#EC4899', // Pink
      '#8B5CF6', // Violet
      '#F59E0B', // Amber
      '#06B6D4', // Cyan
      '#F43F5E', // Rose
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const initialsBgColor = getInitialsBgColor(initials);

  // Status indicator colors
  const statusColors = {
    online: theme.colors.success,
    offline: theme.colors.textSecondary,
    busy: theme.colors.danger,
    away: theme.colors.warning,
  };

  const showImage = source && !imageError;

  return (
    <View style={[styles.container, { width: currentSize.box, height: currentSize.box }, style]}>
      {showImage ? (
        <Image
          source={source}
          style={[styles.image, { borderRadius: currentSize.box / 2 }]}
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.fallbackContainer,
            {
              borderRadius: currentSize.box / 2,
              backgroundColor: initialsBgColor,
            },
          ]}
        >
          <Text style={[styles.initialsText, { fontSize: currentSize.font }]}>
            {initials.toUpperCase().slice(0, 2)}
          </Text>
        </View>
      )}

      {/* Optional Status Badge */}
      {status && (
        <View
          style={[
            styles.statusBadge,
            {
              width: currentSize.badge,
              height: currentSize.badge,
              borderRadius: currentSize.badge / 2,
              backgroundColor: statusColors[status],
              borderColor: '#FFFFFF',
              borderWidth: currentSize.border,
              bottom: currentSize.badgeOffset,
              right: currentSize.badgeOffset,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statusBadge: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});
