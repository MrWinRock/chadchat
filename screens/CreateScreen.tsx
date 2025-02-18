import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/styles";

export default function CreateScreen() {
    const [chatName, setChatName] = useState('');
    const navigation = useNavigation();

    const handleCreate = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (!username) {
                Alert.alert('Error', 'Username not found');
                return;
            }

            const participants = [username, chatName];
            const response = await axios.post('http://192.168.1.136:5000/api/chat/create-chat', { participants });

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'Chat created successfully');
                navigation.navigate('Chat' as never);
            } else {
                Alert.alert('Error', 'Failed to create chat');
            }
        } catch (error) {
            console.error('Failed to create chat:', error);
            Alert.alert('Error', 'Failed to create chat');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: '400' }}>Create a new chat</Text>
            <TextInput
                style={styles.createChatInput}
                value={chatName}
                placeholder='Chat name'
                onChangeText={setChatName}
            />
            <TouchableOpacity onPress={handleCreate} style={styles.createChatButton}>
                <Text style={{ fontSize: 16, color: "#fff" }}>Create</Text>
            </TouchableOpacity>
        </View>
    );
}
