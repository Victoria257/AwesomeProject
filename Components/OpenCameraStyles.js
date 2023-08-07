import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    // aspectRatio: 1,
    width: "100%",
    height: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  snapContainer: {
    backgroundColor: "#fff",
    border: "none",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },

  takePhotoContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
  },

  photoView: {
    flex: 1,

    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default styles;
