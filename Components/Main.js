import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { useRoutes } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();

  const stateChange = useSelector((state) => state.auth.stateChange);
  const login = useSelector((state) => state.auth.login);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoutes(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
