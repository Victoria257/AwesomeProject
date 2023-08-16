import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../config";
import { authSlice } from "./authSlice";
import { authSignOut } from "./authSlice";
import { useSelector } from "react-redux";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currentUser = auth.currentUser;
      console.log("currentUser(register)", currentUser);

      await updateProfile(currentUser, {
        displayName: login,
      });

      const updateUserSuccess = auth.currentUser;
      console.log(updateUserSuccess.uid);
      console.log(updateUserSuccess.displayName);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: updateUserSuccess.uid,
          login: updateUserSuccess.displayName,
          email: updateUserSuccess.email,
        })
      );
    } catch (error) {
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      return user.user;
    } catch (error) {
      throw error;
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
    } else {
      console.log("No user is currently signed in.");
    }

  } catch (error) {
    console.log(error);
    throw error;
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
          })
        );
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(error);
  }
};
