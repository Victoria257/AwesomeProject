import React, { useState } from "react";
import { View, Text } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

import styles from "./PostsStyles";
import OpenCamera from "../../Components/OpenCamera";

export const CreatePostScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Створити публікацію",
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

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
    setPhoto("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.photo}>
          <OpenCamera
            photo={photo}
            setPhoto={setPhoto}
            navigation={navigation}
          />
        </View>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather
              style={styles.iconInput}
              name="map-pin"
              size={24}
              color="#BDBDBD"
            />
            <TextInput
              style={styles.input}
              placeholder="Місцевість..."
              placeholderTextColor={"#BDBDBD"}
            />
          </View>
          <TouchableOpacity style={styles.formButton} onPress={sendPhoto}>
            <Text style={styles.textButton}>Опубліковати</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.delete}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </View>
      </View>
    </View>
  );
};
