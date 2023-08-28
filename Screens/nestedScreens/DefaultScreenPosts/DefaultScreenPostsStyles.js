import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    width: 24,
    height: 24,
  },

  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
  },

  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {
    marginLeft: 8,
  },

  userName: {
    color: "#212121",
    // fontFamily: Roboto,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    // fontFamily: Roboto,
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "400",
  },
});

export default styles;
