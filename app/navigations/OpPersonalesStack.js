import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Opcion from "../screens/Opciones";

const Stack = createStackNavigator();

export default function OpPersonalesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="opcion"
        component={Opcion}
        options={{ title: "Opciones Personales" }}
      />
    </Stack.Navigator>
  );
}
