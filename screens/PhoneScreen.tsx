import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authStyles from '../styles/authStyles';
import { RootStackParamList } from '../types/RootStackParamList';

type PhoneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Phone'>;
type PhoneScreenRouteProp = RouteProp<RootStackParamList, 'Phone'>;

type Props = {
    navigation: PhoneScreenNavigationProp;
    route: PhoneScreenRouteProp;
};

export default function PhoneScreen({ navigation }: Props) {
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [showError, setShowError] = useState(false);

    const checkIsPhone = (phone: string): void => {
        const phoneRegex = /^\d{10}$/;
        setIsPhoneValid(phoneRegex.test(phone));
    };

    const handlePhoneChange = (phone: string): void => {
        setPhone(phone);
        checkIsPhone(phone);
        setShowError(false);
    }

    const handleNext = async () => {
        if (!isPhoneValid) {
            setShowError(true);
            return;
        }
        try {
            await AsyncStorage.setItem('phone', phone);
            navigation.navigate('Username');
        } catch (e) {
            console.error('Failed to save phone number.', e);
        }
    };

    return (
        <View style={authStyles.container}>
            <View style={authStyles.headerContainer}>
                <Image source={require('../assets/chadchat-logo.png')} style={authStyles.logo} />
            </View>
            <View style={authStyles.formContainer}>
                <View style={authStyles.inputField}>
                    <Text style={{ fontSize: 24, fontWeight: '400' }}>Enter your phone number</Text>
                    <TextInput
                        style={authStyles.input}
                        value={phone}
                        placeholder='Phone number'
                        onChangeText={handlePhoneChange}
                        keyboardType="phone-pad"
                    />
                    {showError && !isPhoneValid && (
                        <Text style={{ color: 'red' }}>Please enter a valid phone number</Text>
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