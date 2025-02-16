import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStyles from '../styles/authStyles';

type RootStackParamList = {
    Email: undefined;
    Phone: undefined;
    Login: undefined;
};

type EmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Email'>;
type EmailScreenRouteProp = RouteProp<RootStackParamList, 'Email'>;

type Props = {
    navigation: EmailScreenNavigationProp;
    route: EmailScreenRouteProp;
};

export default function EmailScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showError, setShowError] = useState(false);

    const checkIsEmail = (email: string): void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    const handleEmailChange = (email: string): void => {
        setEmail(email);
        checkIsEmail(email);
        setShowError(false);
    };

    const handleNext = async () => {
        if (!isEmailValid) {
            setShowError(true);
            return;
        }
        try {
            await AsyncStorage.setItem('email', email);
            navigation.navigate('Phone');
        } catch (e) {
            console.error('Failed to save email.', e);
        }
    };

    return (
        <View style={authStyles.container}>
            <View style={authStyles.headerContainer}>
                <Image source={require('../assets/chadchat-logo.png')} style={authStyles.logo} />
            </View>
            <View style={authStyles.formContainer}>
                <View style={authStyles.inputField}>
                    <Text style={{ fontSize: 24, fontWeight: '400' }}>Enter your email</Text>
                    <TextInput
                        style={authStyles.input}
                        value={email}
                        placeholder='Email address'
                        onChangeText={handleEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {showError && !isEmailValid && (
                        <Text style={{ color: 'red' }}>Please enter a valid email address.</Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={handleNext}
                    style={authStyles.button}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={[authStyles.button, { marginTop: 10, backgroundColor: '#000' }]}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
