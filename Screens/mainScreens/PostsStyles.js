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
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
  },
  photo: {
    marginTop: 32,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    //border-radius: 8px;
    //border: 1px solid #E8E8E8;
    borderRadius: 8,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textUnderPhoto: {
    color: "#BDBDBD",
    fontSize: 16,
    width: "100%",
    marginBottom: 8,
  },
  form: {
    marginTop: 32,
    width: "100%",
    gap: 16,
  },
  inputContainer: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  input: {
    fontSize: 16,
  },
  iconInput: {
    marginRight: 4,
  },
  formButton: {
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingBottom: 16,
    paddingTop: 16,
    paddingRight: 32,
    paddingLeft: 32,
    alignItems: "center",
  },
  textButton: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  footer: {
    height: 71,
  },
  delete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    marginTop: 9,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
