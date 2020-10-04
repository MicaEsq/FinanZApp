import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Egresos from "../screens/Egresos";
import Banco from "../screens/Banco";
import { NavigationContainer } from "@react-navigation/native";
import AddCuenta from "../screens/Banco/AddCuenta";
import SlideMenu from "../screens/SlideMenu";
import OpPersonales from "../screens/Opciones";
import AddEgreso from "../screens/Egresos/AddEgreso";
import AddIngreso from "../screens/Ingresos/AddIngreso";
import Ingresos from "../screens/Ingresos";
import Tarjetas from "../screens/Tarjetas";
import AddTarjeta from "../screens/Tarjetas/AddTarjeta";
import AddPrestamo from "../screens/Prestamos/AddPrestamo";
import AddInversion from "../screens/Inversiones/AddInversion";
import HistorialIngresos from "../components/Ingresos/HistorialIngresos";
import HistorialInversiones from "../components/Inversiones/HistorialInversiones";
import HistorialOtorgados from "../components/Prestamos/HistorialOtorgados";
import HistorialRecibidos from "../components/Prestamos/HistorialOtorgados";
import HistorialEgresos from "../components/Egresos/HistorialEgresos";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="ingresos" component={Ingresos} />
      <Stack.Screen name="egresos" component={Egresos} />
      <Stack.Screen name="banco" component={Banco} />
      <Stack.Screen name="tarjetas" component={Tarjetas} />
      <Stack.Screen name="slideMenu" component={SlideMenu} />
      <Stack.Screen name="opciones" component={OpPersonales} />
      <Stack.Screen
        name="add-tarjeta"
        component={AddTarjeta}
        options={{ title: "Añadir nueva tarjeta" }}
      />

      <Stack.Screen
        name="add-inversion"
        component={AddInversion}
        options={{ title: "Añadir Inversion" }}
      />
      <Stack.Screen
        name="historialEgresos"
        component={HistorialEgresos}
        // options={{ title: "Añadir prestamo" }}
      />
      <Stack.Screen
        name="add-ingreso"
        component={AddIngreso}
        options={{ title: "Añadir nuevo ingreso" }}
      />
      <Stack.Screen
        name="add-egreso"
        component={AddEgreso}
        options={{ title: "Añadir egreso" }}
      />
      <Stack.Screen
        name="add-cuenta"
        component={AddCuenta}
        options={{ title: "Añadir cuenta bancaria" }}
      />
      <Stack.Screen
        name="add-prestamo"
        component={AddPrestamo}
        options={{ title: "Añadir prestamo" }}
      />
      <Stack.Screen name="historialIngresos" component={HistorialIngresos} />
      <Stack.Screen name="historialOtorgados" component={HistorialOtorgados} />
      <Stack.Screen name="historialRecibidos" component={HistorialRecibidos} />
    </Stack.Navigator>
  );
}
