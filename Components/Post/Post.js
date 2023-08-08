import React from "react";
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styles from "./PostStyles.js";

export const Post = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.set}>
            <View>
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
        );
      }}
    ></FlatList>
  );
};
