import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import CreateScreen from '../screens/CreateScreen';
import { View, Text } from 'react-native';
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
    const [username, setUsername] = useState<string>('Profile');

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) setUsername(storedUsername);
        };

        fetchUsername();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'person-outline';

                    if (route.name === 'Chat') {
                        iconName = 'chatbubble-outline';
                    } else {
                        iconName = 'person-outline';
                    }

                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Ionicons name={iconName} size={size} color={color} />
                            <Text style={{ color, fontSize: 14, marginTop: 2 }}>
                                {route.name}
                            </Text>
                        </View>
                    );
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#a9a9a9',
                tabBarStyle: {
                    height: 70,
                    paddingTop: 7,
                    flexDirection: 'column',
                },
                tabBarShowLabel: false,
                headerShown: false
            })}
            initialRouteName="Chat"
        >
            <Tab.Screen name="Chat" component={ChatStack} />
            <Tab.Screen name={username} component={ProfileScreen} />
        </Tab.Navigator>
    );
}
