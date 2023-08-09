import React, { useState } from "react";
import { Image, View, TextInput, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";

import styles from "./CommentsScreenStyles";
import { Text } from "react-native";
import { ScrollView } from "react-native";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { uri } = route.params;
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

  const onChangeComment = (text) => {
    setComment(text);
  };

  const onSendComment = () => {
    comment && setComments((prevState) => [...prevState, comment]);
    console.log(comment);
    setComment("");
    console.log(comments);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: uri }} style={styles.photo} />

        <FlatList
          style={styles.listComments}
          keyExtractor={(item, index) => index.toString()}
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <View style={styles.user}></View>
              <View style={styles.commentContainer}>
                <Text style={styles.comment}>{item}</Text>
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
