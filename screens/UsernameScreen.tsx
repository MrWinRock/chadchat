import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStyles from '../styles/authStyles';
import { RootStackParamList } from '../types/RootStackParamList';

type UsernameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Username'>;
type UsernameScreenRouteProp = RouteProp<RootStackParamList, 'Username'>;

type Props = {
    navigation: UsernameScreenNavigationProp;
    route: UsernameScreenRouteProp;
};

export default function UsernameScreen({ navigation }: Props) {
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [showError, setShowError] = useState(false);

    const checkIsUsername = (username: string): void => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        setIsUsernameValid(usernameRegex.test(username));
    }

    const handleUsernameChange = (username: string): void => {
        setUsername(username);
        checkIsUsername(username);
        setShowError(false);
    }

    const handleNext = async () => {
        if (!isUsernameValid) {
            setShowError(true);
            return;
        }
        try {
            await AsyncStorage.setItem('username', username);
            navigation.navigate('Password');
        } catch (e) {
            console.error('Failed to save username.', e);
        }
    };

    return (
        <View style={authStyles.container}>
            <View style={authStyles.headerContainer}>
                <Image source={require('../assets/chadchat-logo.png')} style={authStyles.logo} />
            </View>
            <View style={authStyles.formContainer}>
                <View style={authStyles.inputField}>
                    <Text style={{ fontSize: 24, fontWeight: '400' }}>Enter your username</Text>
                    <TextInput
                        style={authStyles.input}
                        value={username}
                        placeholder='Username'
                        onChangeText={handleUsernameChange}
                        autoCapitalize="none"
                    />
                    {showError && !isUsernameValid && (
                        <Text style={{ color: 'red' }}>Invalid username</Text>
                    )}
                </View>
                <TouchableOpacity
                    onPress={handleNext}
                    style={authStyles.button}
                >
                    <Text style={{ fontSize: 16, color: "#fff" }}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}