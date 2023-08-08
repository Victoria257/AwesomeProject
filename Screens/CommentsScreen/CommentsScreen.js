import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import styles from "./CommentsScreenStyles";

export const CommentsScreen = ({ navigation, route }) => {
  const { uri } = route.params;
  console.log(uri);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Коментарі",
      headerTitleAlign: "center",
      headerStyle: {
        borderBottomColor: "color",
        borderBottomWidth: 1,
      },
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <Feather
            style={styles.arrowLeft}
            name="arrow-left"
            size={24}
            color="#212121CC"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Image source={{ uri: uri }} style={styles.photo} />
    </View>
  );
};
