import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import styles from "./OpenCameraStyles.js";
import { FontAwesome5 } from "@expo/vector-icons";

export default function OpenCamera({ photo, setPhoto, navigation }) {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const handleBlur = () => {
      if (camera) {
        camera.pausePreview();
        setHasPermission(null);
      }
    };

    const handleFocus = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (camera) {
        camera.resumePreview();
      }
    };

    const unsubscribeBlur = navigation.addListener("blur", handleBlur);
    const unsubscribeFocus = navigation.addListener("focus", handleFocus);

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation, camera, hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={styles.preview} />
          </View>
        )}

        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>
            <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
          </Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}
