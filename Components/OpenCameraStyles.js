import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  camera: {
    aspectRatio: 3 / 4,
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
    marginTop: 50,
    marginBottom: 70,
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

  flipContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
