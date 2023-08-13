import React from "react";

import {
  Image,
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
import { SvgXml } from "react-native-svg";
import addSvg from "../../images/add.svg.js";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

export function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const registerForm = () => {
    dispatch(authSignUpUser({ email, password, login }));
    console.log({ login, email, password });
    setEmail("");
    setLogin("");
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
              marginBottom: isShowKeyboard ? -176 : 0,
            }}
          >
            <Image style={styles.image} />
            <TouchableOpacity style={styles.addButton}>
              <SvgXml xml={addSvg} width={25} height={25} />

              {/* <Image source={require("../images/add.png")} /> */}
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.listInput}>
                <TextInput
                  style={[
                    styles.input,
                    { marginBottom: 16 },
                    {
                      borderColor:
                        isActiveInput === "login" ? "#FF6C00" : "#E8E8E8",
                    },
                  ]}
                  value={login}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="default"
                  maxLength={20}
                  onChangeText={setLogin}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveInput("login");
                  }}
                  onBlur={keyboardHide}
                />
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
                    secureTextEntry={true}
                    maxLength={20}
                    onChangeText={setPassword}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsActiveInput("password");
                    }}
                    onBlur={keyboardHide}
                  />
                  <TouchableOpacity style={styles.buttonShow}>
                    <Text style={styles.buttonShowText}>Показати</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonRegisterBox}>
                    <TouchableOpacity
                      style={styles.buttonRegister}
                      onPress={registerForm}
                    >
                      <Text style={styles.buttonRegisterText}>
                        Зареєструватися
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
