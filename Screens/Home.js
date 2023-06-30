import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreatePostScreen } from "./mainScreens/CreatePostsScreen";
import { ProfileScreen } from "./mainScreens/ProfileScreen";
import { PostsScreen } from "./mainScreens/PostsScreen";
import { Image, StyleSheet, View } from "react-native";

const Tabs = createBottomTabNavigator();

const CustomTabBarIcon = ({ focused, iconName, route }) => {
  const isPostsTab = route.name === "Posts";
  const isCreatePostsTab = route.name === "CreatePosts";
  const isProfileTab = route.name === "Profile";
  let iconBackground;
  let iconOrder;

  if (isPostsTab) {
  } else if (isProfileTab) {
    iconBackground = focused ? "orange" : null;
    iconOrder = focused ? 1 : 2;
  }
  return (
    <View
      style={[
        styles.tabBarIcon,
        iconBackground && { backgroundColor: iconBackground },
        iconOrder && { order: iconOrder },
      ]}
    >
      <Image
        source={iconName}
        fadeDuration={0}
        style={{ width: 40, height: 40 }}
      />
    </View>
  );
};

export const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = require("../images/icons/toolbar.png");
          } else if (route.name === "CreatePosts") {
            iconName = require("../images/icons/plus2.png");
          } else if (route.name === "Profile") {
            iconName = focused
              ? require("../images/icons/user-focused-2.png")
              : require("../images/icons/user.png");
          }
          return (
            <CustomTabBarIcon
              focused={focused}
              iconName={iconName}
              route={route}
            />
          );
        },
        // tabBarStyle: {
        //   display: "flex",
        // },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    display: "flex",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabBarIcon: {
    width: 70,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
