import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Presupuesto from "../screens/Presupuesto";
import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function PresupuestoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="presupuesto"
        component={Presupuesto}
        // options={{ title: "Mi presupuesto" }}
      />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}
