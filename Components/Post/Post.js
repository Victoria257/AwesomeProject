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
        return (
          <View style={styles.set}>
            <View>
              <Image source={{ uri: item.photo }} style={styles.photo} />
            </View>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.signatureContainer}>
                <TouchableOpacity
                  style={styles.commentsContainer}
                  onPress={() => {
                    console.log("Comments");
                    navigation.navigate("Comments", { uri: item.photo });
                  }}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={{ color: "#BDBDBD" }}>0</Text>
                </TouchableOpacity>
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
