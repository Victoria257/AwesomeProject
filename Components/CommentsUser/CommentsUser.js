import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

import styles from "./CommentsUserStyles";
import { Image } from "react-native";
import { storage } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";

export const CommentsUser = ({ item, style }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const user = item.data.userId;

  useEffect(() => {
    // Отримуємо посилання на фото з Firebase Storage
    const storageRef = ref(storage, `usersPhoto/${user}`);

    getDownloadURL(storageRef)
      .then((url) => {
        setPhotoUrl(url);
      })
      .catch((error) => {
        console.log("Помилка отримання фото:", error);
        return;
      });
  }, [user]);
  // const usersRef = collection(storage, "usersPhoto");
  // const q = query(usersRef, where("name", "==", user));

  return (
    <View style={[styles.user, style]}>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.photo} />
      ) : (
        <Text style={styles.userName}>
          {item.data.login.substring(0, 1).toUpperCase()}
        </Text>
      )}
    </View>
  );
};
