import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { socketUrl } from "../services/api";
import axios from "axios";
import styles from "../styles/styles";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { Ionicons } from "@expo/vector-icons";

interface MessageData {
    chatId: string;
    sender: string;
    receiver: string;
    message: string;
    timestamp: string;
}

const socket = io(socketUrl || '');

interface MessageScreenProps {
    route: RouteProp<RootStackParamList, 'Message'>;
}

export default function MessageScreen({ route }: MessageScreenProps) {
    const { chatId, receiver } = route.params;
    const navigation = useNavigation();
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || '');
        };

        const fetchMessages = async () => {
            try {
                const response = await api.get(`/api/chat/messages/${chatId}`);
                setMessages(response.data);
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: false });
                }, 100); // Delay to ensure messages are rendered
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchUsername();
        fetchMessages();

        socket.emit('joinChat', chatId);

        socket.on('receiveMessage', (message: MessageData) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            }, 100);
        });

        return () => {
            socket.emit('leaveChat', chatId);
            socket.off('receiveMessage');
        };
    }, [chatId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData: MessageData = {
                chatId,
                sender: username,
                receiver,
                message: newMessage,
                timestamp: new Date().toISOString(),
            };
            console.log("Sending message:", messageData);
            socket.emit('privateMessage', messageData, (response: any) => {
                console.log("Server response:", response);
                if (response.status === 'ok') {
                    setMessages((prevMessages) => [...prevMessages, messageData]);
                    setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                }
            });
            setNewMessage('');
        } else {
            console.log("Message is empty, not sending.");
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const isToday = messageDate.toDateString() === today.toDateString();

        if (isToday) {
            return messageDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        } else {
            return `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')} ${messageDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
        }
    };

    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={styles.container} ref={scrollViewRef}>
                <View style={styles.chatMessageContainer}>
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            style={[
                                styles.messageContainer,
                                msg.sender === username ? styles.messageSent : styles.messageReceived,
                            ]}
                        >
                            <Text style={styles.messageText}>{msg.message}</Text>
                            <Text style={[msg.sender === username ? styles.messageTimestampSent : styles.messageTimestampReceived,]}>
                                {formatTimestamp(msg.timestamp)}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', padding: 7, backgroundColor: "#fff" }}>
                <TextInput
                    style={{ flex: 1, borderColor: '#ddd', borderWidth: 1, borderRadius: 50, padding: 10, backgroundColor: "#ddd" }}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={handleSendMessage} style={{ marginLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ color: '#1caa60', fontWeight: 'bold' }}>
                        <Ionicons name="send" size={24} color="#1caa60" />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}