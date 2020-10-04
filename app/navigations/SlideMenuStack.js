import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Egresos from "../screens/Egresos";
import Banco from "../screens/Banco";
import Ingresos from "../screens/Ingresos";
import SlideMenu from "../screens/SlideMenu";
import Tarjetas from "../screens/Tarjetas";
import Inversiones from "../screens/Inversiones";
import Prestamos from "../screens/Prestamos";
import Presupuesto from "../screens/Presupuesto";
import Opciones from "../screens/Opciones";

const Stack = createStackNavigator();

export default function SideBarMenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="slideMenu"
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="ingreso" component={Ingresos} />
      <Stack.Screen name="egresos" component={Egresos} />
      <Stack.Screen name="banco" component={Banco} />
      <Stack.Screen name="slideMenu" component={SlideMenu} />
      <Stack.Screen name="tarjetas" component={Tarjetas} />
      <Stack.Screen name="inversion" component={Inversiones} />
      <Stack.Screen name="prestamos" component={Prestamos} />
      <Stack.Screen name="presupuesto" component={Presupuesto} />
      <Stack.Screen name="opciones" component={Opciones} />
      {/* <Stack.Screen name="" */}
    </Stack.Navigator>
  );
}
