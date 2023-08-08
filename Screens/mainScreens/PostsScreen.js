import React, { useEffect, useState } from "react";

import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { Post } from "../../Components/Post/Post";

import styles from "./PostsScreenStyles.js";

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
      <View style={styles.userContainer}>
        <View style={styles.userPhoto}>
          <Feather name="user" size={24} color="black" />
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>Вікторія</Text>
          <Text style={styles.userEmail}>Email@gmail.com</Text>
        </View>
      </View>
      <Post posts={posts} navigation={navigation} />
    </View>
  );
};
