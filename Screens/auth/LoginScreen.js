import React from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./RegistrationAndLoginScreenStyles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

export function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonShowPress, setIsButtonShowPress] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const enterForm = () => {
    dispatch(authSignInUser({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/bg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View
            style={{
              ...styles.contentContainer,
              marginBottom: isShowKeyboard ? -241 : 0,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                ...styles.scrollViewContent,
                height: 489,
              }}
            >
              <Text style={{ ...styles.title, marginTop: 32 }}>Увійти</Text>

              <View style={styles.listInput}>
                <TextInput
                  style={[
                    styles.input,
                    { marginBottom: 16 },
                    {
                      borderColor:
                        isActiveInput === "email" ? "#FF6C00" : "#E8E8E8",
                    },
                  ]}
                  value={email}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveInput("email");
                  }}
                  onBlur={keyboardHide}
                />
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          isActiveInput === "password" ? "#FF6C00" : "#E8E8E8",
                      },
                    ]}
                    value={password}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="default"
                    secureTextEntry={!isButtonShowPress}
                    maxLength={20}
                    onChangeText={setPassword}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsActiveInput("password");
                    }}
                    onBlur={keyboardHide}
                  />
                  <TouchableOpacity
                    style={styles.buttonShow}
                    onPress={() => setIsButtonShowPress(!isButtonShowPress)}
                  >
                    <Text style={styles.buttonShowText}>
                      {isButtonShowPress ? "Приховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonRegisterBox}>
                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={enterForm}
                >
                  <Text style={styles.buttonRegisterText}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.loginText}>
                  Немає акаунту?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Зареєструватися
                  </Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
