import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
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
  formContainer: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  inputField: {
    flex: 1,
    gap: 30,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#1CAA60",
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    width: "80%",
  },
  button: {
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#1CAA60",
    padding: 10,
  },
});

export default authStyles;
