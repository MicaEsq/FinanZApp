import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ingresos from "../screens/Ingresos";
import Home from "../screens/Home";
import AddIngreso from "../screens/Ingresos/AddIngreso";
import HistorialIngresos from "../components/Ingresos/HistorialIngresos";
const Stack = createStackNavigator();

export default function IngresosStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ingresos"
    >
      <Stack.Screen
        name="ingresos"
        component={Ingresos}
        options={{ title: "ingresos" }}
      />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="add-ingreso"
        component={AddIngreso}
        options={{ title: "Añadir nuevo ingreso" }}
      />
      <Stack.Screen
        name="historialIngresos"
        component={HistorialIngresos}
        options={{ title: "Historial de Ingresos" }}
      />
    </Stack.Navigator>
  );
}
