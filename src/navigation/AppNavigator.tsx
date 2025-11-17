import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../contexts/AuthContext.tsx';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { state } = useAuth();

  return (
    <Stack.Navigator initialRouteName={state.user ? 'Home' : 'Register'}>
      {state.user ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      ) : (
        <>
          <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
