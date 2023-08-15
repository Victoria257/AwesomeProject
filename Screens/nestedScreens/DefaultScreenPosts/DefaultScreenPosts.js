import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { db } from "../../../config";
import { collection, getDocs } from "firebase/firestore";

import { authSignOutUser } from "../../../redux/auth/authOperations";
import { Post } from "../../../Components/Post/Post";

import styles from "./DefaultScreenPostsStyles";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

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
          onPress={() => {
            dispatch(authSignOutUser());
          }}
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
