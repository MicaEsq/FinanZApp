import { preventAutoHide } from "expo/build/launch/SplashScreen";
import React, { Component, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ModalTiempo from "../components/Especiales/ModalTiempo";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Ingresos({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  let [total, setTotal] = useState();
  const [refreshing, setRefreshing] = useState(false);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS ingresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, origen TEXT)"
    );
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from ingresos", [], (tx, results) => {
        var temp = [];
        var tot = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          tot = tot + results.rows.item(i).monto;
        }
        setTotal(tot);
      });
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql("select * from ingresos", [], (tx, results) => {
        var temp = [];
        var tot = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          tot = tot + results.rows.item(i).monto;
        }
        setTotal(tot);
        setRefreshing(false);
      });
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.styleIngresosStack}>
          <View>
            <View
              elevation={10}
              style={styles.totIngresos}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.valorTotal}>${total}</Text>
              <ModalTiempo></ModalTiempo>
            </View>
          </View>
          <Text style={{ ...styles.historialIngresos, top: "25%" }}>
            Añadir ingreso:
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("add-ingreso")}
              style={{
                ...styles.button1,
                marginTop: "45%",
                height: heightPercentageToDP("5%"),
              }}
            >
              <Text style={styles.anadir2}>Añadir nuevo ingreso</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ ...styles.historialIngresos, top: "45%" }}>
            Historial de ingresos:
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("historialIngresos")}
              style={{
                ...styles.button1,
                marginTop: "90%",
                height: heightPercentageToDP("0%"),
              }}
            >
              <Text style={styles.anadir2}>Ver historial</Text>
            </TouchableOpacity>
          </View>
          <Icon
            name="chevron-down"
            style={styles.icon1}
            onPress={() => navigation.goBack()}
          >
            {" "}
            <Text style={styles.ingresos}> Ingresos</Text>
          </Icon>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
    width: "100%",
    height: "100%",
  },
  totIngresos: {
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("12%"),
    backgroundColor: "white",
    borderRadius: 20,
    top: "85%",
    left: "2%",
  },
  valorTotal: {
    top: "28%",
    left: "11%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 30,
  },
  historialIngresos: {
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    left: 16,
  },
  ingresos: {
    marginLeft: "40%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 30,
  },
  button1: {
    left: "10%",
    width: widthPercentageToDP("70%"),
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  anadir2: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
  },

  styleIngresosStack: {
    width: 325,
    height: 720,
    marginTop: 35,
    marginLeft: 11,
  },
  icon1: {
    top: 0,
    left: 4,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    // alignContent: "space-between",
    // paddingLeft: "3%",
  },
});

export default Ingresos;
