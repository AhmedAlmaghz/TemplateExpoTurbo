import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, DevSettings, Platform } from 'react-native';
import * as Updates from 'expo-updates';
import { SafeStorage } from '../utils/storage';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to TempExpo",
      home: "Home",
      settings: "Settings",
      profile: "Profile",
      changePassword: "Change Password",
      logout: "Logout",
      login: "Login",
      language: "Language",
      theme: "Theme",
      search: "Search",
      notifications: "Notifications",
    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بك في تيمب إكسبو",
      home: "الرئيسية",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      changePassword: "تغيير كلمة المرور",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      language: "اللغة",
      theme: "المظهر",
      search: "بحث",
      notifications: "الإشعارات",
    }
  }
};

async function safeReload() {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
    return;
  }
  
  try {
    if (__DEV__) {
      DevSettings.reload();
    } else {
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.warn("safeReload: Failed to reload app, attempting DevSettings fallback", e);
    try {
      DevSettings.reload();
    } catch (err) {
      console.error("safeReload: Failed to reload entirely", err);
    }
  }
}

export async function initI18n() {
  const savedLang = await SafeStorage.getItem('user-language') || 'ar';
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  const isRTL = savedLang === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    await safeReload();
  }
}

export async function changeLanguage(lang: 'ar' | 'en') {
  await SafeStorage.setItem('user-language', lang);
  i18n.changeLanguage(lang);
  
  const isRTL = lang === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    await safeReload();
  }
}

export default i18n;
