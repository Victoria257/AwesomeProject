import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import styles from "./OpenCameraStyles.js";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function OpenCamera({
  photo,
  setPhoto,
  location,
  setAddress,
  navigation,
}) {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");

      const { statusLocation } =
        await Location.requestForegroundPermissionsAsync();
      if (statusLocation !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
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
    console.log("takePhoto");
    console.log("location", location);
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      setPhoto(uri);
    }
  };

  const flipPhoto = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <Camera style={styles.camera} ref={setCamera} type={type}>
      {photo ? (
        <View style={styles.takePhotoContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.flipContainer} onPress={flipPhoto}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <Text style={styles.snap}>
              <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Camera>
  );
}
