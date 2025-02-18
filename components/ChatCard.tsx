import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

type ChatCardProps = {
    name: string;
    message: string;
    time: string;
    onPress: () => void;
};

export default function ChatCard({ name, message, time, onPress }: ChatCardProps) {
    return (
        <TouchableOpacity style={styles.chatCardContainer} onPress={onPress}>
            <View style={styles.cardLeft}>
                <Text style={{ fontSize: 26, fontWeight: '700', color: "#000" }}>{name}</Text>
                <Text style={{ fontSize: 18, fontWeight: '400', color: "#808080" }}>{message}</Text>
            </View>
            <View style={styles.cardRight}>
                <Text style={{ fontSize: 18, fontWeight: '400', color: "#000" }}>{time}</Text>
            </View>
        </TouchableOpacity>
    );
}
