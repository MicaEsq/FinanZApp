import React, { useState } from "react";
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

export default function AddInversionForm(props) {
  const { toastRef, navigation } = props;
  const [tipoI, setTipoI] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [venc, setVenc] = useState("");
  const [detalle, setDetalle] = useState("");
  const [interes, setInteres] = useState("");
  const addInversion = () => {
    if (!tipoI || !cantidad || !fecha || !detalle || !interes) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (tipoI !== "Plazo Fijo" && venc !== "") {
      toastRef.current.show("No debe ingresar el vencimiento del Plazo Fijo");
      setVenc("");
    } else if (tipoI == "Plazo Fijo" && venc == "") {
      toastRef.current.show("Debe ingresar el vencimiento del Plazo Fijo");
    } else {
      console.log(tipoI);
      console.log(cantidad);
      console.log(fecha);
      console.log(venc);
      console.log(detalle);
      console.log(interes);
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO inversiones (monto , tipo ,vtoPlazoFijo , fecha , origen , interes  ) VALUES (?,?,?,?,?,?)",
          [cantidad, tipoI, venc, fecha, detalle, interes],
          console.log(detalle),
          // if()
          Alert.alert("Exito!", "La inversion se añadió correctamente")
          // (txObj, resultSet)=> this.setState({data:this})
        );
      });
    }
  };
  return (
    // console.log(inversiones.detalle),
    <ScrollView style={{ height: "85%", top: "3%" }}>
      {/* <ScrollView style={styles.scrollView}> */}
      <View style={styles.viewForm}>
        <Text
          style={{
            marginTop: 15,
            // marginBottom: 0,
            height: 40,
            marginLeft: 18,
            marginRight: 3,
          }}
        >
          Ingrese el monto en pesos:
        </Text>
        <Input
          style={{
            marginTop: 4,
            // marginBottom: 10,
            height: 40,
            // marginLeft: 150,
            // marginRight: 5,
            // width: "5%",
          }}
          keyboardType="numeric"
          placeholder="$ARS"
          onChange={(e) => setCantidad(e.nativeEvent.text)}
        />
        <Input
          style={{
            marginTop: 4,
            // marginBottom: 10,
            height: 40,
            // marginLeft: 150,
            // marginRight: 5,
            // width: "5%",
          }}
          keyboardType="numeric"
          placeholder="Ingrese la tasa de interés"
          onChange={(e) => setInteres(e.nativeEvent.text)}
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
          Seleccione tipo de inversión:
        </Text>
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
          <Picker.Item label="Elija..." value=""></Picker.Item>
          <Picker.Item label="Acciones" value="Acciones"></Picker.Item>
          <Picker.Item label="Compra de Titulos" value="Titulos"></Picker.Item>
          <Picker.Item label="Bono" value="Bono"></Picker.Item>
          <Picker.Item label="Plazo Fijo(*)" value="Plazo Fijo"></Picker.Item>
        </Picker>

        <Text
          style={{
            marginTop: 15,
            // marginBottom: 0,
            height: 40,
            marginLeft: 18,
            marginRight: 3,
          }}
        >
          * Si eligio Plazo Fijo ingrese vencimiento:
        </Text>
        <DatePicker
          style={{
            marginTop: 8,
            // marginBottom: 10,
            height: 40,
            width: 200,
            alignSelf: "center",
            // marginLeft: 100,
            marginRight: 10,
          }}
          date={venc}
          mode="date" //The enum of date, datetime and time
          placeholder="Seleccione una fecha"
          format="DD-MM-YYYY"
          minDate="01-09-2020"
          maxDate="01-01-2050"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          selectedValue={venc}
          onDateChange={(date) => setVenc(date)}
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
          Ingrese fecha de la inversión:
        </Text>
        <DatePicker
          style={{
            marginTop: 8,
            // marginBottom: 10,
            height: 40,
            width: 200,
            alignSelf: "center",
            // marginLeft: 110,
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

        <Text
          style={{
            marginTop: 15,
            // marginBottom: 0,
            height: 40,
            marginLeft: 18,
            marginRight: 3,
          }}
        >
          Ingrese origen de la inversión(ej. Apple,Samsung):
        </Text>

        <Input
          style={{
            marginTop: 4,
            // marginBottom: 10,
            height: 40,
            // marginLeft: 150,
            // marginRight: 5,
            // width: "5%",
          }}
          placeholder="Escriba aqui..."
          onChange={(e) => setDetalle(e.nativeEvent.text)}
        />

        <Button
          buttonStyle={styles.btnAddInversion}
          title="Añadir inversion"
          onPress={addInversion}
        />
        {/* </ScrollView> */}
      </View>
      {/* </ScrollView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // height: "85%",
  },
  space: {
    marginTop: 30,
  },
  viewForm: {
    top: "0%",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 20,
    height: heightPercentageToDP("100%"),
  },
  input: {
    marginBottom: 10,
  },
  btnAddInversion: {
    // backgroundColor: "#00a680",
    backgroundColor: "#133b5c",
    margin: 20,
  },
});
