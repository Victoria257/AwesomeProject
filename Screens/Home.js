import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreatePostScreen } from "./mainScreens/CreatePostsScreen";
import { ProfileScreen } from "./mainScreens/ProfileScreen";
import { PostsScreen } from "./mainScreens/PostsScreen";
import { Image, StyleSheet, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useRoute,
} from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="grid" size={24} color={"#212121CC"} />;
          },
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostScreen}
        options={() => ({
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={
                  routeName === "Profile" ? styles.tabBarIcon : styles.focusIcon
                }
              >
                <Feather
                  name="plus"
                  size={24}
                  color={routeName === "Profile" ? "#212121CC" : "#FFFFFF"}
                />
              </View>
            );
          },
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View style={focused ? styles.focusIcon : styles.tabBarIcon}>
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#FFFFFF" : "#212121CC"}
                />
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  focusIcon: {
    backgroundColor: "orange",
    width: 70,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },

  tabBarIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
