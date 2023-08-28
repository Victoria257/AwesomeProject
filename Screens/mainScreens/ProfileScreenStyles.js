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
  },
  imageContainer: {
    position: "absolute",
    top: 87,
    left: 128,
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addDelButton: {
    position: "absolute",
    zIndex: 3,
    bottom: 18,
    right: -17,
    width: 35,
    height: 35,
    padding: 5,
  },
  delButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
  },

  logoutButton: {
    position: "absolute",
    zIndex: 3,
    bottom: 18,
    right: -140,
    marginRight: 10,
    width: 24,
    height: 24,
  },
  viewContent: {
    position: "relative",
    flex: 1,
    marginTop: 147,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    width: "100%",
    fontStyle: "normal",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  userName: {
    marginTop: 92,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 17,
    //   fontFamily:Roboto,
    fontStyle: "normal",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.3,
    color: "#212121",
  },

  plug: {
    marginTop: 34,
    alignItems: "center",
  },
  plugText: {
    color: "orange",
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 35,
    letterSpacing: 0.3,
  },
  list: {
    flex: 1,
    marginBottom: 28,
  },
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
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureLeftContainer: {
    display: "flex",
    flexDirection: "row",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginRight: 24,
    color: "#BDBDBD",
  },
  likesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    color: "#BDBDBD",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});

export default styles;
