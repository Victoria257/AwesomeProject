import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

import styles from "./CommentsUserStyles";
import { Image } from "react-native";

export const CommentsUser = ({ item, style }) => {
  const user = item.data.userId;
  console.log("user(CommentsUser)", user);
  return (
    <View style={[styles.user, style]}>
      {item.data.photoURL ? (
        <Image source={{ uri: item.data.photoURL }} style={styles.photo} />
      ) : (
        <Text style={styles.userName}>
          {item.data.login.substring(0, 1).toUpperCase()}
        </Text>
      )}
    </View>
  );
};
