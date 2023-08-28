import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TextInput,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { collection, getDocs, doc, addDoc } from "firebase/firestore";

import { db } from "../../../config";
import styles from "./CommentsScreenStyles";
import { CommentsUser } from "../../../Components/CommentsUser/CommentsUser";
import { CommentContainer } from "../../../Components/CommentContainer/CommentContainer";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { uri, postId } = route.params;
  const { login, photoURL } = useSelector((state) => state.auth);

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
    setIsLoading(true);
    console.log("sendComment");

    Keyboard.dismiss();
    if (comment) {
      createPost({ comment, login, photoURL });
      setComment("");
    } else {
      console.log("sendComment - wrong");
      setIsLoading(false);
      return;
    }
  };

  const createPost = async (newComment) => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");

      const commentWithTimestamp = { ...newComment, timestamp: new Date() };
      const newCommentDocRef = await addDoc(
        commentsCollectionRef,
        commentWithTimestamp
      );

      getAllComments();
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const getAllComments = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const snapshot = await getDocs(commentsCollectionRef);

      // const comments = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   data: doc.data(),
      // }));

      const comments = snapshot.docs
        .map((doc) => {
          const commentData = doc.data();
          const timestamp = commentData.timestamp.toDate();
          const formattedDate = format(
            commentData.timestamp.toDate(),
            "dd MMMM, yyyy | HH:mm"
          );
          return {
            id: doc.id,
            data: commentData,
            formattedDate: formattedDate,
            timestamp: timestamp,
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

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

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            style={styles.listComments}
            keyExtractor={(item, index) => item.id}
            data={comments}
            renderItem={({ item }) =>
              item.data.login !== login ? (
                <View style={styles.wrapper}>
                  <CommentsUser item={item} />
                  <CommentContainer item={item} />
                </View>
              ) : (
                <View style={styles.wrapper}>
                  <CommentContainer item={item} />
                  <CommentsUser
                    item={item}
                    style={{ marginLeft: 16, marginRight: 0 }}
                  />
                </View>
              )
            }
          ></FlatList>
        )}
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
