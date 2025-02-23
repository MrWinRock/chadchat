import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

type ProfileCardProps = {
    title: string;
    data: string;
};

export default function ProfileCard({ title, data }: ProfileCardProps) {
    return (
        <View style={styles.profileCard}>
            <Text style={styles.profileText}>{title}: </Text>
            <Text style={styles.profileText}>{data}</Text>
        </View>
    );
}
