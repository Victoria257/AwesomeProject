import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nestedScreens/DefaultScreenPosts/DefaultScreenPosts";
import { CommentsScreen } from "../nestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen/MapScreen";

const NestedScreen = createStackNavigator();
export const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ tabBarVisible: false }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarVisible: false }}
      />
    </NestedScreen.Navigator>
  );
};
