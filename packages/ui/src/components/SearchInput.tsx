import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  style,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? theme.colors.primary : theme.colors.border,
          backgroundColor: '#F9FAFB',
        },
        style,
      ]}
    >
      {/* Search Icon */}
      <Text style={styles.searchIcon}>🔍</Text>

      {/* Input Field */}
      <TextInput
        style={[styles.input, { color: theme.colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Clear Text Button (Appears only when text exists) */}
      {value.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <View style={[styles.clearCircle, { backgroundColor: theme.colors.border }]}>
            <Text style={styles.clearText}>✕</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderRadius: 24, // capsule shape
    paddingHorizontal: 16,
    width: '100%',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    padding: 0, // reset native paddings
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
