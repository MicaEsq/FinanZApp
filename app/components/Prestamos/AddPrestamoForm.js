import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { set, size } from "lodash";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

export default function AddPrestamoForm(props) {
  const { toastRef, navigation } = props;
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [medio, setMedio] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [tipo, setTipo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [otros, setOtros] = useState("");
  const [visible, setVisible] = useState(false);

  const [cbucvupicker, setCBVUPicker] = useState([]);

  const addPrestamo = () => {
    {
      if (!medio) {
        toastRef.current.show("Todos los campos son obligatorios.");
      } else if (medio == "Cuenta Banco") {
        if (!cantidad || !fecha || !tipo || !detalle) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show(
            "Ingrese únicamente números en el campo cantidad"
          );
        } else if (medio == "Efectivo" && cuenta !== "") {
          toastRef.current.show("No debe seleccionar una cuenta");
          setCuenta("");
        } else if (medio == "otro" && cuenta !== "") {
          toastRef.current.show("No debe seleccionar una cuenta");
          setCuenta("");
        } else if (medio !== "otro" && otros !== "") {
          toastRef.current.show("No debe detallar el tipo de medio");
          setOtros("");
        } else if (medio == "otro" && otros == "") {
          toastRef.current.show("Debe detallar el tipo de medio");
        } else if (medio == "Cuenta Banco" && cuenta == "") {
          toastRef.current.show("Debe seleccionar una cuenta");
        } else {
          console.log(cantidad);
          console.log(fecha);
          console.log(medio);
          console.log(cuenta);
          console.log(tipo);
          console.log(detalle);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO prestamos (rol,nombreActor, monto , fechaVto , tipoDeMedio , opcionOtro , cuenta ) VALUES (?,?,?,?,?,?)",
              [tipo, detalle, cantidad, fecha, otros, medio, cuenta],
              console.log(tipo, detalle),
              // if()
              Alert.alert("Exito!", "El prestamo se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      } else {
        if (!cantidad || !fecha || !tipo || !detalle) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show(
            "Ingrese únicamente números en el campo cantidad"
          );
        } else if (medio == "Efectivo" && cuenta !== "") {
          toastRef.current.show("No debe seleccionar una cuenta");
          setCuenta("");
        } else if (medio == "otro" && cuenta !== "") {
          toastRef.current.show("No debe seleccionar una cuenta");
          setCuenta("");
        } else if (medio !== "otro" && otros !== "") {
          toastRef.current.show("No debe detallar el tipo de medio");
          setOtros("");
        } else if (medio == "otro" && otros == "") {
          toastRef.current.show("Debe detallar el tipo de medio");
        } else if (medio == "Cuenta Banco" && cuenta == "") {
          toastRef.current.show("Debe seleccionar una cuenta");
        } else {
          console.log(cantidad);
          console.log(fecha);
          console.log(medio);
          console.log(cuenta);
          console.log(tipo);
          console.log(detalle);
          console.log(otros);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO prestamos (rol,nombreActor, monto , fechaVto , tipoDeMedio , opcionOtro , cuenta ) VALUES (?,?,?,?,?,?,?)",
              [tipo, detalle, cantidad, fecha, medio, otros, cuenta],
              //console.log(tipo, detalle),

              // if()
              Alert.alert("Exito!", "El prestamo se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      }
    }
  };
  const doMatch = () => {
    if (medio !== "otro") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql("select * from cuentas", [], (tx, results) => {
          var temp = [];
          console.log("ResultsSelect Cuentas", results);
          1;
          // var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).cbucvu);
            // tot = tot + results.rows.item(i).monto;
            console.log(results.rows.item(i).cbucvu);
          }
          setCBVUPicker(temp);
          // setFlatListItems(temp);
        });
      });
    }
    componentDidMount();
  }, []);

  return (
    <View style={styles.viewForm}>
      <ScrollView style={styles.scrollView}>
        <Picker
          style={{
            marginTop: 30,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
          }}
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={tipo}
          onValueChange={(value) => setTipo(value)}
        >
          <Picker.Item
            label="Seleccione su rol en el préstamo"
            value=""
          ></Picker.Item>
          <Picker.Item label="Prestatario" value="Prestatario"></Picker.Item>
          <Picker.Item label="Prestamista" value="Prestamista"></Picker.Item>
        </Picker>
        <Text
          style={{
            marginTop: 5,
            marginBottom: 5,
            height: 40,
            marginLeft: 10,
            marginRight: 3,
            color: "red",
          }}
        >
          En caso de haber seleccionado Prestatario detalle a continuación quién
          es el Prestamista, o viceversa.
        </Text>
        <Input
          style={{
            marginTop: 8,
            height: 40,
            marginLeft: 0,
            marginRight: 5,
          }}
          placeholder="Ingrese el prestamista o prestatario"
          onChange={(e) => setDetalle(e.nativeEvent.text)}
        />
        <Input
          style={{
            marginTop: 8,
            height: 40,
            marginLeft: 0,
            marginRight: 5,
          }}
          placeholder="Ingrese el monto ($ARG)"
          keyboardType="numeric"
          onChange={(e) => setCantidad(e.nativeEvent.text)}
        />
        <Text
          style={{
            marginTop: 15,
            height: 40,
            marginLeft: 10,
            marginRight: 3,
          }}
        >
          Ingrese la fecha de vencimiento del prestamo
        </Text>
        <DatePicker
          style={{
            marginTop: 8,
            height: 40,
            width: 200,
            marginLeft: 110,
            marginRight: 10,
          }}
          date={fecha}
          mode="date" //The enum of date, datetime and time
          placeholder="Seleccione una fecha"
          format="DD-MM-YYYY"
          minDate="01-09-2020"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          selectedValue={fecha}
          onDateChange={(date) => setFecha(date)}
        />
        <Picker
          style={{
            marginTop: 30,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
          }}
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={medio}
          onValueChange={(value) => {
            setMedio(value);
            {
              doMatch();
            }
          }}
        >
          <Picker.Item
            label="Seleccione el tipo de medio"
            value=""
          ></Picker.Item>
          <Picker.Item label="Efectivo" value="Efectivo"></Picker.Item>
          <Picker.Item
            label="Transferencia/Deposito"
            value="Transf./Deposito"
          ></Picker.Item>
          <Picker.Item label="Otros(*)" value="Otro"></Picker.Item>
        </Picker>
        <Text
          style={{
            marginTop: 15,
            height: 40,
            marginLeft: 10,
            marginRight: 3,
          }}
        >
          (*)Detalle más si eligió Otros:
        </Text>
        <Input
          style={{
            height: 40,
            marginLeft: 0,
            marginRight: 5,
          }}
          editable={visible ? true : false}
          placeholder="Detalle aquí..."
          onChange={(e) => setOtros(e.nativeEvent.text)}
        />
        <Text
          style={{
            marginTop: 5,
            marginBottom: 5,
            height: 40,
            marginLeft: 10,
            marginRight: 3,
            color: "red",
          }}
        >
          En caso de haber seleccionado en el tipo de medio
          Transferencia/Deposito, seleccione una cuenta.
        </Text>
        <Picker
          style={{
            marginTop: 30,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
          }}
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={cuenta}
          onValueChange={(value) => setCuenta(value)}
        >
          <Picker.Item label="Seleccione una cuenta" value=""></Picker.Item>
          {cbucvupicker.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index}></Picker.Item>
            );
          })}
          {/* <Picker.Item
            label="2578658972563214567892"
            value="2578658972563214567892"
          ></Picker.Item>
          <Picker.Item
            label="2578658972563214567891"
            value="2578658972563214567891"
          ></Picker.Item>
          <Picker.Item
            label="2578658972563214567890"
            value="2578658972563214567890"
          ></Picker.Item> */}
        </Picker>
        <Button
          buttonStyle={styles.btnAddIngreso}
          title="Añadir prestamo"
          onPress={addPrestamo}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "80%",
  },
  space: {
    marginTop: 30,
  },
  viewForm: {
    top: "15%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    marginBottom: 10,
  },
  btnAddIngreso: {
    backgroundColor: "#133b5c",
    margin: 20,
  },
});
