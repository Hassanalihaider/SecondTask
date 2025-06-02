import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigators/AppNavigator';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { linking } from './utils/linking/deepLinking';
import { usePostStore } from './stores/usePostStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const loadFromStorage = usePostStore((state) => state.loadFromStorage);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <GestureHandlerRootView style={styles.flex}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <NavigationContainer linking={linking}>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { App };
