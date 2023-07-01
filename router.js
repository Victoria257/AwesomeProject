import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/Home";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Register" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator
      screenOptions={{
        headerLeft: null,
        headerTitle: null,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};
