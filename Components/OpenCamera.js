import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import styles from "./OpenCameraStyles.js";
import { FontAwesome5 } from "@expo/vector-icons";

export default function OpenCamera({ photo, setPhoto }) {
  const [camera, setCamera] = useState(null);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
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
