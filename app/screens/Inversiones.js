import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Inversiones(props) {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = useState();
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS inversiones (id INTEGER PRIMARY KEY AUTOINCREMENT, monto FLOAT, tipo TEXT,vtoPlazoFijo DATE, fecha DATE, origen TEXT, interes TEXT)"
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.icon1Row}>
        <Icon
          name="chevron-down"
          style={styles.icon1}
          onPress={() => navigation.goBack()}
        >
          {" "}
          Inversiones
        </Icon>
      </View>
      <View>
        <Text style={{ ...styles.historialInv, top: "5%" }}>
          Añadir inversión:
        </Text>
        <View style={{ width: "100%", alignSelf: "center", top: "15%" }}>
          <TouchableOpacity
            style={{ ...styles.button1 }}
            onPress={() => props.navigation.navigate("add-inversion")}
          >
            <Text style={styles.anadirInversion}>Añadir inversión</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.historialInv, top: "35%" }}>
          Inversiones realizadas:
        </Text>
        <View style={{ width: "100%", alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("historialInversiones")}
            style={{
              ...styles.button1,
              top: "20%",
              marginTop: "5%",
            }}
          >
            <Text style={styles.anadirInversion}>Ver historial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historialInv: {
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    left: "6%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
  },
  icon1: {
    top: 0,
    left: 4,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  icon1Row: {
    height: 52,
    flexDirection: "row",
    marginTop: 35,
    marginLeft: 11,
    marginRight: 136,
  },
  button1: {
    width: "70%",
    height: "35%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    alignSelf: "center",
  },
  anadirInversion: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: "30%",
    alignSelf: "center",
  },
});

export default Inversiones;
