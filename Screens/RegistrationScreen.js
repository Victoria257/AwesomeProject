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
import addSvg from "../images/add.svg.js";

export function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/bg.png")}
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
                  placeholder="Логін"
                  keyboardType="default"
                  maxLength={20}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveInput("login");
                  }}
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
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsActiveInput("email");
                  }}
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
                    placeholder="Пароль"
                    keyboardType="default"
                    secureTextEntry={true}
                    maxLength={20}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsActiveInput("password");
                    }}
                  />
                  <TouchableOpacity style={styles.buttonShow}>
                    <Text style={styles.buttonShowText}>Показати</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonRegisterBox}>
                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={keyboardHide}
                >
                  <Text style={styles.buttonRegisterText}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.loginText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
