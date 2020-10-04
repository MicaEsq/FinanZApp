import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Egresos from "../screens/Egresos";
import Home from "../screens/Home";
import AddEgreso from "../screens/Egresos/AddEgreso";
import HistorialEgresos from "../components/Egresos/HistorialEgresos";

const Stack = createStackNavigator();

export default function EgresosStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="egresos"
    >
      <Stack.Screen
        name="egresos"
        component={Egresos}
        options={{ title: "Mis Egresos" }}
      />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="add-egreso"
        component={AddEgreso}
        options={{ title: "Añadir" }}
      />
      <Stack.Screen
        name="historialEgresos"
        component={HistorialEgresos}
        options={{ title: "Historial de Egresos" }}
      />
    </Stack.Navigator>
  );
}
