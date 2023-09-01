import React, { useEffect, useState } from "react";
import { View, Text, Keyboard, ToastAndroid } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { format } from "date-fns";

import styles from "./CreatePostsScreenStyles";
import OpenCamera from "../../Components/OpenCamera/OpenCamera";

import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

export const CreatePostScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [geoCode, setGeoCode] = useState("");
  const [location, setLocation] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatusLocation, setCurrentStatusLocation] = useState({});

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await onPermissionLocation();
    })();
  }, []);

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

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const onPermissionLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);
    setCurrentStatusLocation(status);
    if (status !== "granted") {
      showToast("Дозвіл на доступ до локації НЕ надано!");
      console.log("Permission to access location was denied");
      return;
    }
    console.log("location(onPermissionLocation)", location);

    await getLocation();
  };

  const getLocation = async () => {
    console.log("getLocation");
    let location = await Location.getCurrentPositionAsync({});
    console.log("location.coords", JSON.stringify(location.coords));

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geocode && geocode.length > 0) {
      setGeoCode(
        geocode[0].city + ", " + geocode[0].region + ", " + geocode[0].country
      );
    }

    setLocation(location);
  };

  const onChangeTitle = (text) => {
    setTitle(text);
  };

  const onChangeAddress = (text) => {
    setAddress(text);
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
    console.log("uploadPhotoToServer");
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `postsPhoto/${uniquePostId}`);
      const uploadTask = await uploadBytes(storageRef, file);

      const fileUrl = await getDownloadURL(storageRef); //отримує URL-адресу для завантаження завантаженого файлу з Firebase Storage. Цю URL-адресу можна використовувати для відображення або доступу до завантаженого файлу
      console.log("File uploaded successfully. URL:", fileUrl);
      const id = Date.now().toString();
      navigation.navigate("DefaultScreen", { postCreated: id });
      setIsLoading(false);
      createPost({
        photoURL: fileUrl,
        title,
        location: location.coords,
        userId,
        login,
        address,
        geoCode,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error uploading photo: ", error);
    }
  };

  const sendPhoto = async () => {
    console.log("sendPhoto");
    console.log("location", location);

    try {
      setIsLoading(true);
      setIsButtonPressed(true);

      if (location) {
        await uploadPhotoToServer();
        setPhoto("");
        setTitle("");
        setAddress("");
      } else console.log("no location");
    } catch (error) {
      console.error("Помилка при відправці фото на сервер:", error);
    } finally {
      setIsButtonPressed(false);
      setIsLoading(false);
    }
  };

  const delData = () => {
    setPhoto("");
    setTitle("");
    setAddress("");
  };

  return currentStatusLocation !== "granted" ? (
    <View>
      <Text>
        Ви не надали доступ до локаціїї, що є необхідним для додавання фото в
        галерею
      </Text>
      <TouchableOpacity onPress={onPermissionLocation()}>
        <Text> Надати дозвіл</Text>
      </TouchableOpacity>
    </View>
  ) : !location ? (
    <View>
      <Text>Відсутній доступ до локації</Text>
      <TouchableOpacity onPress={getLocation()}>
        <Text> Знайти локацію</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.photo}>
          <OpenCamera
            photo={photo}
            setPhoto={setPhoto}
            location={location}
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
              value={address}
              placeholder="Місцевість..."
              placeholderTextColor={"#BDBDBD"}
              keyboardType="default"
              onChangeText={onChangeAddress}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.formButton,
              (!photo || isButtonPressed) && styles.disabledButton,
            ]}
            onPress={sendPhoto}
            disabled={!photo || isButtonPressed}
          >
            <Text
              style={[
                styles.textButton,
                (!photo || isButtonPressed) && styles.disabledText,
              ]}
            >
              {isLoading ? "Завантажую..." : "Опубліковати"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isLoading && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.delete} onPress={delData}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
