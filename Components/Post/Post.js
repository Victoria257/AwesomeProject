import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styles from "./PostStyles.js";

export const Post = ({ posts, navigation }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        const { id, data } = item;
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
                    navigation.navigate("Comments", { uri: data.photoURL });
                  }}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={{ color: "#BDBDBD" }}>0</Text>
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
                  <Text>{data.address ? data.address : data.geoCode}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
    ></FlatList>
  );
};
