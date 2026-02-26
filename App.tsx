/**
 * Daily Motivation - React Native App
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, UIManager, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
import { ChecklistProvider } from './src/context/ChecklistContext';
import { RootNavigator } from './src/navigation/RootNavigator';

const AppContainer: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? DarkTheme.colors.background : DefaultTheme.colors.background}
      />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ChecklistProvider>
          <AppContainer />
        </ChecklistProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
