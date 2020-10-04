import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Prestamos from "../screens/Prestamos";
import Home from "../screens/Home";
import AddPrestamo from "../screens/Prestamos/AddPrestamo";
import HistorialOtorgados from "../components/Prestamos/HistorialOtorgados";
import HistorialRecibidos from "../components/Prestamos/HistorialRecibidos";

const Stack = createStackNavigator();

export default function PrestamosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="prestamos"
        component={Prestamos}
        // options={{ title: "Mis inversiones" }}
      />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="add-prestamo"
        component={AddPrestamo}
        options={{ title: "Añadir prestamo" }}
      />
      <Stack.Screen
        name="historialOtorgados"
        component={HistorialOtorgados}
        // options={{ title: "Añadir prestamo" }}
      />
      <Stack.Screen
        name="historialRecibidos"
        component={HistorialRecibidos}
        // options={{ title: "Añadir prestamo" }}
      />
    </Stack.Navigator>
  );
}
