import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export interface AccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  style?: ViewStyle;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  children,
  initiallyExpanded = false,
  style,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(initiallyExpanded);

  // Animated value for rotating the chevron (0 = closed, 1 = open)
  const animValueRef = useRef<Animated.Value | null>(null);
  if (animValueRef.current === null) {
    animValueRef.current = new Animated.Value(initiallyExpanded ? 1 : 0);
  }
  const animValue = animValueRef.current;

  const toggleExpand = () => {
    const nextState = !expanded;
    setExpanded(nextState);
    Animated.timing(animValue, {
      toValue: nextState ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate chevron rotation
  // Closed = 45deg (pointing right), Open = 135deg (pointing down)
  const rotate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '135deg'],
  });

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
          backgroundColor: '#FFFFFF',
        },
        style,
      ]}
    >
      {/* Header Pressable */}
      <Pressable
        onPress={toggleExpand}
        style={({ pressed }) => [
          styles.header,
          { backgroundColor: pressed ? theme.colors.grayLight : 'transparent' },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Animated Chevron Indicator */}
        <Animated.View
          style={[
            styles.chevron,
            {
              borderColor: theme.colors.grayMedium,
              transform: [{ rotate }],
            },
          ]}
        />
      </Pressable>

      {/* Expanded Content Panel */}
      {expanded && (
        <View style={[styles.contentPanel, { borderTopColor: theme.colors.border }]}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '400',
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    marginRight: 4,
  },
  contentPanel: {
    borderTopWidth: 1,
    padding: 16,
  },
});
