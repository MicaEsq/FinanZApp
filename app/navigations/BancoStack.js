import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Banco from "../screens/Banco";
import AddCuenta from "../screens/Banco/AddCuenta";

const Stack = createStackNavigator();

export default function BancoStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ingresos"
    >
      <Stack.Screen
        name="banco"
        component={Banco}
        options={{ title: "Banco" }}
      />
      <Stack.Screen
        name="add-cuenta"
        component={AddCuenta}
        options={{ title: "Añadir nueva cuenta" }}
      />
    </Stack.Navigator>
  );
}
