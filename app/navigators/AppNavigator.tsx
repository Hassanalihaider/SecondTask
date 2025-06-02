import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileNavigator } from '../navigators/ProfileNavigator';
import { PersistScreen } from '../screens/PersistScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { SvgScreen } from '@/screens/SvgScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileNavigator} />
      <Stack.Screen name="PersistScreen" component={PersistScreen} />
      <Stack.Screen name="ProfilePostDetail" component={PostDetailScreen} />
      <Stack.Screen name='SvgScreen' component={SvgScreen}/>
    </Stack.Navigator>
  );
}
