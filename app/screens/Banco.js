import { preventAutoHide } from "expo/build/launch/SplashScreen";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-community/picker";
import { SwipeListView } from "react-native-swipe-list-view";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Ingresos({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cbu, setCbu] = useState("");
  const [cbucvupicker, setCBVUPicker] = useState([]);
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItemsEgresos, setFlatListItemsEgresos] = useState([]);
  const [nombreBanco, setNombreBanco] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cuentas (id INTEGER PRIMARY KEY AUTOINCREMENT,banco TEXT,cbucvu TEXT, tipo TEXT, nombre TEXT, apellido TEXT, tarjeta TEXT)"
    );
  });

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql("select * from cuentas", [], (tx, results) => {
          var temp = [];
          console.log("ResultsSelect Cuentas", results);
          1;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).cbucvu);
          }
          setCBVUPicker(temp);
        });
      });
    }
    componentDidMount();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql("select * from cuentas", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).cbucvu);
        }
        setCBVUPicker(temp);
        setRefreshing(false);
      });
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select banco from cuentas where cbucvu=?",
        [cbu],
        (tx, results) => {
          var temp = [];
          console.log("ResultsSelect Cuentas", results);
          1;
          var nombreBanco = "";
          for (let i = 0; i < results.rows.length; ++i) {
            nombreBanco = results.rows.item(i).banco;
          }
          setNombreBanco(nombreBanco);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select monto, tipoDeMedio, origen from ingresos where cuenta=?",
        [cbu],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select monto, tipoDeMedio, destino from egresos where cuenta=?",
        [cbu],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          setFlatListItemsEgresos(temp);
        }
      );
    });
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select banco from cuentas where cbucvu=?",
          [cbu],
          (tx, results) => {
            var temp = [];
            console.log("ResultsSelect Cuentas", results);
            1;
            var nombreBanco = "";
            for (let i = 0; i < results.rows.length; ++i) {
              nombreBanco = results.rows.item(i).banco;
            }
            setNombreBanco(nombreBanco);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  const deleteCuenta = (cbu) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM cuentas WHERE cbucvu=?",
        [cbu],
        console.log(cbu),
        Alert.alert("Exito!", "Se eliminó la cuenta bancaria"),
        console.log("se elimino correctamente la cuenta")
      );
    });
  };
  //---------------------------------------------------------------------------
  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select monto, tipoDeMedio, origen from ingresos where cuenta=?",
          [cbu],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
            setFlatListItems(temp);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  let listItemView = (ingresos) => {
    console.log(ingresos.monto);
    return (
      <View
        key={ingresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${ingresos.monto}</Text>
        <Text>Medio: {ingresos.tipoDeMedio}</Text>
        <Text>Origen: {ingresos.origen}</Text>
      </View>
    );
  };

  //---------------------------------------------------------------------------
  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select monto, tipoDeMedio, destino from egresos where cuenta=?",
          [cbu],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
            setFlatListItemsEgresos(temp);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  let listItemViewEgresos = (egresos) => {
    console.log(egresos.monto);
    return (
      <View
        key={egresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>Medio: {egresos.tipoDeMedio}</Text>
        <Text>Destino: {egresos.destino}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Icon
        name="chevron-down"
        style={{ ...styles.icon1, top: "4.5%" }}
        onPress={() => navigation.goBack()}
      >
        {" "}
        <Text style={styles.ingresos}>Cuentas Bancarias</Text>
      </Icon>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{ height: heightPercentageToDP("100%"), top: "12%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Picker
          style={{
            position: "relative",
            marginTop: "5%", //Cambiar esto para achicar el espacio de arriba
            marginBottom: 10,
            height: heightPercentageToDP("7%"),
            width: widthPercentageToDP("70%"),
            alignSelf: "center",
            backgroundColor: "white",
          }}
          mode="dropdown"
          selectedValue={cbu}
          onValueChange={(value) => setCbu(value)}
        >
          <Picker.Item label="Seleccione CBU/CVU" value=""></Picker.Item>
          {cbucvupicker.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index}></Picker.Item>
            );
          })}
        </Picker>
        <Text style={{ textAlign: "center", top: "1%", fontSize: 20 }}>
          {nombreBanco}
        </Text>

        <View style={styles.styleIngresosStack}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              left: "1%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("add-cuenta")}
              style={{
                ...styles.button1,
                left: "50%",
                width: widthPercentageToDP("40%"),
              }}
            >
              <Text style={styles.anadir2}>Añadir cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteCuenta(cbu)}
              style={{
                ...styles.button1,
                right: "52%",
                width: widthPercentageToDP("40%"),
              }}
            >
              <Text style={styles.anadir2}>Eliminar cuenta</Text>
            </TouchableOpacity>
          </View>
          <View style={{ top: "10%" }}>
            <Text style={{ ...styles.historialDe, left: "10%" }}>
              Historial de ingresos
            </Text>
            <View style={{ top: "0%" }}>
              <ScrollView
                style={{
                  top: "13%",
                }}
                horizontal={true}
              >
                <View
                  style={{ ...styles.container2, backgroundColor: "#ffde59" }}
                >
                  <SwipeListView
                    style={{
                      top: "0%",
                      width: widthPercentageToDP("200%"),
                    }}
                    horizontal={true}
                    data={flatListItems}
                    renderItem={({ item }) => listItemView(item)}
                    rightOpenValue={-180}
                    scrollEnabled={true}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={{ top: "20%" }}>
            <Text style={{ ...styles.historialDe, left: "10%" }}>
              Historial de egresos
            </Text>
            <View style={{ top: "0%" }}>
              <ScrollView
                style={{
                  top: "13%",
                }}
                horizontal={true}
              >
                <View
                  style={{ ...styles.container2, backgroundColor: "#ffde59" }}
                >
                  <SwipeListView
                    style={{
                      top: "0%",
                      width: widthPercentageToDP("200%"),
                    }}
                    horizontal={true}
                    data={flatListItemsEgresos}
                    renderItem={({ item }) => listItemViewEgresos(item)}
                    rightOpenValue={-180}
                    scrollEnabled={true}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
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
  image: { width: 30, height: 30, backgroundColor: "gray", left: "7%" },
  container2: {
    width: widthPercentageToDP("190%"),
    height: heightPercentageToDP("17%"),
    borderRadius: 20,
  },
  image: { width: 100, height: 100, backgroundColor: "gray", left: "7%" },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("100%"),
  },

  historialDe: {
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
  },
  button1: {
    height: heightPercentageToDP("7%"),
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
    alignSelf: "center",
  },
  icon1: {
    left: "4%",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
});

export default Ingresos;
