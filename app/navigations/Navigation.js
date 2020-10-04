import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import BancoStack from "./BancoStack";
import TarjetasStack from "./TarjetasStack";
import IngresosStack from "./IngresosStack";
import EgresosStack from "./EgresosStack";
import HomeStack from "./HomeStack";
import PrestamosStack from "./PrestamosStack";
import InversionesStack from "./InversionesStack";
import SlideMenuStack from "./SlideMenuStack";
import PresupuestoStack from "./PresupuestoStack";
import OpPersonalesStack from "./OpPersonalesStack";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import Registrarse from "../screens/Registrarse";
import LogIn from "../screens/LogIn";

import NavigationGuest from "./NavigationGuest";

// const Tab = createBottomTabNavigator();

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="start"
      >
        <Stack.Screen name="start" component={NavigationGuest} />

        {/* <Stack.Screen name="registrarse" component={Registrarse} /> */}
        {/* <Stack.Screen name="login" component={LogIn} /> */}
        <Stack.Screen name="home" component={HomeStack} />
        <Stack.Screen name="ingreso" component={IngresosStack} />
        <Stack.Screen name="egresos" component={EgresosStack} />
        <Stack.Screen name="banco" component={BancoStack} />
        <Stack.Screen name="slideMenu" component={SlideMenuStack} />
        <Stack.Screen name="tarjeta" component={TarjetasStack} />
        <Stack.Screen name="inversion" component={InversionesStack} />
        <Stack.Screen name="prestamos" component={PrestamosStack} />
        <Stack.Screen name="presupuesto" component={PresupuestoStack} />
        <Stack.Screen name="opciones" component={OpPersonalesStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "tarjetas":
      iconName = "credit-card-plus-outline";
      break;
    case "ingresos":
      iconName = "cash-multiple";
      break;
    case "egresos":
      iconName = "cash-refund";
      break;
    case "inversion":
      iconName = "sack-percent";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
