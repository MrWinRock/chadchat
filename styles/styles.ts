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
  createContainer: {
    position: "relative",
    bottom: 0,
    right: 0,
  },
  createButton: {
    aspectRatio: 1,
    width: 80,
    borderRadius: 20,
    backgroundColor: "#1caa60",
  },
  createIcon: {
    alignSelf: "center",
    marginVertical: 15,
    position: "absolute",
  },
});

export default styles;
