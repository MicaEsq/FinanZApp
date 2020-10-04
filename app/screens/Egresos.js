import { preventAutoHide } from "expo/build/launch/SplashScreen";
import React, { Component, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ModalTiempo from "../components/Especiales/ModalTiempo";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import HistorialEgresos from "../components/Egresos/HistorialEgresos";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

function Egresos({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  let [total, setTotal] = useState(1);
  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS egresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, cuotas TEXT, otros TEXT, destino TEXT, tarjeta TEXT, comprobante BLOB)"
      // "DROP TABLE IF EXISTS egresos"
    );
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql("select * from egresos", [], (tx, results) => {
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

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql("select * from egresos", [], (tx, results) => {
          var temp = [];
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
            console.log(results.rows.item(i).monto);
          }
          setTotal(tot);
        });
      });
    }
    componentDidMount();
  }, []);

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

          <TouchableOpacity
            onPress={() => navigation.navigate("add-egreso")}
            style={{ ...styles.button1, height: heightPercentageToDP("10%") }}
          >
            <Text style={styles.anadir2}>Añadir nuevo Egreso</Text>
          </TouchableOpacity>
          <Text style={styles.historialIngresos}>Historial de egresos</Text>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("historialEgresos")}
              style={{
                ...styles.button1,
                marginTop: "70%",
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
            <Text style={styles.ingresos}> Egresos</Text>
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
    top: "80%",
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
    top: "35%",
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
    top: "23%",
    width: widthPercentageToDP("70%"),
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    left: "12%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  },
});

export default Egresos;
