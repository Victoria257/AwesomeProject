import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen";

export default function App() {
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
    <View style={styles.container} fontFamily={fontFamily}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      {/* <PostsScreen /> */}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
