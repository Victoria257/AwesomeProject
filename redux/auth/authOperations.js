import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  StatusBar,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { auth, storage } from "../../config";
import { authSlice } from "./authSlice";
import { authSignOut } from "./authSlice";
import { useSelector } from "react-redux";

const showToast = (message) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
};

export const authSignUpUser =
  ({ email, password, login, selectedImage }) =>
  async (dispatch, getState) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        console.log("Користувач з такою адресою електронної пошти вже існує");
        showToast("Така електронна адреса в базі вже існує");
        return;
      }
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = auth.currentUser;
      if (selectedImage) {
        const response = await fetch(selectedImage);
        const photoBlob = await response.blob();
        const storageRef = ref(storage, `usersPhoto/${currentUser.uid}`);
        // Завантажуємо файл на сервер Firebase Storage
        const upload = await uploadBytes(storageRef, photoBlob);
        const imageUrl = await getDownloadURL(storageRef);
        const updateCurrentUser = auth.currentUser;
        await updateProfile(updateCurrentUser, {
          displayName: login,
          photoURL: imageUrl,
        });
        const updateUserSuccess = updateCurrentUser;
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: updateUserSuccess.uid,
            login: updateUserSuccess.displayName,
            email: updateUserSuccess.email,
            photoURL: updateUserSuccess.photoURL,
          })
        );
      }
      await updateProfile(currentUser, {
        displayName: login,
      });
      const updateUserSuccess = currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: updateUserSuccess.uid,
          login: updateUserSuccess.displayName,
          email: updateUserSuccess.email,
          photoURL: null,
        })
      );
      return { status: "success", message: "Ви успішно зареєструвалися!" };
    } catch (error) {
      console.log("error", error);
      return { status: "error", message: "Помилка реєстрації. Спробуйте ще." };
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      return user.user;
    } catch (error) {
      showToast("Невірний логін або пароль!");
      return;
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await signOut(auth);
      // await user.delete(); для видалення повністю з БД
      await dispatch(authSignOut());
      console.log("User signOut from Firebase.");
      showToast("Успішний вихід!");
    } else {
      showToast("Ви не ввійшли в додаток!");
      console.log("No user is currently signed in.");
    }
  } catch (error) {
    showToast("Помилка! Щось пішло не так!");
    console.log("error", error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadUserPhoto =
  (userId, photoBlob) => async (dispatch, getState) => {
    try {
      // Створюємо посилання на папку у Storage, де будуть зберігатися фотографії користувачів
      const storageRef = ref(storage, `usersPhoto/${userId}`);

      // Завантажуємо файл на сервер Firebase Storage

      const uploadTask = await uploadBytes(storageRef, photoBlob);

      const fileUrl = await getDownloadURL(storageRef);
      console.log("fileUrl", fileUrl);
      console.log("File uploaded successfully. URL:");
      const currentUser = auth.currentUser;
      console.log("currentUser(uploadUserPhoto)", currentUser);

      await updateProfile(currentUser, {
        photoURL: fileUrl,
      });

      const updateUserSuccess = auth.currentUser;

      console.log("updateUserSuccess", updateUserSuccess);

      dispatch(
        authSlice.actions.authStateAddPhoto({
          photoURL: updateUserSuccess.photoURL,
          userId: updateUserSuccess.uid,
          login: updateUserSuccess.displayName,
          email: updateUserSuccess.email,
        })
      );

      showToast("Фото успішно завантажено!");
    } catch (error) {
      console.log("error", error);
      showToast("Помилка. Спробуйте ще.");
    }
  };

export const deleteUserPhoto = (userId) => async (dispatch, getState) => {
  try {
    const storageRef = ref(storage, `usersPhoto/${userId}`);

    // Видалення фото з Firebase Storage
    await deleteObject(storageRef);

    // Оновлення посилання на фото у користувача та у Redux
    const currentUser = auth.currentUser;
    console.log("currentUser(deleteUserPhoto)", currentUser);

    await updateProfile(currentUser, {
      photoURL: null,
    });

    const updateCurrentUser = auth.currentUser;
    // console.log("updateCurrentUser(deleteUserPhoto)", updateCurrentUser);

    dispatch(authSlice.actions.authStateDelPhoto());

    showToast("Фото успішно видалено!");
  } catch (error) {
    console.log("error", error);
    showToast("Помилка. Спробуйте ще.");
  }
};
