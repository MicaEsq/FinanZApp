import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Icon, Avatar, Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { size } from "lodash";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
// import RNFetchBlob from 'rn-fetch-blob';

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

const db = SQLite.openDatabase("db.finanzDB");

export default function AddEgresoForm(props) {
  const [image, setImage] = useState(null);
  const { toastRef, navigation } = props;
  const [tipoI, setTipoI] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [medio, setMedio] = useState("");
  const [fecha, setFecha] = useState("");
  const [visible, setVisible] = useState(false);
  const [otros, setOtros] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [destino, setDestino] = useState("");
  const [tarjeta, setTarjeta] = useState("");

  const [cbucvupicker, setCBVUPicker] = useState([]);
  const [tarjetapicker, setTarjetaPicker] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addEgreso = () => {
    {
      if (!medio) {
        toastRef.current.show("Todos los campos son obligatorios.");
      } else if (medio == "cuentabanco") {
        if (!tipoI || !cantidad || !fecha || !destino) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show("Ingrese únicamente números en el campo monto");
        } else if (categoria !== "Otros") {
          toastRef.current.show("No debe ingresar un detalle");
          setOtros("");
        } else if (
          (medio !== "D.Automatico" && cuenta !== "") ||
          (medio !== "Transferencia" && cuenta !== "")
        ) {
          toastRef.current.show("No debe seleccionar una cuenta bancaria");
          setCuenta("");
        } else if (medio == "T.Credito" && !tarjeta) {
          toastRef.current.show("Debe seleccionar una tarjeta");
        } else if (medio == "T.Debito" && !tarjeta) {
          toastRef.current.show("Debe seleccionar una tarjeta");
        } else {
          console.log(categoria);
          console.log(tipoI);
          console.log(cantidad);
          console.log(medio);
          console.log(otros);
          console.log(fecha);
          console.log(cuenta);
          console.log(destino);
          console.log(tarjeta);
          // var blob = new Blob([image], {type: "image/jpg"})
          // console.log(blob);
          // const imageFile = RNFetchBlob.wrap(image);
          // var uploadBlob = Blob.build(imageFile, { type: 'image/jpg;' });
          // const ref = firebase.storage().ref('path/to/image');
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO egresos (categoria, monto , fecha , tipoDeMedio , cuenta , cuotas, otros, destino, tarjeta, comprobante) VALUES (?,?,?,?,?,?,?,?,?,?)",
              [
                categoria,
                cantidad,
                fecha,
                medio,
                cuenta,
                tipoI,
                otros,
                destino,
                tarjeta,
              ],

              // if()
              Alert.alert("Exito!", "El egreso se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      } else {
        if (!tipoI || !cantidad || !medio || !fecha || !destino) {
          toastRef.current.show("Todos los campos son obligatorios.");
        } else if (isNaN(cantidad)) {
          toastRef.current.show("Ingrese únicamente números en el campo monto");
        } else if (categoria !== "Otros" && otros !== "") {
          setOtros("");
        } else if (medio == "D.Automatico" && !cuenta) {
          toastRef.current.show("Debe seleccionar una cuenta bancaria");
        } else if (medio == "Transferencia" && !cuenta) {
          toastRef.current.show("Debe seleccionar una cuenta bancaria");
        } else if (
          (medio == "Efectivo" ||
            medio == "MercadoPago" ||
            medio == "T.Debito" ||
            medio == "T.Credito") &&
          cuenta !== ""
        ) {
          toastRef.current.show("No debe seleccionar una cuenta bancaria");
          setCuenta("");
        } else if (medio == "T.Credito" && !tarjeta) {
          toastRef.current.show("Debe seleccionar una tarjeta");
        } else if (medio == "T.Debito" && !tarjeta) {
          toastRef.current.show("Debe seleccionar una tarjeta");
        } else if (
          (medio == "Efectivo" ||
            medio == "D.Automatico" ||
            medio == "Transferencia" ||
            medio == "MercadoPago") &&
          tarjeta !== ""
        ) {
          toastRef.current.show("No debe seleccionar una tarjeta");
          setTarjeta("");
        } else {
          console.log(categoria);
          console.log(tipoI);
          console.log(cantidad);
          console.log(medio);
          console.log(fecha);
          console.log(otros);
          console.log(cuenta);
          console.log(destino);
          console.log(tarjeta);
          // const imageFile = RNFetchBlob.wrap(image);
          // var uploadBlob = Blob.build(imageFile, { type: 'image/jpg;' });
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO egresos (categoria, monto , fecha , tipoDeMedio , cuenta , cuotas, otros, destino, tarjeta, comprobante ) VALUES (?,?,?,?,?,?,?,?,?,?)",
              [
                categoria,
                cantidad,
                fecha,
                medio,
                cuenta,
                tipoI,
                otros,
                destino,
                tarjeta,
              ],

              // if()
              Alert.alert("Exito!", "El egreso se añadió correctamente")
              // (txObj, resultSet)=> this.setState({data:this})
            );
          });
        }
      }
      // const imageFile = imageToBlob(image);
    }
  };
  const doMatch = () => {
    if (
      categoria == "Servicios" ||
      categoria == "Impuestos" ||
      categoria == "Educacion" ||
      categoria == "Comida" ||
      categoria == "Entrenamiento" ||
      categoria == "Extraordinario"
    ) {
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
    <ScrollView>
      <View style={styles.viewForm}>
        <ScrollView>
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
          <Text
            style={{
              marginTop: 15,
              // marginBottom: 0,
              height: 40,
              marginLeft: 18,
              marginRight: 3,
            }}
          >
            Ingrese numero de cuotas:
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
            <Picker.Item label="Seleccione las cuotas" value=""></Picker.Item>
            <Picker.Item label="1 cuota" value="1"></Picker.Item>
            <Picker.Item label="3 cuotas" value="3"></Picker.Item>
            <Picker.Item label="6 cuotas" value="6"></Picker.Item>
            <Picker.Item label="12 cuotas" value="12"></Picker.Item>
            <Picker.Item label="18 cuotas" value="18"></Picker.Item>
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
            Seleccione una categoria:
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
            selectedValue={categoria}
            onValueChange={(value) => {
              setCategoria(value);
              {
                doMatch();
              }
            }}
          >
            <Picker.Item label="Elija..." value=""></Picker.Item>
            <Picker.Item label="Servicios" value="Servicios"></Picker.Item>
            <Picker.Item label="Impuestos" value="Impuestos"></Picker.Item>
            <Picker.Item label="Educación" value="Educacion"></Picker.Item>
            <Picker.Item label="Comida" value="Comida"></Picker.Item>
            <Picker.Item
              label="Entretenimiento"
              value="Entretenimiento"
            ></Picker.Item>
            <Picker.Item
              label="Extraordinario"
              value="Extraordinario"
            ></Picker.Item>
            <Picker.Item label="Otros(*)" value="Otros"></Picker.Item>
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
            (*)Detalle más si eligio Otros:
          </Text>
          <Input
            editable={visible ? true : false}
            style={{
              marginTop: 4,
              // marginBottom: 10,
              height: 40,
              // marginLeft: 150,
              // marginRight: 5,
              // width: "5%",
            }}
            placeholder="Escriba aqui..."
            onChange={(e) => setOtros(e.nativeEvent.text)}
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
            Seleccione el tipo de medio:
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
            selectedValue={medio}
            onValueChange={(value) => setMedio(value)}
          >
            <Picker.Item label="Elija..." value=""></Picker.Item>
            <Picker.Item label="Efectivo" value="Efectivo"></Picker.Item>
            <Picker.Item label="Tarjeta Debito" value="T.Debito"></Picker.Item>
            <Picker.Item
              label="Tarjeta Credito"
              value="T.Credito"
            ></Picker.Item>
            <Picker.Item
              label="Debito automatico"
              value="D.Automatico"
            ></Picker.Item>
            <Picker.Item
              label="Transferencia"
              value="Transferencia"
            ></Picker.Item>
            <Picker.Item label="MercadoPago" value="MercadoPago"></Picker.Item>
          </Picker>
          <Text
            style={{
              marginTop: 5,
              height: 40,
              marginLeft: 10,
              marginRight: 3,
              color: "red",
            }}
          >
            En caso de haber seleccionado en el tipo de medio transferencia o
            débito automático, elegir una cuenta.
          </Text>
          <Picker
            style={{
              marginTop: 5,
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
                <Picker.Item
                  label={item}
                  value={item}
                  key={index}
                ></Picker.Item>
              );
            })}
          </Picker>
          <Text
            style={{
              marginTop: 5,
              height: 40,
              marginLeft: 10,
              marginRight: 3,
              color: "red",
            }}
          >
            En caso de haber seleccionado en el tipo de medio tarjeta de crédito
            u débito, elegir una tarjeta.
          </Text>
          <Picker
            style={{
              marginTop: 1,
              marginBottom: 10,
              height: 40,
              marginLeft: 10,
              marginRight: 10,
            }}
            mode="dropdown"
            selectedValue={tarjeta}
            onValueChange={(value) => setTarjeta(value)}
          >
            <Picker.Item label="Seleccione una tarjeta" value=""></Picker.Item>
            {tarjetapicker.map((item, index) => {
              return (
                <Picker.Item
                  label={item}
                  value={item}
                  key={index}
                ></Picker.Item>
              );
            })}

            {/* <Picker.Item label="5682" value="5682"></Picker.Item>
            <Picker.Item label="9725" value="9725"></Picker.Item> */}
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
            Ingrese la fecha del egreso:
          </Text>

          <DatePicker
            style={{
              marginTop: 8,
              // marginBottom: 10,
              height: 40,
              width: 200,
              marginLeft: 15,
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
            Ingrese el destino del egreso:
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
            placeholder="Destino del egreso"
            onChange={(e) => setDestino(e.nativeEvent.text)}
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
            Comprobante:
          </Text>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.row}>
            <Button
              onPress={pickImage}
              buttonStyle={styles.btnElegirFoto}
              title="Elegir foto"
            >
              Gallery
            </Button>
            <Button
              onPress={takeImage}
              buttonStyle={styles.btnSacarFoto}
              title="Sacar foto"
            >
              Camera
            </Button>
          </View>

          <Button
            buttonStyle={styles.btnAddEgreso}
            title="Añadir egreso"
            onPress={addEgreso}
          />
        </ScrollView>
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
    height: heightPercentageToDP("64%"),
    // borderColor:"blue",
    // shadowColor:"red",
  },
  input: {
    marginBottom: 10,
  },
  btnAddEgreso: {
    // backgroundColor: "#00a680",
    backgroundColor: "#133b5c",
    margin: 20,
  },
  text: {
    fontSize: 21,
  },
  row: { flexDirection: "row" },
  image: { width: 100, height: 100, backgroundColor: "gray", left: "7%" },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: "#dddddd",
  },
  btnElegirFoto: {
    // backgroundColor: "#00a680",
    backgroundColor: "#133b5c",
    margin: 15,
  },
  btnSacarFoto: {
    // backgroundColor: "#00a680",
    backgroundColor: "#133b5c",
    margin: 15,
  },
});
