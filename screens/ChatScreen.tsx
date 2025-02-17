import React from "react"
import { useEffect, useState } from "react"
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import socket from "socket.io";
import styles from "../styles/styles"
import { Ionicons } from "@expo/vector-icons"

export default function ChatScreen() {


    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/chadchat-logo.png')} style={styles.logo} />
            </View>
            <View style={styles.chatContainer}>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
                <Text style={{ fontSize: 24, fontWeight: '400' }}>Chat</Text>
            </View>
            {/* <View style={styles.createContainer}> */}
            <TouchableOpacity style={styles.createButton}>
                <Ionicons name="chatbox-outline" style={styles.createIcon} size={50} color="#fff" />
                <Ionicons name="add-outline" style={{ ...styles.createIcon, paddingTop: 4 }} size={35} color="#fff" />
            </TouchableOpacity>
            {/* </View> */}
        </ScrollView>
    )
}
