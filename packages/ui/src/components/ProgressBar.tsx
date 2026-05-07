import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  color?: string;
  trackColor?: string;
  height?: number;
  animated?: boolean;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  trackColor,
  height = 6,
  animated = true,
  style,
}) => {
  const theme = useTheme();

  const activeColor = color || theme.colors.primary;
  const barTrackColor = trackColor || theme.colors.border;

  // Clamped progress between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  // Animated value for transition
  const progressAnim = useRef(new Animated.Value(clampedProgress)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: clampedProgress,
        duration: 250,
        useNativeDriver: false, // width animation is not supported on native driver
      }).start();
    } else {
      progressAnim.setValue(clampedProgress);
    }
  }, [clampedProgress, animated]);

  // Interpolate progress value to percentage string
  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: barTrackColor,
          borderRadius: height / 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            backgroundColor: activeColor,
            borderRadius: height / 2,
            width,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    width: 0,
  },
});
