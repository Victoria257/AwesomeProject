import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { collection, where, query, onSnapshot } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";

import { db } from "../../config";
import { authSignOutUser } from "../../redux/auth/authOperations";
import styles from "./ProfileScreenStyles";
import addSvg from "../../images/add.svg.js";

export function ProfileScreen({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  dispatch = useDispatch();
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));

    try {
      const unsubscribe = onSnapshot(q, (data) => {
        setUserPosts(
          data.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );

        console.log("Subscribed to user posts");
      });
    } catch (error) {
      console.error("Error fetching user posts:", error);
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
            <Image style={styles.image} />
            <TouchableOpacity style={styles.addButton}>
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
          <FlatList
            style={styles.list}
            data={userPosts}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => {
              const { id, data } = item;
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
                          <Feather
                            name="message-circle"
                            size={24}
                            color="#BDBDBD"
                          />
                          <Text style={{ color: "#BDBDBD" }}>0</Text>
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
                          <Feather name="thumbs-up" size={24} color="#BDBDBD" />
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
        </View>
      </ImageBackground>
    </View>
  );
}
