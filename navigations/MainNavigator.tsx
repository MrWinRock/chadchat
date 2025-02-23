import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import CreateScreen from '../screens/CreateScreen';
import { View } from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function ChatStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
        </Stack.Navigator>
    );
}

export default function MainNavigator() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || 'Profile');
        };

        fetchUsername();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'person-outline';
                    let iconStyle = {};

                    if (route.name === 'ChatTab') {
                        iconName = 'chatbubble-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return (
                        <View style={route.name === 'ChatTab' ? iconStyle : {}}>
                            <Ionicons name={iconName} size={size * 1.4} color={color} />
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
            initialRouteName="ChatTab"
        >
            <Tab.Screen name="ChatTab" component={ChatStack} />
            <Tab.Screen name={username || 'Profile'} component={ProfileScreen} />
        </Tab.Navigator>
    );
}