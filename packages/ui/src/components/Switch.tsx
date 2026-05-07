import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  activeColor,
  inactiveColor,
  style,
}) => {
  const theme = useTheme();
  
  // Custom colors or fallbacks from theme
  const trackActiveColor = activeColor || theme.colors.success;
  const trackInactiveColor = inactiveColor || theme.colors.border;
  const thumbColor = '#FFFFFF';

  // Use Animated for smooth transition
  // We will animate value from 0 (inactive) to 1 (active)
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // translateX is safe with native driver, but backgroundColor requires layout-level interpolation or non-native driver
    }).start();
  }, [value, animatedValue]);

  // Interpolate thumb position (from left position to right position)
  // Track width is 50, thumb size is 22. Thumb starts at left margin 3, ends at right margin 3 (50 - 22 - 3 = 25)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 25],
  });

  // Interpolate track background color
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [trackInactiveColor, trackActiveColor],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: disabled ? 0.5 : pressed ? 0.9 : 1 },
        style,
      ]}
    >
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: thumbColor,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    position: 'relative',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    position: 'absolute',
  },
});
