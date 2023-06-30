import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/Home";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoutes = (isAuth) => {
  //   if (!isAuth) {
  return (
    <>
      <AuthStack.Navigator
        initialRouteName="Login"
        // options={{ title: "Start screen" }}
        // style={styles.container}
        // fontFamily={fontFamily}
      >
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    </>
  );
  //   }
  //   return (
  //     <MainStack.Navigator>
  //       <MainStack.Screen name="Home" component={Home} />;
  //     </MainStack.Navigator>
  //   );
};
