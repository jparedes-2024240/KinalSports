// c:\Users\Informatica\Documents\IN6AV\KinalSports\client-user\src\navigation\AppNavigator.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../shared/store/authStore.js';
import AuthStack from './AuthStack.jsx';
import MainTabs from './MainTabs.jsx';
import { LoadingSpinner } from '../shared/components/common/Common.jsx';
import { COLORS, SPACING, FONT_SIZE } from '../shared/constants/theme.js';

export default function AppNavigator() {
  const { isAuthenticated, _hasHydrated } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    _hasHydrated: state._hasHydrated
  }));

  if (!_hasHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner text="Cargando estado de usuario..." />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: COLORS.text,
    fontSize: FONT_SIZE.large,
    textAlign: 'center'
  }
});
