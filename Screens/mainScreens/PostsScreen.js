import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Публікації",
      // headerStyle: styles.headerStyle,
      headerTitleAlign: "center",
      headerTitleStyle: styles.headerTitleStyle,
      //  headerStyle:{styles.headerStyle},
      // headerStyle:
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Text>Posts Screen</Text> */}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
          </View>
        )}
      ></FlatList>
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
  photoContainer: {
    marginTop: 10,
  },
  photo: {
    height: 200,
    width: 200,
  },
});
