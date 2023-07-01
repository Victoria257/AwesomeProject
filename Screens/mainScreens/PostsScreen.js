import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const PostsScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Публікації",
      // headerStyle: styles.headerStyle,
      headerTitleAlign: "center",
      headerTitleStyle: styles.headerTitleStyle,
      //  headerStyle:{styles.headerStyle},
      // headerStyle:
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            source={require("../../images/icons/log-out.png")}
            style={styles.logoutButton}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Posts Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  // headerStyle: {
  //   backgroundColor: "orange",
  // },
  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  container: {
    alignItems: "center",
  },
});
