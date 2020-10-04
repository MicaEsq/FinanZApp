import React, { useState, useEffect } from "react";
import Navigation from "./app/navigations/Navigation";
import NavigationGuest from "./app/navigations/NavigationGuest.js";
// import { firebaseApp } from "./app/utils/firebase";
// import * as firebase from "firebase";
// import * as Font from "expo-font";
// import { AppLoading } from "expo";
import { YellowBox, LogBox } from "react-native";
import * as SQLite from "expo-sqlite";
//abrir BD
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos
//levantar tabla
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS inversiones (id INTEGER PRIMARY KEY AUTOINCREMENT, monto FLOAT, tipo TEXT,vtoPlazoFijo DATE, fecha DATE, origen TEXT, interes TEXT)"
    // "DROP TABLE IF EXISTS inversiones"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS prestamos (id INTEGER PRIMARY KEY AUTOINCREMENT, rol TEXT, nombreActor TEXT, monto FLOAT,fechaVto DATE, tipoDeMedio TEXT, opcionOtro TEXT, cuenta TEXT)"
    // "DROP TABLE IF EXISTS prestamos"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS ingresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, origen TEXT)"
    // "DROP TABLE IF EXISTS ingresos"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS tarjetas (id INTEGER PRIMARY KEY AUTOINCREMENT,banco TEXT,tipo TEXT, numero TEXT, fechaVto DATE, fechaCierre DATE, fechaVtoResumen DATE)"
    // "DROP TABLE IF EXISTS tarjetas"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    // "DROP TABLE IF EXISTS cuentas"
    "CREATE TABLE IF NOT EXISTS cuentas (id INTEGER PRIMARY KEY AUTOINCREMENT,banco TEXT,cbucvu TEXT, tipo TEXT, nombre TEXT, apellido TEXT, tarjeta TEXT)"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS egresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, cuotas TEXT, otros TEXT, destino TEXT, tarjeta TEXT, comprobante BLOB)"
    // "DROP TABLE IF EXISTS egresos"
  );
});
db.transaction((tx) => {
  tx.executeSql(
    // "DROP TABLE IF EXISTS presupuestos"
    "CREATE TABLE IF NOT EXISTS presupuestos (id INTEGER PRIMARY KEY AUTOINCREMENT, monto FLOAT, categoria TEXT)"
  );
});
export default function App() {
  const [login, setLogin] = useState(null);

  YellowBox.ignoreWarnings([
    "Animated: `useNativeDriver`",
    "Failed child context type: Invalid child context `virtualizedCell.cellKey` of type `number` supplied to `CellRenderer`, expected `string`.",
    "componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.",
    "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-community/datetimepicker",
    "VirtualizedLists should never be nested",
    "Require cycle: app\navigationsNavigation.js -> appscreensLogIn.js -> appcomponentsAccountLoginForm.js -> app\navigationsNavigation.js",
    "Require cycle: appscreensLogIn.js -> appcomponentsAccountLoginForm.js -> app\navigationsNavigationGuest.js -> appscreensLogIn.js",
    "Require cycle: app\navigationsNavigationGuest.js -> app\navigationsRegistrarseStack.js -> app\navigationsNavigationGuest.js",
    "Require cycle: app\navigationsNavigationGuest.js -> app\navigationsLogInStack.js -> app\navigationsNavigationGuest.js",
    "Require cycle: app\navigationsNavigation.js -> appscreensLogIn.js -> appcomponentsAccountLoginForm.js -> app\navigationsNavigationGuest.js -> app\navigationsLogInStack.js -> app\navigationsNavigation.js",
    "Require cycle: appscreensLogIn.js -> appcomponentsAccountLoginForm.js -> app\navigationsNavigationGuest.js -> app\navigationsLogInStack.js -> appscreensLogIn.js",
    "Require cycle: app\navigationsNavigation.js -> appscreensLogIn.js -> appcomponentsAccountLoginForm.js -> app\navigationsNavigationGuest.js -> app\navigationsRegistrarseStack.js -> app\navigationsNavigation.js",
    "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
    "VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.",
    "[Unhandled promise rejection: Invariant Violation: [2939,'RNSVGRect',1,{'fill':-22746,'propList':['fill'],'x':56.839999999999996,'y':'<<NaN>>','width':22.4,'height':'<<NaN>>','rx':0,'ry':0}] is not usable as a native method argument]",
  ]);
  return <Navigation />;
}
