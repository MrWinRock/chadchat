import { StyleSheet } from "react-native";
import ProfileCard from "../components/ProfileCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 24,
    marginBottom: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: "flex-start",
  },
  logo: {
    width: 125,
    height: 125,
  },
  chatContainer: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  createButton: {
    aspectRatio: 1,
    width: 80,
    borderRadius: 20,
    backgroundColor: "#1caa60",
    justifyContent: "center",
    alignItems: "center",
  },
  createIcon: {
    alignSelf: "center",
    position: "absolute",
  },
  createChatInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  createChatButton: {
    backgroundColor: "#1caa60",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chatCardContainer: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardLeft: {
    gap: 8,
  },
  cardRight: {},
  profileContainer: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  profileCard: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "#f00",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chatMessageContainer: {
    marginBottom: 16,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageSent: {
    alignSelf: "flex-end",
    backgroundColor: "#a6f3cb",
  },
  messageReceived: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageSender: {
    fontWeight: "bold",
  },
  messageText: {
    marginVertical: 5,
  },
  messageTimestampSent: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  messageTimestampReceived: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-start",
  },
});

export default styles;
