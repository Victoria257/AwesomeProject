import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  date: {
    color: "#BDBDBD",
    // fontFamily:Roboto,
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
export default styles;
