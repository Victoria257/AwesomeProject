import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.408,
    paddingBottom: 11,
    paddingTop: 11,
  },
  arrowLeft: {
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 16,
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFF",
    height: "100%",
    paddingBottom: 16,
  },
  photo: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },
  listComments: {
    marginTop: 34,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 24,
  },
  user: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: "gray",
  },
  commentContainer: {
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  comment: {
    color: "#212121",
    // fontFamily:Roboto,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
  },
  dateContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },
  data: {
    color: "#BDBDBD",
    // fontFamily:Roboto,
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },
  inputContainer: {
    position: "relative",
    height: 50,
    marginTop: 31,
  },
  input: {
    // fontFamily:Inter,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  iconContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  iconArrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 34,
    height: 34,
    borderRadius: 50,

    backgroundColor: "#FF6C00",
  },
});

export default styles;
