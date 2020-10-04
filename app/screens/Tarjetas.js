import { preventAutoHide } from "expo/build/launch/SplashScreen";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  RefreshControl,
  Alert,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-datepicker";

import Icon from "react-native-vector-icons/Feather";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-community/picker";
import { SwipeListView } from "react-native-swipe-list-view";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Tarjetas({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetapicker, setTarjetaPicker] = useState([]);

  const [totEgresoTarjeta, setTotalEgresoTarjeta] = useState("");

  //son los pickers
  const [cierre, setCierre] = useState("");
  const [vresumen, setVResumen] = useState(Date);
  const [vCierreResumen, setCierreResumen] = useState(Date);
  let [flatListItems, setFlatListItems] = useState([]);

  //son los de la base de datos que quiero mostrar para ver si cambio
  const [fechaVtoTarjeta, setfecha1] = useState("");
  const [fechaCierre, setfecha2] = useState("");
  const [fechaResumenVto, setfecha3] = useState("");

  const actualizarFechas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tarjetas SET fechaCierre=?, fechaVtoResumen=? where numero=?",
        [vresumen, vCierreResumen, tarjeta]
      );
    });
    Alert.alert("Exito!", "Se actualizaron las fechas");
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from tarjetas where numero=?",
          tarjeta,
          (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i) {
              setfecha1(results.rows.item(i).fechaVto);
              setfecha2(results.rows.item(i).fechaCierre);
              setfecha3(results.rows.item(i).fechaVtoResumen);
            }
            console.log(tarjeta);
            console.log(fechaVtoTarjeta, fechaCierre, fechaResumenVto);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from egresos where tarjeta=?",
          [tarjeta],
          (tx, results) => {
            var temp = [];
            1;
            var tot = 0;
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
              tot = tot + results.rows.item(i).monto;
            }
            setTotalEgresoTarjeta(tot);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql("select * from tarjetas", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i).numero);
        }
        setTarjetaPicker(temp);
        setRefreshing(false);
      });
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select monto, tarjeta, destino from egresos where tarjeta=?",
        [tarjeta],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select * from egresos where tarjeta=?",
        [tarjeta],
        (tx, results) => {
          var temp = [];
          1;
          var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          setTotalEgresoTarjeta(tot);
        }
      );
    });
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql("select * from tarjetas", [], (tx, results) => {
          var temp = [];
          1;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).numero);
          }
          setTarjetaPicker(temp);
        });
      });
    }
    componentDidMount();
  }, []);

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select * from tarjetas where numero=?",
          [tarjeta],
          (tx, results) => {
            1;
            for (let i = 0; i < results.rows.length; ++i) {
              console.log(
                "las fechas que leo: ",
                results.rows.item(i).fechaVto
              );
              console.log(
                "las fechas que leo: ",
                results.rows.item(i).fechaCierre
              );
              console.log(
                "las fechas que leo: ",
                results.rows.item(i).fechaVtoResumen
              );
            }
          }
        );
      });
    }
    componentDidMount();
  }, []);

  const deleteTarjeta = (tarjeta) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tarjetas WHERE numero=?",
        [tarjeta],
        console.log("se elimino correctamente la tarjeta"),
        Alert.alert("Exito!", "Se eliminó la tarjeta")
      );
    });
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql(
          "select monto, tarjeta, destino from egresos where tarjeta=?",
          [tarjeta],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            setFlatListItems(temp);
          }
        );
      });
    }
    componentDidMount();
  }, []);

  let listItemView = (egresos) => {
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
        <Text>Destino: {egresos.destino}</Text>
        <Text>Tarjeta: {egresos.tarjeta}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
        height: heightPercentageToDP("70%"),
        backgroundColor: "#ffde59",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View elevation={10} style={styles.styleIngresosStack}>
        <Picker
          style={{
            position: "relative",
            marginTop: "20%", //Cambiar esto para achicar el espacio de arriba
            marginBottom: 10,
            height: heightPercentageToDP("7%"),
            width: widthPercentageToDP("70%"),
            alignSelf: "center",
            borderRadius: 20,
            backgroundColor: "white",
          }}
          mode="dropdown"
          selectedValue={tarjeta}
          onValueChange={(value) => setTarjeta(value)}
        >
          <Picker.Item label="Seleccione una tarjeta" value=""></Picker.Item>
          {tarjetapicker.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index}></Picker.Item>
            );
          })}
        </Picker>

        <View style={{ alignSelf: "center", flexDirection: "row", top: "3%" }}>
          <Text style={{ fontSize: 25, color: "black" }}>
            Total egresos: ${totEgresoTarjeta}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            top: "15%",
            justifyContent: "space-between",
            left: "1%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("add-tarjeta")}
            style={{ ...styles.button1, left: "48%" }}
          >
            <Text style={styles.anadir2}>Añadir tarjeta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => deleteTarjeta(tarjeta)}
          >
            <Text style={styles.anadir2}>Eliminar tarjeta</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.historialIngresos}>Historial de gastos</Text>
        <View style={{ top: "10%" }}>
          <ScrollView style={{ top: "13%" }} horizontal={true}>
            <View style={styles.container2}>
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

        <View styl={styles.view}>
          <Text style={{ ...styles.historialIngresos, top: "35%" }}>
            Modificar Cierre
          </Text>
          <View style={styles.viewForm}>
            {/* <Text
              style={{
                marginTop: "10%",
                marginBottom: 0,
                height: 40,
                marginLeft: 10,
                marginRight: 3,
              }}
            >
              Ingrese el vencimiento de la tarjeta
            </Text> */}

            {/* <DatePicker
              style={{
                marginTop: 0,
                marginBottom: 4,
                height: 40,
                width: 200,
                marginLeft: 90,
                marginRight: 10,
              }}
              date={cierre}
              mode="date" //The enum of date, datetime and time
              placeholder={"MM-YYYY"}
              // placeholder={fechaVtoTarjeta}
              format="MM-YYYY"
              minDate="09-2020"
              maxDate="01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              selectedValue={cierre}
              onDateChange={(date) => setCierre(date)}
            /> */}
            <Text
              style={{
                marginTop: 15,
                marginBottom: 0,
                height: 40,
                marginLeft: 10,
                marginRight: 3,
              }}
            >
              Ingrese la fecha de cierre del resumen
            </Text>
            <DatePicker
              style={{
                marginTop: 0,
                marginBottom: 4,
                height: 40,
                width: 200,
                marginLeft: 90,
                marginRight: 10,
              }}
              date={vresumen}
              mode="date" //The enum of date, datetime and time
              // placeholder={fechaCierre}
              placeholder={"DD-MM-YYYY"}
              format="DD-MM-YYYY"
              minDate="01-09-2020"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              selectedValue={vresumen}
              onDateChange={(date) => setVResumen(date)}
            />
            <Text
              style={{
                marginTop: 15,
                marginBottom: 0,
                height: 40,
                marginLeft: 10,
                marginRight: 3,
              }}
            >
              Ingrese la fecha de vencimiento del resumen
            </Text>
            <DatePicker
              style={{
                marginTop: 0,
                marginBottom: 4,
                height: 40,
                width: 200,
                marginLeft: 90,
                marginRight: 10,
              }}
              date={vCierreResumen}
              mode="date" //The enum of date, datetime and time
              // placeholder={fechaResumenVto}
              placeholder={"DD-MM-YYYY"}
              format="DD-MM-YYYY"
              minDate="01-09-2020"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              selectedValue={vCierreResumen}
              onDateChange={(date) => setCierreResumen(date)}
            />
          </View>
          <View
            style={{
              width: widthPercentageToDP("60%"),
              alignSelf: "center",
              top: "10%",
            }}
          >
            <TouchableOpacity onPress={actualizarFechas} style={styles.button}>
              <Text style={styles.modificarTarjeta}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Icon
          name="chevron-down"
          style={styles.icon1}
          onPress={() => navigation.goBack()}
        >
          {" "}
          <Text style={styles.ingresos}> Tarjetas</Text>
        </Icon>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ingresos: {
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 30,
  },

  image: { width: 30, height: 30, backgroundColor: "gray", left: "7%" },
  container2: {
    backgroundColor: "#ffde59",
    width: widthPercentageToDP("190%"),
    height: heightPercentageToDP("17%"),
    borderRadius: 20,
  },
  image: { width: 100, height: 100, backgroundColor: "gray", left: "7%" },
  viewForm: {
    marginTop: "70%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
    height: heightPercentageToDP("40%"),
  },
  historialIngresos: {
    top: "23%",
    position: "absolute",
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    left: 16,
  },
  modificarTarjeta: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    marginTop: "7%",
    alignSelf: "center",
  },
  button: {
    width: widthPercentageToDP("60%"),
    height: heightPercentageToDP("8%"),
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: "4%",
    borderRadius: 20,
    marginBottom: "2%",
  },
  button1: {
    width: widthPercentageToDP("45%"),
    height: heightPercentageToDP("7%"),
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
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
    height: heightPercentageToDP("175%"),
    marginTop: 35,
  },
  icon1: {
    top: "0%",
    left: "4%",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
});

export default Tarjetas;
