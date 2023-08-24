import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

import styles from "./CommentsUserStyles";

export const CommentsUser = ({ item, style }) => {
  return (
    <View style={[styles.user, style]}>
      <Text style={styles.userName}>
        {item.data.login.substring(0, 1).toUpperCase()}
      </Text>
    </View>
  );
};
