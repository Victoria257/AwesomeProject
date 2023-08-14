import React, { useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

import styles from "./CreatePostsScreenStyles";
import OpenCamera from "../../Components/OpenCamera/OpenCamera";

import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const createPost = async (newPostData) => {
    try {
      const newPostDocRef = await addDoc(collection(db, "posts"), newPostData);
      console.log("New post added with ID: ", newPostDocRef.id);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `postsPhoto/${uniquePostId}`);
      const uploadTask = await uploadBytes(storageRef, file);

      const fileUrl = await getDownloadURL(storageRef); //отримує URL-адресу для завантаження завантаженого файлу з Firebase Storage. Цю URL-адресу можна використовувати для відображення або доступу до завантаженого файлу
      console.log("File uploaded successfully. URL:", fileUrl);
      createPost({
        photoURL: fileUrl,
        title: "",
        location: "",
      });
      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log(`Upload progress: ${progress}%`);
      //   },
      //   (error) => {
      //     console.log("Error uploading photo: ", error);
      //   },
      //   async () => {
      //     // Upload completed successfully, get the download URL
      //     const fileUrl = await getDownloadURL(storageRef); //отримує URL-адресу для завантаження завантаженого файлу з Firebase Storage. Цю URL-адресу можна використовувати для відображення або доступу до завантаженого файлу
      //     console.log("File uploaded successfully. URL:", fileUrl);
      //     // Call the createPost function and pass the necessary data
      //     createPost({
      //       photo: file,
      //     });
      //   }
      // );
    } catch (error) {
      console.error("Error uploading photo: ", error);
    }
  };

  const sendPhoto = () => {
    uploadPhotoToServer();

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
