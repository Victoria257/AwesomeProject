import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styles from "./PostStyles.js";
import MessageCircleIcon from "../MessageCircleIcon.js";

export const Post = ({ posts, navigation }) => {
  const sortedPosts = posts.sort((a, b) => b.data.timestamp - a.data.timestamp);
  return (
    <FlatList
      data={sortedPosts}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => {
        const { id, data, comments } = item;
        const commentsLength = comments.length;
        return (
          <View style={styles.set}>
            <View>
              <Image source={{ uri: data.photoURL }} style={styles.photo} />
            </View>
            <View>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.signatureContainer}>
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
                    borderColor={commentsLength > 0 ? null : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      color: commentsLength > 0 ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {commentsLength}
                  </Text>
                </TouchableOpacity>
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
                  <Text style={styles.location}>
                    {data.address ? data.address : data.geoCode}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
    ></FlatList>
  );
};
