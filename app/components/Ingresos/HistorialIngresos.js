import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";
import { SwipeListView } from "react-native-swipe-list-view";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

export default function HistorialIngresos(props) {
  const { navigation } = props;
  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS ingresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, origen TEXT)"
    );
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from ingresos", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  }, []);

  let listItemView = (ingresos) => {
    console.log(ingresos.id);
    return (
      <View key={ingresos.id} style={{ backgroundColor: "white", padding: 20 }}>
        <Text style={{ fontSize: 30 }}>${ingresos.monto}</Text>
        <Text>
          Fecha: {ingresos.fecha}
          {"          "}Tipo: {ingresos.tipoDeMedio}
        </Text>
        <Text>Cuenta: {ingresos.cuenta}</Text>
        <Text>Origen: {ingresos.origen}</Text>
      </View>
    );
  };

  const deleteRow = (ingresos, rowKey) => {
    const newData = [...flatListItems];
    const prevIndex = flatListItems.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setFlatListItems(newData);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM ingresos WHERE id=?",
        [rowKey],
        console.log("se elimino correctamente")
      );
    });
  };

  let renderHiddenItem = (ingresos, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRow(rowMap, ingresos.id)}
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
          height: heightPercentageToDP("10%"),
          top: "3%",
        }}
      >
        <Icon
          name="chevron-down"
          style={styles.icon1}
          onPress={() => props.navigation.navigate("ingresos")}
        >
          {" "}
          <Text style={styles.ingresos}> Historial de ingresos:</Text>
        </Icon>
      </View>
      <View style={styles.container}>
        <SwipeListView
          style={{ top: "0%", width: widthPercentageToDP("100%") }}
          data={flatListItems}
          renderItem={({ item }) => listItemView(item)}
          renderHiddenItem={({ item }) => renderHiddenItem(item)}
          rightOpenValue={-145}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingresos: {
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
  },
  icon1: {
    top: "25%",
    left: "4%",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },

  deleteButton: {
    alignSelf: "flex-end",
    width: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginVertical: 0,
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#ffde59",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 175,
  },
  icon2: {
    top: "40%",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },

  container: {
    backgroundColor: "#ffde59",
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("80%"),
    borderRadius: 20,
    top: "5%",
  },
  head: {
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("5%"),
    backgroundColor: "#ffde59",
    borderRadius: 20,
  },
});
