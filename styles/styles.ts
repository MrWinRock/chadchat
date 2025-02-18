import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 24,
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
});

export default styles;
