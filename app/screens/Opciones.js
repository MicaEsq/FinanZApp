import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import InfoUser from "../components/Account/InfoUser";
import AccountOptions from "../components/Account/AccountOptions";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.finanzDB");

export default function Opciones(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const toastRef = useRef();
  // const [ingresos, setIngresos] = useState([]);
  var array = [];
  var ingresos = [];
  var egresos = [];
  var cuentas = [];
  var inversiones = [];
  var prestamos = [];
  var presupuestos = [];
  var tarjetas = [];
  db.transaction((tx) => {
    tx.executeSql("select * from ingresos", [], (tx, results) => {
      ingresos = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from egresos", [], (tx, results) => {
      egresos = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from prestamos", [], (tx, results) => {
      prestamos = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from inversiones", [], (tx, results) => {
      inversiones = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from presupuestos", [], (tx, results) => {
      presupuestos = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from  cuentas", [], (tx, results) => {
      cuentas = results.rows._array;
    });
  });
  db.transaction((tx) => {
    tx.executeSql("select * from tarjetas", [], (tx, results) => {
      tarjetas = results.rows._array;
    });
  });
  const onSubmit = async () => {
    var ws = XLSX.utils.json_to_sheet(ingresos);
    var wse = XLSX.utils.json_to_sheet(egresos);
    var wt = XLSX.utils.json_to_sheet(inversiones);
    var wy = XLSX.utils.json_to_sheet(prestamos);
    var wu = XLSX.utils.json_to_sheet(presupuestos);
    var wi = XLSX.utils.json_to_sheet(tarjetas);
    var wo = XLSX.utils.json_to_sheet(cuentas);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ingresos");
    XLSX.utils.book_append_sheet(wb, wse, "Egresos");
    XLSX.utils.book_append_sheet(wb, wt, "Inversiones");
    XLSX.utils.book_append_sheet(wb, wy, "Préstamos");
    XLSX.utils.book_append_sheet(wb, wu, "Presupuestos");
    XLSX.utils.book_append_sheet(wb, wi, "Tarjetas");
    XLSX.utils.book_append_sheet(wb, wo, "Cuentas");
    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });
    const uri = FileSystem.cacheDirectory + "Finanz.xlsx";
    console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(uri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: "Select an option",
      UTI: "com.microsoft.excel.xlsx",
    });
  };

  return (
    // <View style={{backgroundColor: "#ffde59", }}>
    <View style={{ backgroundColor: "#ffde59", height: "100%" }}>
      <View style={styles.icon1Row}>
        <Icon
          name="chevron-down"
          style={styles.icon1}
          onPress={() => props.navigation.navigate("home")}
        >
          {" "}
          Excel
        </Icon>
      </View>
      {userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} />}
      <TouchableOpacity activeOpacity={0.95} style={styles.button1} onPress={onSubmit}>
        <Image
        source={require("../../assets/excel.png")}
        resizeMode="contain"
        style={styles.iconoBell}
        ></Image>
        <Text style={{fontSize: 20,
        fontWeight: 'bold', color: "white",left:"3%"}}>Exportar Datos</Text>
      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    // flex: 1,
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("100%"),
  },
  icon1Row: {
    height: 52,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 11,
    marginRight: 136,
  },
  iconoBell: {
    top: "30%",
    left: "0%",
    alignSelf: "center",
    position: "absolute",
    height: "40%",
    width: "40%",
  },
  icon1: {
    top: 0,
    left: 4,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  button1: {
    top: "40%",
    width: widthPercentageToDP("70%"),
    position: "absolute",
    backgroundColor: "#004d00",
    borderRadius: 20,
    left: "15%",
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP("10%")
  },
});
