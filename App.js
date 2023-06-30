import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useRoutes } from "./router";

export default function App() {
  const routing = useRoutes(null);
  const [fontsLoaded, error] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (error) {
    console.log(error);
    return null;
  }

  if (!fontsLoaded) {
    console.log("not-roboto");
    return null;
  } else console.log("roboto");

  const fontFamily = fontsLoaded ? "Roboto-Medium" : "sans-serif";

  return <NavigationContainer>{routing}</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
