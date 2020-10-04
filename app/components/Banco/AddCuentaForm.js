import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { size } from "lodash";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

export default function AddCuentaForm(props) {
  const { toastRef, navigation } = props;
  const [banco, setBanco] = useState("");
  const [cbu, setCbu] = useState("");
  const [tipoc, setTipoc] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [tarjetapicker, setTarjetaPicker] = useState([]);

  const addCuenta = () => {
    {
      if (!banco || !cbu || !tipoc || !nombre || !apellido) {
        toastRef.current.show("Todos los campos son obligatorios.");
      } else if (isNaN(cbu)) {
        toastRef.current.show("Ingrese únicamente números en el campo CBU/CVU");
      } else if (size(cbu) < 22 || size(cbu) > 22) {
        toastRef.current.show("El CBU/CVU ingresado es incorrecto");
      } else {
        console.log(banco);
        console.log(cbu);
        console.log(tipoc);
        console.log(nombre);
        console.log(apellido);
        console.log(tarjeta);
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO cuentas (banco,cbucvu, tipo, nombre, apellido, tarjeta  ) VALUES (?,?,?,?,?,?)",
            [banco, cbu, tipoc, nombre, apellido, tarjeta],

            // if()
            Alert.alert("Exito!", "La cuenta se añadió correctamente")
            // (txObj, resultSet)=> this.setState({data:this})
          );
        });
      }
    }
  };

  useEffect(() => {
    function componentDidMount() {
      db.transaction((tx) => {
        tx.executeSql("select * from tarjetas", [], (tx, results) => {
          var temp = [];
          console.log("ResultsSelect Tarjeta", results);
          1;
          // var tot = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).numero);
            // tot = tot + results.rows.item(i).monto;
            console.log(results.rows.item(i).numero);
          }
          setTarjetaPicker(temp);
          // setFlatListItems(temp);
        });
      });
    }
    componentDidMount();
  }, []);
  return (
    <View style={styles.viewForm}>
      <Picker
        style={{
          marginTop: 10,
          marginBottom: 10,
          // height: 30,
          marginLeft: 10,
          marginRight: 10,
        }}
        mode="dropdown"
        style={{ width: undefined }}
        selectedValue={banco}
        onValueChange={(value) => setBanco(value)}
      >
        <Picker.Item label="Seleccione su banco" value=""></Picker.Item>
        <Picker.Item label="Banco Francés" value="Banco Francés"></Picker.Item>
        <Picker.Item
          label="Banco Santander Rio"
          value="Banco Santander Rio"
        ></Picker.Item>
        <Picker.Item
          label="Banco Provincia"
          value="Banco Provincia"
        ></Picker.Item>
        <Picker.Item label="Banco Galicia" value="Banco Galicia"></Picker.Item>
        <Picker.Item label="Banco Nación" value="Banco Nación"></Picker.Item>
        <Picker.Item label="Banco Itaú" value="Banco Itaú"></Picker.Item>
        <Picker.Item
          label="Banco Hipotecario"
          value="Banco Hipotecario"
        ></Picker.Item>
        <Picker.Item label="Banco ICBC" value="Banco ICBC"></Picker.Item>
        <Picker.Item label="Banco HSBC" value="Banco HSBC"></Picker.Item>
        <Picker.Item label="Ualá" value="Ualá"></Picker.Item>
        <Picker.Item label="Mercado Pago" value="Mercado Pago"></Picker.Item>
      </Picker>
      <Input
        style={{
          marginTop: 8,
          marginBottom: 10,
          height: 40,
          marginLeft: 0,
          marginRight: 5,
        }}
        keyboardType="numeric"
        placeholder="Ingrese su CBU/CVU"
        onChange={(e) => setCbu(e.nativeEvent.text)}
      />
      <Picker
        style={{
          marginTop: 30,
          marginBottom: 10,
          height: 40,
          marginLeft: 10,
          marginRight: 10,
        }}
        mode="dropdown"
        style={{ width: undefined }}
        selectedValue={tipoc}
        onValueChange={(value) => setTipoc(value)}
      >
        <Picker.Item
          label="Seleccione el tipo de cuenta"
          value=""
        ></Picker.Item>
        <Picker.Item label="Cuenta corriente" value="corriente"></Picker.Item>
        <Picker.Item label="Cuenta de ahorro" value="ahorro"></Picker.Item>
        <Picker.Item
          label="Cuenta para empresas y negocios"
          value="empresa"
        ></Picker.Item>
        <Picker.Item label="Cuenta de valores" value="valores"></Picker.Item>
        <Picker.Item label="Cuenta nómina" value="nomina"></Picker.Item>
        <Picker.Item
          label="Cuenta estudiantil"
          value="estudiantil"
        ></Picker.Item>
      </Picker>
      <Input
        style={styles.input}
        placeholder="Nombre completo"
        onChange={(e) => setNombre(e.nativeEvent.text)}
      />
      <Input
        style={styles.input}
        placeholder="Apellido"
        onChange={(e) => setApellido(e.nativeEvent.text)}
      />
      <Picker
        style={{
          marginTop: 30,
          marginBottom: 10,
          height: 40,
          marginLeft: 10,
          marginRight: 10,
        }}
        mode="dropdown"
        style={{ width: undefined }}
        selectedValue={tarjeta}
        onValueChange={(value) => setTarjeta(value)}
      >
        <Picker.Item
          label="Seleccione una tarjeta para vincular"
          value=""
        ></Picker.Item>
        {tarjetapicker.map((item, index) => {
          return (
            <Picker.Item label={item} value={item} key={index}></Picker.Item>
          );
        })}
      </Picker>
      <Button
        buttonStyle={styles.btnAddTarjeta}
        title="Añadir cuenta bancaria"
        onPress={addCuenta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  space: {
    marginTop: 30,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
    // marginTop: "9%",
    // top: "5%",
  },
  input: {
    marginBottom: 10,
  },
  btnAddTarjeta: {
    backgroundColor: "#133b5c",
    margin: 20,
  },
});
