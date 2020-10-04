import React, { useState } from "react";
import { StyleSheet, View , Alert} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import Navigation from "../../navigations/Navigation";
import NavigationGuest from "../../navigations/NavigationGuest";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setformData] = useState(defaultFormValue);

  const onSubmit = () => {
    var flag = true;
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email ingresado no es correcto");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas deben ser iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)",

          
          

          // if()
          
          // (txObj, resultSet)=> this.setState({data:this})
          );
      });
      db.transaction((tx) => {
        tx.executeSql("select * from usuarios where email=?", [formData.email], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            // temp.push(results.rows.item(i));
            if(results.rows.item(i).email == formData.email){
              Alert.alert("Error!", "Este email ya esta registrado")
              flag = false;
            }
            // console.log(temp.item(i).monto);
  
          }
          if(flag){
            db.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO usuarios (email, password) VALUES (?,?)",
                [formData.email, formData.password],
                // console.log(form.email),
      
      
                // if()
                Alert.alert("Exito!", "Se registro correctamente"),
                
      
                // (txObj, resultSet)=> this.setState({data:this})
                );
            });
            navigation.navigate("home");
          }
          // setFlatListItems(temp);
        });
      });
      // if(flag == true){
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       "INSERT INTO usuarios (email, password) VALUES (?,?)",
    //       [formData.email, formData.password],
    //       // console.log(form.email),


    //       // if()
    //       Alert.alert("Exito!", "Se registro correctamente"),
          

    //       // (txObj, resultSet)=> this.setState({data:this})
    //       );
    //   });
    // }
      // return flag ? <Navigation /> : <NavigationGuest />;

    }
  };

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
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
        password={true}
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
      <Input
        placeholder="Repita su contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 0,
    // height: "100%",
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 40,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#133b5c",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
