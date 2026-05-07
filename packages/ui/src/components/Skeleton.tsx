import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  variant?: 'rect' | 'circle' | 'text';
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  variant = 'rect',
  style,
}) => {
  const theme = useTheme();

  // Opacity animated value for pulse effect (0.35 to 0.85)
  const opacityAnimRef = useRef<Animated.Value | null>(null);
  if (opacityAnimRef.current === null) {
    opacityAnimRef.current = new Animated.Value(0.35);
  }
  const opacityAnim = opacityAnimRef.current;

  useEffect(() => {
    // Loop sequence continuously
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop();
  }, [opacityAnim]);

  // Handle rounded corners depending on type
  let borderRadius = 8;
  if (variant === 'circle') {
    borderRadius = typeof height === 'number' ? height / 2 : 999;
  } else if (variant === 'text') {
    borderRadius = 4;
  }

  return (
    <Animated.View
      style={[
        styles.pulseBlock,
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: theme.colors.border, // standard loading light grey color
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  pulseBlock: {
    overflow: 'hidden',
  },
});
