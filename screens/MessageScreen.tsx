import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

interface MessageData {
    chatId: string;
    sender: string;
    receiver: string;
    message: string;
}

const socket = io('http://192.168.1.136:5000');

interface MessageScreenProps {
    route: RouteProp<RootStackParamList, 'Message'>;
}

export default function MessageScreen({ route }: MessageScreenProps) {
    const { chatId, receiver } = route.params;
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || '');
        };

        fetchUsername();

        socket.emit('joinChat', chatId);

        socket.on('receiveMessage', (message: MessageData) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
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
            };
            console.log("Sending message:", messageData);
            socket.emit('privateMessage', messageData, (response: any) => {
                console.log("Server response:", response);
                if (response.status === 'ok') {
                    setMessages((prevMessages) => [...prevMessages, messageData]);
                }
            });
            setNewMessage('');
        } else {
            console.log("Message is empty, not sending.");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View>
                    {/* <Text>Chat ID: {chatId}</Text> */}
                    {messages.map((msg, index) => (
                        <View key={index} style={{ marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>{msg.sender}</Text>
                            <Text>{msg.message}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <TextInput
                    style={{ flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10 }}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={handleSendMessage} style={{ marginLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ color: '#1caa60', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
