import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import authStyles from '../styles/authStyles';

type RootStackParamList = {
    Password: undefined;
    Login: undefined;
};

type PasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Password'>;
type PasswordScreenRouteProp = RouteProp<RootStackParamList, 'Password'>;

type Props = {
    navigation: PasswordScreenNavigationProp;
    route: PasswordScreenRouteProp;
};

export default function PasswordScreen({ navigation }: Props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [isMinLength, setIsMinLength] = useState(false);

    const checkIsPassword = (password: string): void => {
        setHasUpperCase(/[A-Z]/.test(password));
        setHasLowerCase(/[a-z]/.test(password));
        setHasNumber(/\d/.test(password));
        setHasSpecialChar(/[@$!%*?&]/.test(password));
        setIsMinLength(password.length >= 8);

        setIsPasswordValid(
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[@$!%*?&]/.test(password) &&
            password.length >= 8
        );
    };

    const handlePasswordChange = (password: string): void => {
        setPassword(password);
        checkIsPassword(password);
        setShowError(false);
        setPasswordsMatch(password === confirmPassword);
    };

    const handleConfirmPasswordChange = (confirmPassword: string): void => {
        setConfirmPassword(confirmPassword);
        setPasswordsMatch(password === confirmPassword);
    };

    const handleSubmit = async () => {
        console.log("Email: ", await AsyncStorage.getItem('email'));
        console.log("Phone: ", await AsyncStorage.getItem('phone'));
        console.log("Username: ", await AsyncStorage.getItem('username'));
        console.log("Password: ", password);

        if (!isPasswordValid || !passwordsMatch) {
            setShowError(true);
            return;
        }
        try {
            const email = await AsyncStorage.getItem('email');
            const phone = await AsyncStorage.getItem('phone');
            const username = await AsyncStorage.getItem('username');

            console.log("Sending registration data:", { email, phone, username, password });

            const response = await axios.post('http://192.168.1.136:5000/api/auth/register', {
                email,
                phone,
                username,
                password,
            });

            console.log("Registration response:", response);

            if (response.status === 201) {
                navigation.navigate('Login');
            } else {
                console.error('Failed to submit data.');
                setShowError(true);
            }
        } catch (e) {
            console.error('Failed to save password or submit data.', e);
            alert('Network error. Please try again later.');
            setShowError(true);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={authStyles.container}>
                    <View style={authStyles.headerContainer}>
                        <Image source={require('../assets/chadchat-logo.png')} style={authStyles.logo} />
                    </View>
                    <View style={authStyles.formContainer}>
                        <View style={authStyles.inputField}>
                            <Text style={{ fontSize: 24, fontWeight: '400' }}>Enter your password</Text>
                            <TextInput
                                style={authStyles.input}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry
                                placeholder="Password"
                            />
                            <TextInput
                                style={authStyles.input}
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry
                                placeholder="Confirm Password"
                            />
                            {showError && !passwordsMatch && (
                                <Text style={{ color: 'red' }}>Passwords do not match.</Text>
                            )}
                            <View>
                                <Text style={{ color: hasUpperCase ? 'green' : 'red' }}>
                                    {hasUpperCase ? '✔' : '✘'} At least one uppercase letter
                                </Text>
                                <Text style={{ color: hasLowerCase ? 'green' : 'red' }}>
                                    {hasLowerCase ? '✔' : '✘'} At least one lowercase letter
                                </Text>
                                <Text style={{ color: hasNumber ? 'green' : 'red' }}>
                                    {hasNumber ? '✔' : '✘'} At least one number
                                </Text>
                                <Text style={{ color: hasSpecialChar ? 'green' : 'red' }}>
                                    {hasSpecialChar ? '✔' : '✘'} At least one special character
                                </Text>
                                <Text style={{ color: isMinLength ? 'green' : 'red' }}>
                                    {isMinLength ? '✔' : '✘'} Minimum 8 characters
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[authStyles.button, { marginBottom: 20 }]}
                    >
                        <Text style={{ fontSize: 16, color: "#fff" }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}