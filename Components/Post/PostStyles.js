import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  set: {
    marginTop: 16,
    marginBottom: 18,
    marginLeft: "auto",
    marginRight: "auto",
  },

  photo: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },

  title: {
    marginTop: 8,
    color: "#212121",
    // fontFamily: Roboto,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
  signatureContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginRight: 25,
    color: "#BDBDBD",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  location: {
    textDecorationLine: "underline",
  },
});

export default styles;
