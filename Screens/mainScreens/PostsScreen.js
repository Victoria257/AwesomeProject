import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Публікації",
      // headerStyle: styles.headerStyle,
      headerTitleAlign: "center",
      headerTitleStyle: styles.headerTitleStyle,
      //  headerStyle:{styles.headerStyle},
      // headerStyle:
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
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
          <Feather name="user" size={24} color="black" />
        </View>
        <View style={styles.userData}>
          <Text style={styles.userName}>Вікторія</Text>
          <Text style={styles.userEmail}>Email@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
            </View>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.signatureContainer}>
                <View style={styles.commentsContainer}>
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={{ color: "#BDBDBD" }}>0</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text>{item.location}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  // headerStyle: {
  //   backgroundColor: "orange",
  // },
  headerTitleStyle: {
    color: "#212121",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
  },
  item: {
    marginTop: 16,
    marginBottom: 18,
    marginLeft: "auto",
    marginRight: "auto",
  },
  photoContainer: {},
  photo: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 8,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#212121",
    // fontFamily: Roboto,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 700,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    // fontFamily: Roboto,
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 400,
  },
  userData: {
    marginLeft: 8,
  },

  title: {
    marginTop: 8,
    color: "#212121",
    // fontFamily: Roboto,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
  },
  signatureContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    marginRight: 25,
    color: "#BDBDBD",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
