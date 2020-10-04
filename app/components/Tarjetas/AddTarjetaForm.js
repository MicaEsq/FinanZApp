import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

import { size } from "lodash";
export default function AddTarjetaForm(props) {
  const { toastRef, navigation } = props;
  const [entidad, setEntidad] = useState("");
  const [tipo, setTipo] = useState("");
  const [numero, setNumero] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cierre, setCierre] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [vresumen, setVresumen] = useState("");
  const [cbucvupicker, setCBVUPicker] = useState([]);

  const addTarj = () => {
    {
      if (!tipo) {
        toastRef.current.show("Todos los campos son obligatorios.");
      } else if (tipo == "credito") {
        if (!entidad || !numero || !vencimiento || !cierre || !vresumen) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(numero)) {
          toastRef.current.show(
            "Ingrese únicamente números en los dígitos de su tarjeta."
          );
        } else if (size(numero) < 4 || size(numero) > 4) {
          toastRef.current.show("Los dígitos de su tarjeta son incorrectos");

          // } else if (cierre > vencimiento) {
          //   toastRef.current.show(
          //     "La fecha de vencimiento del resumen no puede ser antes de la del cierre"
          //   );
        } else {
          console.log(entidad);
          console.log(tipo);
          console.log(numero);
          console.log(vencimiento);
          console.log(cierre);
          console.log(vresumen);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO tarjetas (banco,tipo, numero, fechaVto, fechaCierre, fechaVtoResumen  ) VALUES (?,?,?,?,?,?)",
              [entidad, tipo, numero, vencimiento, cierre, vresumen],

              // if()
              Alert.alert("Exito!", "La tarjeta se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      } else if (tipo == "debito") {
        if (!entidad || !numero || !vencimiento || !cuenta) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(numero)) {
          toastRef.current.show(
            "Ingrese únicamente números en los dígitos de su tarjeta."
          );
        } else if (size(numero) < 4 || size(numero) > 4) {
          toastRef.current.show("Los dígitos de su tarjeta son incorrectos");
        } else if (cierre != "" || vresumen != "") {
          toastRef.current.show(
            "No debe completar los campos de fecha de cierre y vencimiento del resumen"
          );
        } else {
          console.log(entidad);
          console.log(tipo);
          console.log(numero);
          console.log(vencimiento);
          console.log(cierre);
          console.log(vresumen);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO tarjetas (banco,tipo, numero, fechaVto, fechaCierre, fechaVtoResumen  ) VALUES (?,?,?,?,?,?)",
              [entidad, tipo, numero, vencimiento, cierre, vresumen],

              // if()
              Alert.alert("Exito!", "La tarjeta se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      }
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
            marginBottom: 10,
            height: 40,
            marginLeft: 10,
            marginRight: 10,
          }}
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={entidad}
          onValueChange={(value) => setEntidad(value)}
        >
          <Picker.Item label="Seleccione su banco" value=""></Picker.Item>
          <Picker.Item label="Banco Francés" value="frances"></Picker.Item>
          <Picker.Item
            label="Banco Santander Rio"
            value="santander"
          ></Picker.Item>
          <Picker.Item label="Banco Provincia" value="provincia"></Picker.Item>
          <Picker.Item label="Banco Galicia" value="galicia"></Picker.Item>
          <Picker.Item label="Banco Nación" value="nacion"></Picker.Item>
          <Picker.Item label="Banco Itaú" value="itau"></Picker.Item>
          <Picker.Item
            label="Banco Hipotecario"
            value="hipotecario"
          ></Picker.Item>
          <Picker.Item label="Banco ICBC" value="icbc"></Picker.Item>
          <Picker.Item label="Banco HSBC" value="hsbc"></Picker.Item>
          <Picker.Item label="Ualá" value="uala"></Picker.Item>
          <Picker.Item label="Mercado Pago" value="mpago"></Picker.Item>
          <Picker.Item label="Otro" value="mpago"></Picker.Item>
        </Picker>
        <Picker
          style={{
            marginTop: 8,
            marginBottom: 10,
            height: 40,
            marginLeft: 0,
            marginRight: 0,
          }}
          mode="dropdown"
          selectedValue={tipo}
          onValueChange={(value) => setTipo(value)}
        >
          <Picker.Item label="Tipo de tarjeta" value=""></Picker.Item>
          <Picker.Item label="Tarjeta de crédito" value="credito"></Picker.Item>
          <Picker.Item label="Tarjeta de débito" value="debito"></Picker.Item>
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
          placeholder="Últimos 4 dígitos de su tarjeta"
          onChange={(e) => setNumero(e.nativeEvent.text)}
        />
        <Picker
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
          <Picker.Item
            label="Seleccione una cuenta para vincularla"
            value=""
          ></Picker.Item>
          {cbucvupicker.map((item, index) => {
            return (
              <Picker.Item label={item} value={item} key={index}></Picker.Item>
            );
          })}
        </Picker>
        <Text
          style={{
            marginTop: 15,
            marginBottom: 10,
            height: 40,
            marginLeft: 10,
            marginRight: 3,
          }}
        >
          Ingrese la fecha de vencimiento (Seleccionar cualquier día del mes del
          vencimiento)
        </Text>
        <DatePicker
          style={{
            marginTop: 8,
            marginBottom: 10,
            height: 40,
            width: 200,
            marginLeft: 90,
            marginRight: 10,
          }}
          date={vencimiento}
          mode="date" //The enum of date, datetime and time
          placeholder="Seleccione una fecha"
          format="MM-YYYY"
          minDate="09-2020"
          maxDate="01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          selectedValue={vencimiento}
          onDateChange={(date) => setVencimiento(date)}
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
          date={cierre}
          mode="date" //The enum of date, datetime and time
          placeholder="Seleccione una fecha"
          format="DD-MM-YYYY"
          minDate="01-09-2020"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          selectedValue={cierre}
          onDateChange={(date) => setCierre(date)}
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
          date={vresumen}
          mode="date" //The enum of date, datetime and time
          placeholder="Seleccione una fecha"
          format="DD-MM-YYYY"
          minDate="01-09-2020"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          selectedValue={vresumen}
          onDateChange={(date) => setVresumen(date)}
        />
        <Button
          buttonStyle={styles.btnAddTarjeta}
          title="Añadir datos de tarjeta"
          onPress={addTarj}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "95%",
  },
  space: {
    marginTop: 30,
  },
  viewForm: {
    marginTop: "25%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    marginBottom: 10,
  },
  btnAddTarjeta: {
    backgroundColor: "#133b5c",
    margin: 20,
  },
});
