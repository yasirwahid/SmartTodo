import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ChecklistDetailScreen } from '../screens/ChecklistDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  ChecklistDetail: { checklistId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChecklistDetail" component={ChecklistDetailScreen} />
    </Stack.Navigator>
  );
};

