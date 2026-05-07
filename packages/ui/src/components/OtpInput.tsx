import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export interface OtpInputProps {
  codeLength?: 4 | 6;
  onCodeComplete: (code: string) => void;
  style?: ViewStyle;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  codeLength = 4,
  onCodeComplete,
  style,
}) => {
  const theme = useTheme();
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // References to input fields
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Reset local state if codeLength changes
  useEffect(() => {
    setCode(Array(codeLength).fill(''));
  }, [codeLength]);

  const handleChangeText = (text: string, index: number) => {
    // Keep only the last character entered (or handle clear)
    const cleanedText = text.replace(/[^0-9]/g, ''); // numeric only
    const digit = cleanedText.charAt(cleanedText.length - 1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit !== '') {
      // Advance focus to next input box if not at the end
      if (index < codeLength - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        // Blur at end and submit
        inputRefs.current[index]?.blur();
        onCodeComplete(newCode.join(''));
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    // On Backspace detection, focus previous block if current block is empty
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index] === '' && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = ''; // clear previous block
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = ''; // clear current block
        setCode(newCode);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      {Array(codeLength)
        .fill(0)
        .map((_, index) => {
          const isFocused = focusedIndex === index;
          const hasValue = code[index] !== '';

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpCell,
                {
                  borderColor: isFocused
                    ? theme.colors.primary
                    : hasValue
                    ? theme.colors.grayDark
                    : theme.colors.border,
                  backgroundColor: isFocused ? '#FFFFFF' : '#F9FAFB',
                  color: theme.colors.textPrimary,
                },
              ]}
              maxLength={2} // allow typing over existing characters
              keyboardType="number-pad"
              textAlign="center"
              value={code[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(-1)}
              selectTextOnFocus
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  otpCell: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 22,
    fontWeight: '700',
  },
});
