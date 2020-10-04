import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inversiones from "../screens/Inversiones";
import Home from "../screens/Home";
import AddInversion from "../screens/Inversiones/AddInversion";
import HistorialInversiones from "../components/Inversiones/HistorialInversiones";
const Stack = createStackNavigator();

export default function InversionesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="inversiones"
        component={Inversiones}
        // options={{ title: "Mis inversiones" }}
      />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="add-inversion"
        component={AddInversion}
        options={{ title: "Añadir" }}
      />
      <Stack.Screen
        name="historialInversiones"
        component={HistorialInversiones}
        // options={{ title: "Añadir" }}
      />
    </Stack.Navigator>
  );
}
