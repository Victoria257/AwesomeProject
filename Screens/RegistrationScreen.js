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

import styles from "./RegistrationScreenStyles";
import { useState } from "react";
import { SvgXml } from "react-native-svg";
import addSvg from "../images/add.svg";

export function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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
                  style={[styles.input, { marginBottom: 16 }]}
                  placeholder="Логін"
                  keyboardType="default"
                  maxLength={20}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
                <TextInput
                  style={[styles.input, { marginBottom: 16 }]}
                  placeholder="Адреса електронної пошти"
                  keyboardType="email-address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                />
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    keyboardType="default"
                    secureTextEntry={true}
                    maxLength={20}
                    onFocus={() => {
                      setIsShowKeyboard(true);
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
