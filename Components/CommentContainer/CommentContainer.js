import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

import styles from "./CommentContainerStyles";

export const CommentContainer = ({ item }) => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.comment}>{item.data.comment}</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>{item.formattedDate}</Text>
      </View>
    </View>
  );
};
