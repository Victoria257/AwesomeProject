import React from "react";
import { View, Text } from "react-native";

export const CreatePostScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Створити публікацію",
    });
  }, [navigation]);

  return (
    <View>
      <Text>Create Post Screen</Text>
    </View>
  );
};
