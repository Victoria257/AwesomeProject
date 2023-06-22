import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import styles from "./RegistrationScreenStyles";

export function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <Image style={styles.image} />
          <TouchableOpacity style={styles.addButton}>
            <Image source={require("../images/add.png")} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.listInput}>
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                placeholder="Логін"
                keyboardType="default"
                maxLength={20}
              />
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
              />
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  keyboardType="default"
                  secureTextEntry={true}
                  maxLength={20}
                />
                <TouchableOpacity style={styles.buttonShow}>
                  <Text style={styles.buttonShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonRegisterBox}>
              <TouchableOpacity style={styles.buttonRegister}>
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
  );
}
