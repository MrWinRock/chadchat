import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import MainNavigator from './navigations/MainNavigator'; // Ensure this path is correct and the file exists
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', token);
      if (token) {
        try {
          const response = await axios.get('http://192.168.1.136:5000/api/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Token verification response:', response.status);
          setIsAuthenticated(response.status === 200);
        } catch (error) {
          console.error('Failed to verify token.', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <StatusBar style="auto" />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
