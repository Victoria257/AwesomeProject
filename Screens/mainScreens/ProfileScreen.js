import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  collection,
  where,
  query,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import { Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

import { authSlice } from "../../redux/auth/authSlice";
import { auth, db, storage } from "../../config";
import {
  authSignOutUser,
  uploadUserPhoto,
} from "../../redux/auth/authOperations";
import styles from "./ProfileScreenStyles";
import addSvg from "../../images/add.svg.js";
import { ActivityIndicator } from "react-native";
import MessageCircleIcon from "../../Components/MessageCircleIcon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const { userId, login, photoURL } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));

    try {
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const userPosts = [];

        for (const doc of querySnapshot.docs) {
          const postData = doc.data();
          const postId = doc.id;

          // Отримуємо коментарі для кожного поста
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

          userPosts.push({ id: postId, data: postData, comments: comments });
        }

        const userPostsSort = userPosts.sort(
          (a, b) => b.data.timestamp - a.data.timestamp
        );
        setUserPosts(userPostsSort);
        setIsLoading(false);
        console.log("Subscribed to user posts");
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user posts:", error);
    }
  };

  const addPhoto = async () => {
    try {
      // код для вибору зображення з галереї або камери.
      //const result = await ImagePicker.launchCameraAsync  - для селфі
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      // Перевірка на успішний вибір зображення
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);

        const response = await fetch(result.assets[0].uri);
        const photoBlob = await response.blob();

        dispatch(uploadUserPhoto(userId, photoBlob));
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../images/bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: photoURL ? photoURL : selectedImage ? selectedImage : null,
              }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.addButton} onPress={addPhoto}>
              <SvgXml xml={addSvg} width={25} height={25} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              dispatch(authSignOutUser());
            }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <View style={styles.viewContent}>
          <Text style={styles.userName}>{login}</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : userPosts.length < 1 ? (
            <View style={styles.plug}>
              <Text style={styles.plugText}>Ви ще не додали жодного фото.</Text>
              <Text style={styles.plugText}> Саме час почати.</Text>
            </View>
          ) : (
            <FlatList
              style={styles.list}
              data={userPosts}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => {
                const { id, data, comments } = item;
                const commentsLength = comments.length;
                return (
                  <View style={styles.set}>
                    <View>
                      <Image
                        source={{ uri: data.photoURL }}
                        style={styles.photo}
                      />
                    </View>
                    <View>
                      <Text style={styles.title}>{data.title}</Text>
                      <View style={styles.signatureContainer}>
                        <View style={styles.signatureLeftContainer}>
                          <TouchableOpacity
                            style={styles.commentsContainer}
                            onPress={() => {
                              navigation.navigate("Comments", {
                                uri: data.photoURL,
                                postId: id,
                              });
                            }}
                          >
                            <MessageCircleIcon
                              size={24}
                              color={commentsLength > 0 ? "#FF6C00" : null}
                              borderColor={
                                commentsLength > 0 ? null : "#BDBDBD"
                              }
                            />

                            <Text style={{ color: "#BDBDBD" }}>
                              {commentsLength}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.likesContainer}
                            onPress={() => {
                              navigation.navigate("Comments", {
                                uri: data.photoURL,
                                postId: id,
                              });
                            }}
                          >
                            <Feather
                              name="thumbs-up"
                              size={24}
                              color="#BDBDBD"
                            />
                            <Text style={{ color: "#BDBDBD" }}>0</Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={styles.locationContainer}
                          onPress={() => {
                            navigation.navigate("Map", {
                              latitude: data.location.latitude,
                              longitude: data.location.longitude,
                            });
                          }}
                        >
                          <Feather name="map-pin" size={24} color="#BDBDBD" />
                          <Text>
                            {data.address ? data.address : data.geoCode}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            ></FlatList>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
