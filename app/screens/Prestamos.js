import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import ModalTiempo from "../components/Especiales/ModalTiempo";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Prestamos({ navigation }) {
  let [totalOtorgados, setTotalOtorgados] = useState();
  let [totalRecibidos, setTotalRecibidos] = useState();
  const [refreshing, setRefreshing] = useState(false);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS prestamos (id INTEGER PRIMARY KEY AUTOINCREMENT, rol TEXT, nombreActor TEXT, monto FLOAT,fechaVto DATE, tipoDeMedio TEXT, opcionOtro TEXT, cuenta TEXT)"
    );
  });

  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestatario'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          setTotalRecibidos(tot);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestamista'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          setTotalOtorgados(tot);
          setRefreshing(false);
        }
      );
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestamista'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          setTotalOtorgados(tot);
        }
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestatario'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          setTotalRecibidos(tot);
        }
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.icon1Row}>
        <Icon
          name="chevron-down"
          style={styles.icon1}
          onPress={() => navigation.goBack()}
        >
          {" "}
          Prestamos
        </Icon>
      </View>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollArea2_contentContainerStyle}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("add-prestamo")}
            style={{ ...styles.button4, top: "10%" }}
          >
            <Text style={styles.textoBotones}>Añadir prestamo</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: "100%",
              top: "20%",
              backgroundColor: "black",
            }}
          />
          <Text style={{ ...styles.otorgados, marginTop: "20%" }}>
            Otorgados
          </Text>
          <View
            elevation={10}
            style={{ ...styles.totIngresos, top: "10%" }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.valorTotal}>${totalOtorgados}</Text>
            <ModalTiempo></ModalTiempo>
          </View>
        </View>
        <Text style={{ ...styles.historial1, marginTop: "15%" }}>
          Historial de prestaciones:
        </Text>
        <View style={{ top: "1%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("historialOtorgados")}
            style={{
              ...styles.button4,
            }}
          >
            <Text style={styles.textoBotones}>Ver historial</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            top: "5%",
            backgroundColor: "black",
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            height: heightPercentageToDP("190%"),
          }}
        >
          <Text style={{ ...styles.otorgados, marginTop: "20%" }}>
            Recibidos
          </Text>
          <View
            elevation={10}
            style={{ ...styles.totIngresos, top: "6%" }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.valorTotal}>${totalRecibidos}</Text>
            <ModalTiempo></ModalTiempo>
          </View>
          <View style={{ height: "190%", top: "-7%" }}>
            <Text style={{ ...styles.historial1, marginTop: "25%" }}>
              Historial de recibidos
            </Text>
            <View style={{ top: "1%" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("historialRecibidos")}
                style={{
                  ...styles.button4,
                }}
              >
                <Text style={styles.textoBotones}>Ver historial</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textoBotones: {
    fontSize: 20,
    alignSelf: "center",
    top: "28%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("100%"),
  },
  scrollArea2_contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    paddingBottom: 10,
    height: "130%",
  },
  button4: {
    width: widthPercentageToDP("80%"),
    height: heightPercentageToDP("8%"),
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    alignSelf: "center",
  },
  otorgados: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    marginLeft: "10%",
  },
  totIngresos: {
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("12%"),
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
  },
  valorTotal: {
    top: "28%",
    left: "11%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 30,
  },
  icon1: {
    left: "6%",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    alignSelf: "center",
  },

  icon1Row: {
    height: heightPercentageToDP("7%"),
    flexDirection: "row",
    marginTop: "7%",
  },

  historial1: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    marginLeft: "10%",
  },
});

export default Prestamos;
