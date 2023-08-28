import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { db } from "../../../config";
import { collection, getDocs } from "firebase/firestore";

import { authSignOutUser } from "../../../redux/auth/authOperations";
import { Post } from "../../../Components/Post/Post";

import styles from "./DefaultScreenPostsStyles";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native";

export const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { email, login, photoURL } = useSelector((state) => state.auth);


  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    console.log("route.paramsUse", route.params);
    getAllPost();
  }, [route.params]);

  const getAllPost = async () => {
    console.log("getAll");
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const posts = [];

      for (const doc of snapshot.docs) {
        const postData = doc.data();
        const postId = doc.id;
        const commentsCollectionRef = collection(
          db,
          "posts",
          postId,
          "comments"
        );
        const commentsQuerySnapshot = await getDocs(commentsCollectionRef);
        const comments = commentsQuerySnapshot.docs.map((commentDoc) =>
          commentDoc.data()
        );

        posts.push({ id: postId, data: postData, comments: comments });
      }

      setPosts(posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching posts:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Публікації",
      headerTitleAlign: "center",
      headerTitleStyle: styles.headerTitleStyle,
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
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.userImage} />
          ) : (
            <Feather name="user" size={24} color="black" />
          )}
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Post posts={posts} navigation={navigation} />
      )}
    </View>
  );
};
