import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../theme';

export interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  style?: ViewStyle;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onChange,
  activeColor,
  style,
}) => {
  const theme = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const activePillColor = activeColor || '#FFFFFF';
  const tabWidth = containerWidth / values.length;

  // Animation value reflecting the selected index
  const animatedIndexRef = useRef<Animated.Value | null>(null);
  if (animatedIndexRef.current === null) {
    animatedIndexRef.current = new Animated.Value(selectedIndex);
  }
  const animatedIndex = animatedIndexRef.current;

  useEffect(() => {
    Animated.spring(animatedIndex, {
      toValue: selectedIndex,
      useNativeDriver: true,
      bounciness: 6,
      speed: 12,
    }).start();
  }, [selectedIndex, animatedIndex]);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  // Safe translation interpolation, guarding against zero width on initial render
  const translateX = tabWidth > 0
    ? animatedIndex.interpolate({
        inputRange: values.map((_, i) => i),
        outputRange: values.map((_, i) => i * tabWidth),
      })
    : 0;

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.grayLight,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      {/* Sliding Active Pill Background */}
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.activePill,
            {
              width: tabWidth - 6, // minor spacing adjustment inside track
              backgroundColor: activePillColor,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {/* Tab Buttons */}
      {values.map((label, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={label}
            onPress={() => onChange(index)}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isSelected ? theme.colors.textPrimary : theme.colors.textSecondary,
                  fontWeight: isSelected ? '700' : '500',
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    position: 'relative',
    alignItems: 'center',
  },
  activePill: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1.5,
    elevation: 2,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // ensure text sits above sliding pill
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
