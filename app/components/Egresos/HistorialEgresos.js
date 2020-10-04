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

export default function HistorialEgresos(props) {
  const { navigation } = props;
  const [image, setImage] = useState();
  let [flatListItems, setFlatListItems] = useState([]);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS egresos (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria TEXT, monto FLOAT, fecha DATE, tipoDeMedio TEXT, cuenta TEXT, cuotas TEXT, otros TEXT, destino TEXT, tarjeta TEXT,comprobante BLOB)"
    );
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from egresos", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          console.log(results.rows.item(i));
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

  let listItemView = (egresos) => {
    console.log(egresos.id);
    // console.log(egresos.comprobante);
    // const fileReaderInstance = new FileReader();
    // fileReaderInstance.readAsDataURL(egresos.comprobante);
    // fileReaderInstance.onload = () => {
    //   setImage(fileReaderInstance.result);
    //   console.log(image);
    //  }
    return (
      <View key={egresos.id} style={{ backgroundColor: "white", padding: 20 }}>
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>
          Fecha: {egresos.fecha}
          {"        "}Categoria: {egresos.categoria}
        </Text>
        <Text>
          Cuotas: {egresos.cuotas}
          {"                   "}Tipo: {egresos.tipoDeMedio}
        </Text>
        {/* <Text>Categoria: {egresos.categoria}</Text> */}
        {/* <Text>Tipo: {egresos.tipoDeMedio}</Text> */}
        <Text>
          Otros: {egresos.otros}
          {"         "}
          Cuenta: {egresos.cuenta}
        </Text>
        <Text>Nro Tarjeta: {egresos.tarjeta}</Text>

        {/* <Text>Cuenta: {egresos.cuenta}</Text> */}
        <Text>Destino: {egresos.destino}</Text>
        {/* <Image style={styles.image} source={{uri: image}}/> */}
      </View>
    );
  };

  // const eliminar = (id) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DELETE FROM ingresos WHERE id=?",
  //       [id]
  //       // (txObj, resultSet) => {
  //       //   if (resultSet.rowsAffected > 0) {
  //       //     let newList = this.state.data.filter((data) => {
  //       //       if (data.id === id) return false;
  //       //       else return true;
  //       //     });
  //       //     this.setState({ data: newList });
  //       //   }
  //       // }
  //     );
  //   });
  // };

  const deleteRow = (egresos, rowKey) => {
    // closeRow(rowMap, rowKey);
    const newData = [...flatListItems];
    const prevIndex = flatListItems.findIndex((item) => item.id === rowKey);
    console.log("se elimino", rowKey);
    newData.splice(prevIndex, 1);
    setFlatListItems(newData);

    // let eliminarSQL = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM egresos WHERE id=?",
        [rowKey],
        console.log("se elimino correctamente")
      );
    });
  };

  let renderHiddenItem = (egresos, rowMap) => {
    return (
      <View style={styles.rowBack}>
        {/* <TouchableOpacity
          style={styles.modifyButton}
          // onPress={() => navigation.navigate("add-ingreso")}
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
          onPress={() => deleteRow(rowMap, egresos.id)}
        >
          {/* <Text style={styles.deleteText}>Delete</Text> */}
          {/* <Image
                        source={require('../../assets/trash.png')}
                        style={styles.trash}
                    /> */}
          <Icon
            name="trash-2"
            style={styles.icon2}
            // onPress={() => navigation.navigate("home")}
            // onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#ffde59",
        flex: 1,
        // height: heightPercentageToDP("100%"),
      }}
    >
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
          onPress={() => props.navigation.navigate("egresos")}
        >
          {" "}
          <Text style={styles.ingresos}> Historial de egresos:</Text>
        </Icon>
      </View>
      <View style={styles.container}>
        <SwipeListView
          style={{ top: "0%", width: widthPercentageToDP("100%") }}
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
    // top: "76%",
    // marginLeft: "30%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
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
    // marginVertical: 3,
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

  image: { width: 30, height: 30, backgroundColor: "gray", left: "7%" },
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
  image: { width: 100, height: 100, backgroundColor: "gray", left: "7%" },
});
