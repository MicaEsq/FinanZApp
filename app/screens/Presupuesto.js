import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Input, Button } from "react-native-elements";
import Grafico from "../components/Grafico";
import { Picker } from "@react-native-community/picker";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

function Presupuesto(props) {
  const { toastRef, navigation } = props;
  const [monto, setMonto] = useState("");
  const [rubro, setRubro] = useState("");
  const [version, setVersion] = useState(0);
  const [actualizar, setActulizar] = useState(0);

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS presupuestos (id INTEGER PRIMARY KEY AUTOINCREMENT, monto FLOAT, categoria TEXT)"
    );
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setVersion(Math.random());
    });
    return unsubscribe;
  }, [actualizar]);

  const addPresupuesto = () => {
    if (!monto || !rubro) {
      Alert.alert("Todos los campos son obligatorios.");
    } else {
      console.log(monto);
      console.log(rubro);
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO presupuestos ( monto , categoria ) VALUES (?,?)",
          [monto, rubro],
          console.log(monto),
          console.log(rubro),
          Alert.alert("Exito!", "El presupuesto se añadió correctamente")
        );
      });
    }
  };
  const editPresupuesto = () => {
    var cc = 1;
    if (!monto || !rubro) {
      Alert.alert("Todos los campos son obligatorios.");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE presupuestos SET monto=? where categoria=?",
          [monto, rubro],
          Alert.alert("Exito!", "El presupuesto se modificó correctamente")
        );
      });
      cc = cc + actualizar;
      console.log(monto);
      console.log(rubro);
      console.log(cc);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Icon
          name="chevron-down"
          style={styles.icon}
          onPress={() => props.navigation.goBack()}
        ></Icon>
        <Text style={styles.text}>Presupuesto</Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#ffde59",
          height: heightPercentageToDP("100%"),
        }}
      >
        <View>
          <Text style={styles.anadirPresupuesto3}>Presupuesto vs Realidad</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              top: "-6%",
              width: widthPercentageToDP("90%"),
              height: heightPercentageToDP("50%"),
              alignSelf: "center",
            }}
          >
            <Grafico version={version} />
          </ScrollView>
          <Text style={styles.anadirPresupuesto2}>Añadir presupuesto:</Text>
          <View style={styles.rect1}>
            <Input
              inputContainerStyle={{ marginBottom: 10, marginTop: 9 }}
              keyboardType="numeric"
              placeholder="Ingrese el monto"
              onChange={(e) => setMonto(e.nativeEvent.text)}
            />
            <Picker
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 40,
                marginLeft: 10,
                marginRight: 10,
              }}
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={rubro}
              onValueChange={(value) => setRubro(value)}
            >
              <Picker.Item
                label="Seleccione el rubro/categoría"
                value=""
              ></Picker.Item>
              <Picker.Item label="Ingresos" value="ingresos"></Picker.Item>
              <Picker.Item label="Egresos" value="egresos"></Picker.Item>
              <Picker.Item
                label="Inversiones"
                value="inversiones"
              ></Picker.Item>
              <Picker.Item
                label="Prestamos Otorgados"
                value="prestamosOtorgados"
              ></Picker.Item>
              <Picker.Item
                label="Prestamos Recibidos"
                value="prestamosRecibidos"
              ></Picker.Item>
            </Picker>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={addPresupuesto} style={styles.button}>
              <Text style={styles.anadirPresupuesto}>Añadir presupuesto</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "normal",
              color: "#121212",
              fontSize: 25,
              marginTop: "3%",
              marginLeft: "6%",
            }}
          >
            Modificar presupuesto:
          </Text>
          <View style={styles.rect1}>
            <Input
              inputContainerStyle={{ marginBottom: 10, marginTop: 9 }}
              keyboardType="numeric"
              placeholder="Ingrese el monto"
              onChange={(e) => setMonto(e.nativeEvent.text)}
            />
            <Picker
              style={{
                marginTop: 10,
                marginBottom: 10,
                height: 40,
                marginLeft: 10,
                marginRight: 10,
              }}
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={rubro}
              onValueChange={(value) => setRubro(value)}
            >
              <Picker.Item
                label="Seleccione el rubro/categoría"
                value=""
              ></Picker.Item>
              <Picker.Item label="Ingresos" value="ingresos"></Picker.Item>
              <Picker.Item label="Egresos" value="egresos"></Picker.Item>
              <Picker.Item
                label="Inversiones"
                value="inversiones"
              ></Picker.Item>
              <Picker.Item
                label="Prestamos Otorgados"
                value="prestamosOtorgados"
              ></Picker.Item>
              <Picker.Item
                label="Prestamos Recibidos"
                value="prestamosRecibidos"
              ></Picker.Item>
            </Picker>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={editPresupuesto} style={styles.button}>
              <Text style={styles.anadirPresupuesto}>
                Modificar presupuesto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
  },
  anadirPresupuesto3: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    marginTop: "2%",
    marginLeft: "6%",
  },
  anadirPresupuesto2: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    marginTop: "-5%",
    marginLeft: "6%",
  },
  rect1: {
    width: "85%",
    height: 131,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 14,
    marginLeft: "6%",
    borderRadius: 20,
  },
  button: {
    width: widthPercentageToDP("60%"),
    height: heightPercentageToDP("8%"),
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: "4%",
    borderRadius: 20,
    marginBottom: "2%",
  },
  anadirPresupuesto: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    marginTop: "7%",
    alignSelf: "center",
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  text: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 30,
    top: "-3%",
    marginLeft: 16,
  },
  iconRow: {
    height: 40,
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "6%",
    marginRight: 127,
  },
});

export default Presupuesto;
