import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image, Alert } from "react-native";
import { Divider, Input, Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import LoginForm from "../components/Account/LoginForm";
import { isEmpty } from "lodash";
import { validateEmail } from "../utils/validations";
import moment from "moment";
import * as SQLite from "expo-sqlite";
// import Navigation from "../../navigations/Navigation";
// import NavigationGuest from "../../navigations/NavigationGuest";
const db = SQLite.openDatabase("db.finanzDB");

export default function LogIn({ navigation }) {
  const toastRef = useRef();
  // const props = {navigation};
  // navigation.navigate("home");
  // const { toastRef, navigation } = props;
  var currentDate = new Date();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ defaultFormValue });
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  var flag = false;

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email ingresado no es correcto");
    } else {
      db.transaction((tx) => {
        tx.executeSql("select * from usuarios", [], (tx, results) => {
          var temp = [];

          for (let i = 0; i < results.rows.length; ++i) {
            // temp.push(results.rows.item(i));
            console.log(results.rows.item(i).email);
            console.log(results.rows.item(i).password);
            if (
              results.rows.item(i).email == formData.email &&
              results.rows.item(i).password == formData.password
            ) {
              flag = true;
            }
          }
          if (!flag) {
            Alert.alert("Error!", "El email o la password son incorrectos");
          } else {
            db.transaction((tx) => {
              tx.executeSql("select * from tarjetas", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                  if (
                    currentDate.getTime() >=
                    results.rows.item(i).fechaVtoResumen
                  ) {
                    Alert.alert(
                      "Vencimiento resumen",
                      "Debe cambiar los vencimientos de la tajerta terminada en " +
                        results.rows.item(i).numero,
                      [
                        {
                          text: "Cambiar vencimiento",
                          onPress: () => navigation.navigate("tarjetas"),
                        },
                      ]
                    );
                  }
                }
              });
            });
            db.transaction((tx) => {
              tx.executeSql("select * from inversiones", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                  if (
                    results.rows.item(i).tipo == "Plazo Fijo" &&
                    currentDate.getTime() >= results.rows.item(i).vtoPlazoFijo
                  ) {
                    Alert.alert(
                      "Vencimiento inversión",
                      "Una inversión de tipo plazo fijo vence hoy"
                    );
                  }
                }
              });
            });
            db.transaction((tx) => {
              tx.executeSql("select * from prestamos", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                  if (currentDate.getTime() >= results.rows.item(i).fechaVto) {
                    console.log("No entra");
                    Alert.alert(
                      "Vencimiento préstamo",
                      "Un préstamo vence hoy"
                    );
                  }
                }
              });
            });
            navigation.navigate("home");
          }
        });
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#ffde59" }}>
      <Image
        source={require("../../assets/img/LogoLogin.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        {/* <LoginForm toastRef={toastRef} navigation={props} />
         */}
        <View style={styles.formContainer}>
          <Input
            placeholder="Correo electrónico"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, "email")}
            rightIcon={
              <Icon
                type="material-community"
                name="email"
                iconStyle={styles.iconRight}
              />
            }
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            // password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, "password")}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <Button
            title="Iniciar sesión"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
          />
        </View>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: "20%",
  },
  viewContainer: {
    // top: "5%",
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: "white",
    borderRadius: 20,
    // height: "5%",
    height: "50%",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 10,
  },
  btnContainerLogin: {
    marginTop: 50,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#133b5c",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
