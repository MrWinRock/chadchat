import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import ChatCard from '../components/ChatCard';
import styles from '../styles/styles';

interface MessageData {
    chatId: string;
    sender: string;
    receiver: string;
    message: string;
}

interface ChatData {
    _id: string;
    chatId: string;
    receiver: string;
    lastMessage?: string;
    timestamp?: string;
}

const socket = io('http://192.168.1.136:5000');

export default function ChatScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [username, setUsername] = useState<string>('');
    const [chats, setChats] = useState<ChatData[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            console.log("Stored username:", storedUsername);
            setUsername(storedUsername || '');
        };

        fetchUsername();
    }, []);

    useEffect(() => {
        if (username) {
            const fetchChats = async () => {
                try {
                    const response = await axios.get(`http://192.168.1.136:5000/api/chat/chat-list/${username}`);
                    const sortedChats = response.data.sort((a: ChatData, b: ChatData) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime());
                    setChats(sortedChats);
                    console.log('Fetched and sorted chats:', sortedChats);
                } catch (error) {
                    console.error('Failed to fetch chats: ', error);
                }
            };

            fetchChats();
        }
    }, [username]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('receiveMessage', (message: MessageData) => {
            console.log('Received message:', message);
            setChats((prevChats) => {
                const updatedChats = prevChats.map((chat) => {
                    if (chat.chatId === message.chatId) {
                        return { ...chat, lastMessage: message.message, timestamp: new Date().toISOString() };
                    }
                    return chat;
                });
                return updatedChats.sort((a, b) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime());
            });
        });

        return () => {
            socket.off('connect');
            socket.off('receiveMessage');
        };
    }, []);

    const handleCreateChat = () => {
        navigation.navigate('Create');
    };

    const handleSendMessage = (chatId: string, receiver: string, message: string) => {
        const data: MessageData = {
            chatId,
            sender: username,
            receiver,
            message,
        };
        socket.emit('privateMessage', data);
    };

    const handleChatPress = (chatId: string, receiver: string) => {
        navigation.navigate('Message', { chatId, receiver });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(`http://192.168.1.136:5000/api/chat/chat-list/${username}`);
            const sortedChats = response.data.sort((a: ChatData, b: ChatData) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime());
            setChats(sortedChats);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const truncateMessage = (message?: string) => {
        if (!message) return '';
        return message.length > 30 ? message.substring(0, 30) + '...' : message;
    };

    const formatTime = (timestamp?: string) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
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
                <View style={styles.chatContainer}>
                    {chats.map((chat) => (
                        <ChatCard
                            key={chat._id}
                            name={chat.receiver}
                            message={truncateMessage(chat.lastMessage)}
                            time={formatTime(chat.timestamp)}
                            onPress={() => handleChatPress(chat.chatId, chat.receiver)}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.createButtonContainer}>
                <TouchableOpacity style={styles.createButton} onPress={handleCreateChat}>
                    <Ionicons name="chatbox-outline" style={styles.createIcon} size={50} color="#fff" />
                    <Ionicons name="add-outline" style={{ ...styles.createIcon, paddingBottom: 6 }} size={35} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}