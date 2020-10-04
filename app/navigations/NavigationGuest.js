import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import LogIn from "../screens/LogIn";
import Registrarse from "../screens/Registrarse";

const Tab = createBottomTabNavigator();

export default function NavigationGuest({ navigation }) {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName="LogIn"
      tabBarOptions={{
        inactiveTintColor: "#646464",
        activeTintColor: "#00a680",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="login"
        component={LogIn}
        options={{ title: "Iniciar sesión" }}
      />
      <Tab.Screen
        name="registrarse"
        component={Registrarse}
        options={{ title: "Registrarse" }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "login":
      iconName = "login";
      break;
    case "registrarse":
      iconName = "account-arrow-right";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
