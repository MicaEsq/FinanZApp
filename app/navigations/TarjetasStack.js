import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tarjetas from "../screens/Tarjetas";
import AddTarjeta from "../screens/Tarjetas/AddTarjeta";

const Stack = createStackNavigator();

export default function TarjetasStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="tarjetas"
    >
      <Stack.Screen name="tarjetas" component={Tarjetas} />
      <Stack.Screen
        name="add-tarjeta"
        component={AddTarjeta}
        options={{ title: "Añadir nueva tarjeta" }}
      />
    </Stack.Navigator>
  );
}
