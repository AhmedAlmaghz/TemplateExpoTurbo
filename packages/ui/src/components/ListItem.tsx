import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  divider?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  showChevron = false,
  onPress,
  divider = true,
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const theme = useTheme();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: 'white',
          borderBottomWidth: divider ? 1 : 0,
          borderBottomColor: theme.colors.border,
          paddingVertical: theme.spacing.m,
          paddingHorizontal: theme.spacing.m,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {leftElement && <View style={styles.leftContainer}>{leftElement}</View>}

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.textPrimary },
              titleStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.textSecondary },
                subtitleStyle,
              ]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.rightContainer}>
          {rightElement}
          {showChevron && <View style={[styles.chevron, { borderColor: theme.colors.grayMedium }]} />}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '400',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginLeft: 8,
  },
});
