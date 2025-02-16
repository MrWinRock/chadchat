import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || '');
        };

        fetchUsername();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'timer-outline';
                    let iconStyle = {};

                    if (route.name === 'Chat') {
                        iconName = 'chatbubble-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return (
                        <View style={route.name === 'Chat' ? iconStyle : {}}>
                            <Ionicons name={iconName} size={route.name === 'Chat' ? size * 2.2 : size * 1.2} color={color} />
                        </View>
                    );
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#a9a9a9',
                tabBarStyle: {
                    height: 70,
                    paddingTop: 7,
                },
                tabBarLabelStyle: {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 12,
                    fontFamily: 'Poppins_700Bold',
                },
                headerShown: false
            })}
            initialRouteName="Chat"
        >
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}