import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ViewStyle,
  Pressable,
} from 'react-native';
import { useTheme } from '../theme';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'danger' | 'warning' | 'info';
  onDismiss: () => void;
  duration?: number; // duration in ms, set to 0 to disable auto-dismiss
  position?: 'top' | 'bottom';
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
  onDismiss,
  duration = 3000,
  position = 'top',
  style,
}) => {
  const theme = useTheme();

  // Animation values: TranslateY and Opacity
  const slideAnimRef = useRef<Animated.Value | null>(null);
  if (slideAnimRef.current === null) {
    slideAnimRef.current = new Animated.Value(position === 'top' ? -100 : 100);
  }
  const slideAnim = slideAnimRef.current;

  const opacityAnimRef = useRef<Animated.Value | null>(null);
  if (opacityAnimRef.current === null) {
    opacityAnimRef.current = new Animated.Value(0);
  }
  const opacityAnim = opacityAnimRef.current;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (visible) {
      // 1. Trigger Show Animation
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: position === 'top' ? 60 : -60, // padding offset from edges
          useNativeDriver: true,
          bounciness: 8,
          speed: 11,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // 2. Set Auto-dismiss Timer
      if (duration > 0) {
        timer = setTimeout(() => {
          handleDismiss();
        }, duration);
      }
    } else {
      // 3. Trigger Hide Animation when visible is turned off externally
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: position === 'top' ? -100 : 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, position, duration, slideAnim, opacityAnim]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -100 : 100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  // Skip rendering if not visible and opacity has fully reset
  if (!visible && (opacityAnim as any)._value === 0) {
    return null;
  }

  // Pick color and theme settings depending on type
  let accentColor = theme.colors.success;
  let backgroundColor = theme.colors.successBackground;
  
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

  const placementStyle = position === 'top' ? styles.topToast : styles.bottomToast;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.overlay,
        placementStyle,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Pressable
        onPress={handleDismiss}
        style={[
          styles.container,
          {
            backgroundColor,
            borderLeftColor: accentColor,
            shadowColor: accentColor,
          },
          style,
        ]}
      >
        <View style={styles.contentRow}>
          {/* Status Indicator Icon Dot */}
          <View style={[styles.indicatorDot, { backgroundColor: accentColor }]} />
          
          <Text style={[styles.messageText, { color: theme.colors.textPrimary }]} numberOfLines={2}>
            {message}
          </Text>

          {/* Close Character indicator */}
          <Text style={[styles.closeText, { color: theme.colors.textSecondary }]}>✕</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  topToast: {
    top: 0,
  },
  bottomToast: {
    bottom: 0,
  },
  container: {
    width: width - 32,
    borderRadius: 12,
    borderLeftWidth: 5,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  closeText: {
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 8,
  },
});
