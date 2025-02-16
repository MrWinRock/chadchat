import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmailScreen from '../screens/EmailScreen';
import PhoneScreen from '../screens/PhoneScreen';
import UsernameScreen from '../screens/UsernameScreen';
import PasswordScreen from '../screens/PasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Email" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Email" component={EmailScreen} />
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="Username" component={UsernameScreen} />
            <Stack.Screen name="Password" component={PasswordScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
    );
}