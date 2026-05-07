import React, { useRef } from 'react';
import {
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  size?: number; // Overall diameter of the button
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: string; // Overrides background color
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  disabled = false,
  size = 44,
  variant = 'filled',
  color,
  style,
}) => {
  const theme = useTheme();

  // Animated value for tactile scale physics
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.92, // scale down slightly
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // spring bounce back
      useNativeDriver: true,
      bounciness: 12,
    }).start();
  };

  // Determine styling based on variants
  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'filled') {
    backgroundColor = color || theme.colors.grayLight;
  } else if (variant === 'outlined') {
    borderWidth = 1;
    borderColor = color || theme.colors.border;
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: '100%',
            height: '100%',
            borderRadius: size / 2,
            backgroundColor,
            borderColor,
            borderWidth,
            transform: [{ scale: scaleValue }],
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {icon}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
