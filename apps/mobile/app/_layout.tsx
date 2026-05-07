import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from '@tempexpo/ui';
import { Stack } from 'expo-router';
import { LinkPreviewContextProvider } from 'expo-router/build/link/preview/LinkPreviewContext';
import { initI18n } from '../src/core/i18n';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5A31F4" />
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <LinkPreviewContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </LinkPreviewContextProvider>
    </ThemeProvider>
  );
}
