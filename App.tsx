import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigations/AuthNavigator';
import MainNavigator from './navigations/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './services/api';
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
          const response = await api.get('/api/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Token verification response:', response.status, response.data);
          if (response.status === 200) {
            const { userId } = response.data;
            console.log('Retrieved userId:', userId);
            if (userId) {
              await AsyncStorage.setItem('userId', userId);
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Failed to verify token.', error.message, error.response?.status, error.response?.data);
          } else {
            console.error('Failed to verify token.', error);
          }
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