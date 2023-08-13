import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { store } from "./redux/store";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Main } from "./Components/Main";

export default function App() {
  const [isReady, setIsReady] = useState(null);

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

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
