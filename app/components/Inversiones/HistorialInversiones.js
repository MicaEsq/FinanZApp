import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

import { SwipeListView } from "react-native-swipe-list-view";

import * as SQLite from "expo-sqlite";
import { template } from "lodash";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos
const tot = 0;

export default function HistorialInversiones(props) {
  const { navigation } = props;
  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS inversiones (id INTEGER PRIMARY KEY AUTOINCREMENT, monto FLOAT, tipo TEXT,vtoPlazoFijo DATE, fecha DATE, origen TEXT, interes TEXT)"
      // "DROP TABLE IF EXISTS inversiones"
    );
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from inversiones", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          // console.log(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: "90%", backgroundColor: "#808080" }} />
    );
  };

  let listItemView = (inversiones) => {
    console.log(inversiones.id);
    // console.log(inversiones.detalle);
    // console.log(inversiones.origen);
    return (
      <View
        key={inversiones.id}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        {/* <ScrollView
          scrollEnabled={true}
          // key={ingresos.id}
          // style={{ backgroundColor: "white", padding: 20 }}
          // style={{ height: heightPercentageToDP("15%") }}
        > */}
        <Text style={{ fontSize: 30 }}>${inversiones.monto}</Text>
        <Text>
          Fecha: {inversiones.fecha}
          {"          "}Vto: {inversiones.vtoPlazoFijo}
        </Text>
        {/* <Text>Tipo: {ingresos.tipoDeMedio}</Text> */}
        <Text>
          Origen: {inversiones.origen}
          {"          "}Tipo: {inversiones.tipo}
        </Text>

        <Text>Interes: {inversiones.interes} %</Text>
        {/* <Text>Vto: {inversiones.vtoPlazoFijo}</Text> */}
        {/* </ScrollView> */}
      </View>
    );
  };

  const deleteRow = (ingresos, rowKey) => {
    // closeRow(rowMap, rowKey);
    const newData = [...flatListItems];
    const prevIndex = flatListItems.findIndex((item) => item.id === rowKey);
    // console.log("se elimino", rowKey);
    newData.splice(prevIndex, 1);
    setFlatListItems(newData);

    // let eliminarSQL = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM inversiones WHERE id=?",
        [rowKey],
        console.log("se elimino correctamente")
      );
    });
  };

  let renderHiddenItem = (inversiones, rowMap) => {
    return (
      <View style={styles.rowBack}>
        {/* <TouchableOpacity
          style={styles.modifyButton}
          // onPress={() => navigation.navigate("modifInversion")}
        >
          <Icon
            name="edit-3"
            style={styles.icon2}
            // onPress={() => navigation.navigate("home")}
            // onPress={() => navigation.goBack()}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRow(rowMap, inversiones.id)}
        >
          <Icon name="trash-2" style={styles.icon2} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#ffde59", flex: 1 }}>
      <View
        style={{
          // backgroundColor: "pin",
          height: heightPercentageToDP("10%"),
          top: "3%",
          // alignContent: "center",
        }}
      >
        <Icon
          name="chevron-down"
          style={styles.icon1}
          // onPress={() => navigation.navigate("home")}
          onPress={() => props.navigation.navigate("inversiones")}
        >
          {" "}
          <Text style={{ ...styles.ingresos }}>Historial de inversiones:</Text>
        </Icon>
      </View>
      <View style={styles.container}>
        <SwipeListView
          style={{
            top: "0%",
            width: widthPercentageToDP("100%"),
            // backgroundColor: "red",
          }}
          // scrollEnabled={true}
          data={flatListItems}
          renderItem={({ item }) => listItemView(item)}
          renderHiddenItem={({ item }) => renderHiddenItem(item)}
          rightOpenValue={-145}
          scrollEnabled={true}
          // leftOpenValue={150}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingresos: {
    // top: "6%",
    // marginLeft: "30%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    // left: "-6%",
    // alignSelf: "center",
    // paddingLeft: "%",
  },
  icon1: {
    top: "25%",
    left: "4%",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    // alignContent: "space-between",
    // paddingLeft: "3%",
  },
  trash: {
    height: 50,
    width: 50,
  },
  titulos: {
    top: "29%",
    // justifyContent: "space-between",
  },
  deleteButton: {
    alignSelf: "flex-end",
    width: 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginVertical: 3,
  },
  modifyButton: {
    alignSelf: "flex-end",
    width: 75,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    marginVertical: 3,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ffde59",
    flex: 1,
    // left: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 175,
  },
  icon2: {
    top: "40%",
    // left: 4,
    // position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // alignContent: "space-between",
    // paddingLeft: "3%",
    height: "100%",
  },

  container: {
    // flex: 1,
    // padding: "5%",
    // left: "2%",
    // paddingTop: "90%",
    backgroundColor: "#ffde59",
    // top: "10%",
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("80%"),
    borderRadius: 20,
    top: "5%",
    // alignSelf: "center",
    // alignContent: "center",
    // justifyContent: "center",
  },
  head: {
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("5%"),
    backgroundColor: "#ffde59",
    borderRadius: 20,
    // alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
  },
  dataWrapper: {
    marginTop: -1,
    // alignSelf: "center",
    // borderRadius: 20,
  },
  row: {
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("6%"),
    backgroundColor: "#F7F8FA",
    borderRadius: 20,
    // alignSelf: "center",
  },
});
