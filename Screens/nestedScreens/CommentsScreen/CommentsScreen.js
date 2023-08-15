import React, { useEffect, useState } from "react";
import { Image, View, TextInput, FlatList, Keyboard, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from "../../../config";
import styles from "./CommentsScreenStyles";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { uri, postId } = route.params;
  const { login } = useSelector((state) => state.auth);

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
        <TouchableOpacity onPress={() => navigation.navigate("DefaultScreen")}>
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

  useEffect(() => {
    getAllComments();
  }, []);

  const onChangeComment = (text) => {
    setComment(text);
  };

  const onSendComment = () => {
    console.log("sendComment");
    Keyboard.dismiss();
    if (comment) {
      createPost({ comment, login });
      setComment("");
    } else console.log("sendComment - wrong");
  };

  const createPost = async (newComment) => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const newCommentDocRef = await addDoc(commentsCollectionRef, newComment);
      getAllComments();
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const getAllComments = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const snapshot = await getDocs(commentsCollectionRef);

      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: uri }} style={styles.photo} />

        <FlatList
          style={styles.listComments}
          keyExtractor={(item, index) => item.id}
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <View style={styles.user}></View>
              <View style={styles.commentContainer}>
                <Text style={styles.comment}>{item.data.comment}</Text>
                <Text style={styles.comment}>{item.data.login}</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>дата</Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>

        {/*FlatList- це замість ul та .map */}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={comment}
          placeholder="Коментувати..."
          placeholderTextColor={"#BDBDBD"}
          keyboardType="default"
          onChangeText={onChangeComment}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconArrow} onPress={onSendComment}>
            <AntDesign name="arrowup" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
