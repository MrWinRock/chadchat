import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import authStyles from '../styles/authStyles';
import { RootStackParamList } from '../types/RootStackParamList';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
};

export default function LoginScreen({ navigation }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleLogin = async () => {
        try {
            const payload = {
                username,
                password,
            };
            console.log('Request payload:', payload);

            const response = await api.post('/api/auth/login', payload);

            if (response.status === 200) {
                const { token, userId } = response.data;
                if (token && userId) {
                    await AsyncStorage.setItem('token', token);
                    await AsyncStorage.setItem('userId', userId);
                    await AsyncStorage.setItem('username', username);
                    console.log('Login successful!');
                    navigation.navigate('Main');
                } else {
                    console.error('Token or userId is missing in the response.');
                    setShowError(true);
                }
            } else {
                console.error('Response status:', response.status);
                setShowError(true);
            }
        } catch (error: any) {
            console.error('Failed to login.', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            setShowError(true);
        }
    };

    return (
        <View style={authStyles.container}>
            <View style={authStyles.headerContainer}>
                <Image source={require('../assets/chadchat-logo.png')} style={authStyles.logo} />
            </View>
            <View style={authStyles.formContainer}>
                <View style={authStyles.inputField}>
                    <Text style={{ fontSize: 24, fontWeight: '400' }}>Login</Text>
                    <TextInput
                        style={authStyles.input}
                        value={username}
                        placeholder='Username'
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={authStyles.input}
                        value={password}
                        placeholder='Password'
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {showError && (
                        <Text style={{ color: 'red' }}>Invalid username or password</Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={authStyles.button}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Email')}
                    style={[authStyles.button, { marginTop: 10, backgroundColor: '#000' }]}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}