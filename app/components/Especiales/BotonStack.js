import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import FlechaBack from "./FlechaBack";
// import Home from "../../screens/Home";
import Opciones from "../../screens/Opciones";
import BotonCancelar from "./BotonCancelar";

const Stack = createStackNavigator();

export default function BotonStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="cerrar"
    >
      <Stack.Screen
        name="cerrar"
        component={BotonCancelar}
        // options={{ title: "Mis Egresos" }}
      />
      {/* <Stack.Screen name="home" component={Home} /> */}
      <Stack.Screen name="opciones" component={Opciones} />
    </Stack.Navigator>
  );
}
