import React, { useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

import styles from "./CreatePostsScreenStyles";
import OpenCamera from "../../Components/OpenCamera/OpenCamera";

export const CreatePostScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [isActiveInput, setIsActiveInput] = useState(null);

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

  const onChangeTitle = (text) => {
    setTitle(text);
  };

  const onChangeLocation = (text) => {
    setLocation(text);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", {
      photo,
      title,
      location,
      latitude,
      longitude,
      address,
    });
    setPhoto("");
    setTitle("");
    setLocation("");
    setLatitude("");
    setLongitude("");
    setAddress("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.photo}>
          <OpenCamera
            photo={photo}
            setPhoto={setPhoto}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setAddress={setAddress}
            navigation={navigation}
          />
        </View>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={title}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              keyboardType="default"
              onChangeText={onChangeTitle}
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
              value={location}
              placeholder="Місцевість..."
              placeholderTextColor={"#BDBDBD"}
              keyboardType="default"
              onChangeText={onChangeLocation}
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
