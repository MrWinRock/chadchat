import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, RefreshControl, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileCard from "../components/ProfileCard";
import api from "../services/api";
import styles from "../styles/styles";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [refreshing, setRefreshing] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const fetchUserInfo = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await api.get(`/api/user/info/${userId}`);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPhone(response.data.phone);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            Alert.alert('Error', 'Failed to fetch user info');
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await api.post('/api/auth/logout', { userId });

            if (response.status === 200) {
                await AsyncStorage.clear();
                Alert.alert('Success', 'Logged out successfully');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                Alert.alert('Error', 'Failed to log out');
            }
        } catch (error) {
            console.error('Failed to log out:', error);
            Alert.alert('Error', 'Failed to log out');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserInfo();
        setRefreshing(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/chadchat-logo.png')} style={styles.logo} />
                </View>
                <View style={styles.profileContainer}>
                    <ProfileCard title="Username" data={username} />
                    <ProfileCard title="Email" data={email} />
                    <ProfileCard title="Phone" data={phone} />
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}