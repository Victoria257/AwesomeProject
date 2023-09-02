import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

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
  ToastAndroid,
} from "react-native";

import { SvgXml } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import addSvg from "../../images/add.svg.js";

import { authSignUpUser } from "../../redux/auth/authOperations";
import styles from "./RegistrationAndLoginScreenStyles";

export function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonShowPress, setIsButtonShowPress] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onPressRegisterForm = async () => {
    if (!email || !password || !login) {
      showToast("Всі поля є обов'язкові!");
      return;
    }

    const registrationResult = await dispatch(
      authSignUpUser({ email, password, login, selectedImage })
    );
    console.log({ login, email, password });
    if (registrationResult.status === "success") {
      setEmail("");
      setLogin("");
      setPassword("");
      setSelectedImage(null);
    } else {
      showToast(registrationResult.message);
    }
  };

  const addPhoto = async () => {
    try {
      console.log("addPhoto");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      console.log("1");
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        console.log("result.assets[0].uri", result.assets[0].uri);
      } else console.log("result.canceled");
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const delPhoto = () => {
    console.log("push delButton");
    setSelectedImage(null);
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
            <Image
              source={{
                uri: selectedImage ? selectedImage : null,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={selectedImage ? delPhoto : addPhoto}
            >
              {selectedImage ? (
                <Feather
                  name="x-circle"
                  size={25}
                  color="#BDBDBD"
                  style={styles.delButton}
                />
              ) : (
                <SvgXml xml={addSvg} width={25} height={25} />
              )}

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
                  <View style={styles.buttonRegisterBox}>
                    <TouchableOpacity
                      style={styles.buttonRegister}
                      onPress={onPressRegisterForm}
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
