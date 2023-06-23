import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: 609,
    overflow: "visible",
  },
  image: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 128,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addButton: {
    position: "absolute",
    zIndex: 3,
    top: 81,
    left: 235,
    width: 25,
    height: 25,
  },
  scrollViewContent: {
    position: "absolute",
    bottom: 0,
    height: 549,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    fontStyle: "normal",
    paddingBottom: 34,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  title: {
    marginTop: 92,
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.01,

    color: "#212121",
  },
  listInput: {
    width: "100%",
    marginTop: 32,
  },
  input: {
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  buttonShow: {
    position: "absolute",
    zIndex: 2,
    top: 15,
    right: 32,
    backgroundColor: "transparent",
  },
  buttonRegisterBox: {
    width: "100%",
    marginTop: 43,
  },

  buttonRegister: {
    backgroundColor: "#FF6C00",
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
  },

  buttonRegisterText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  loginText: {
    marginTop: 16,
    color: "#1B4371",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default styles;
