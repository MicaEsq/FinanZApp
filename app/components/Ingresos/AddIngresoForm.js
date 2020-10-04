import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { size } from "lodash";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB"); //revuelve un objeto base de datos

export default function AddIngresoForm(props) {
  const { toastRef, navigation } = props;
  const [tipoI, setTipoI] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [medio, setMedio] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [origen, setOrigen] = useState("");
  const [visible, setVisible] = useState(false);

  const [cbu, setCbu] = useState("");
  const [cbucvupicker, setCBVUPicker] = useState([]);
  const addIngreso = () => {
    {
      if (!medio) {
        toastRef.current.show("Todos los campos son obligatorios.");
      } else if (medio == "Transf./Deposito") {
        if (!tipoI || !cantidad || !fecha || !cuenta || !origen) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show(
            "Ingrese únicamente números en el campo cantidad"
          );
        } else {
          console.log(tipoI);
          console.log(cantidad);
          console.log(fecha);
          console.log(medio);
          console.log(cuenta);
          console.log(origen);
          console.log(visible);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO ingresos (categoria, monto , fecha , tipoDeMedio , cuenta , origen ) VALUES (?,?,?,?,?,?)",
              [tipoI, cantidad, fecha, medio, cuenta, origen],

              // if()
              Alert.alert("Exito!", "El ingreso se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      } else {
        if (!tipoI || !cantidad || !fecha || !origen) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show(
            "Ingrese únicamente números en el campo cantidad"
          );
        } else if (cuenta !== "") {
          toastRef.current.show("No debe seleccionar una cuenta");
        } else {
          console.log(tipoI);
          console.log(cantidad);
          console.log(fecha);
          console.log(medio);
          console.log(cuenta);
          console.log(origen);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO ingresos (categoria, monto , fecha , tipoDeMedio , cuenta , origen ) VALUES (?,?,?,?,?,?)",
              [tipoI, cantidad, fecha, medio, cuenta, origen],

              // if()
              Alert.alert("Exito!", "El ingreso se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      }
    }
  };
  const doMatch = () => {
    if (medio !== "Transf./Deposito") {
      setVisible(true);
    } else {
      setVisible(false);
      setCuenta("");
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
    <ScrollView style={{ height: heightPercentageToDP("100%") }}>
      <View style={styles.viewForm}>
        {/* <ScrollView> */}
        {/* <Input
        style={{
          marginTop: 4,
          // marginBottom: 10,
          height: 40,
          // marginLeft: 50,
          // marginRight: 5,
          // width: "5%",
        }}
        placeholder="Origen"
        onChange={(e) => setCantidad(e.nativeEvent.text)}
      /> */}
        <Picker
          style={{
            marginTop: 10,
            // marginBottom: 10,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
            // width: widthPercentageToDP("70%"),
            // alignSelf: "center",
          }}
          mode="dropdown"
          // style={{ width: undefined }}
          selectedValue={tipoI}
          onValueChange={(value) => setTipoI(value)}
        >
          <Picker.Item label="Seleccione una categoría" value=""></Picker.Item>
          <Picker.Item label="Sueldo" value="Sueldo"></Picker.Item>
          <Picker.Item label="Alquiler" value="Alquiler"></Picker.Item>
          <Picker.Item label="Venta" value="Venta"></Picker.Item>
          <Picker.Item label="Autónomo" value="Autonomo"></Picker.Item>
          <Picker.Item label="Regalo" value="Regalo"></Picker.Item>
          <Picker.Item
            label="Extraordinario"
            value="Extraordinario"
          ></Picker.Item>
        </Picker>
        <Input
          style={{
            marginTop: 4,
            // marginBottom: 10,
            height: 40,
            // marginLeft: 150,
            // marginRight: 5,
            // width: "5%",
          }}
          placeholder="Ingrese el monto (en pesos argentinos)"
          keyboardType="numeric"
          onChange={(e) => setCantidad(e.nativeEvent.text)}
        />
        <Text
          style={{
            marginTop: 15,
            // marginBottom: 0,
            height: 40,
            marginLeft: 18,
            marginRight: 3,
          }}
        >
          Seleccione la fecha del ingreso:
        </Text>
        <DatePicker
          style={{
            marginTop: 8,
            // marginBottom: 10,
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
            // marginBottom: 10,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
            // width: widthPercentageToDP("70%"),
            // alignSelf: "center",
          }}
          mode="dropdown"
          // style={{ width: undefined }}
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
        </Picker>

        <Picker
          enabled={visible ? true : false}
          style={{
            marginTop: 30,
            marginBottom: 10,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
            // width: widthPercentageToDP("70%"),
            // alignSelf: "center",
          }}
          mode="dropdown"
          selectedValue={cuenta}
          onValueChange={(value) => setCuenta(value)}
        >
          <Picker.Item label="Seleccione una cuenta" value=""></Picker.Item>
          {cbucvupicker.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index}></Picker.Item>
            );
          })}
          {/* <Picker.Item label="2578" value="2578"></Picker.Item>
          <Picker.Item label="3963" value="3963"></Picker.Item>
          <Picker.Item label="4869" value="4869"></Picker.Item> */}
        </Picker>

        <Input
          style={{
            marginTop: 8,
            marginBottom: 10,
            height: 40,
            marginLeft: 0,
            marginRight: 5,
          }}
          placeholder="Ingrese el origen del Ingreso"
          onChange={(e) => setOrigen(e.nativeEvent.text)}
        />
        <Button
          buttonStyle={styles.btnAddIngreso}
          title="Añadir ingreso"
          // onPress={addIngreso}
          onPress={addIngreso}
        />
        {/* </ScrollView> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: heightPercentageToDP("100%"),
  },
  space: {
    marginTop: 30,
  },
  viewForm: {
    top: "1%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
    height: heightPercentageToDP("77%"),
  },
  input: {
    marginBottom: 10,
  },
  btnAddIngreso: {
    // backgroundColor: "#00a680",
    backgroundColor: "#133b5c",
    margin: 20,
  },
});
