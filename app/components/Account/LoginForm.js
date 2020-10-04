import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import * as SQLite from "expo-sqlite";
import Navigation from "../../navigations/Navigation";
import NavigationGuest from "../../navigations/NavigationGuest";
const db = SQLite.openDatabase("db.finanzDB");

export default function LoginForm(props) {
  const { toastRef, navigation } = props;
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
            if(results.rows.item(i).email == formData.email &&
             results.rows.item(i).password == formData.password){

              // console.log(results.rows.item(i).email);
              flag= true;
              // Alert.alert("Error!", "Este email ya esta registrado")
            }
            // console.log(temp.item(i).monto);
  
          }
          if(!flag){
          Alert.alert("Error!", "El email o la password son incorrectos")
          }
          // setFlatListItems(temp);
        });
      });
      // return flag ? <Navigation /> : <NavigationGuest />;
      

    }
    
    if(flag == true){
      navigation.navigate("home");
    }
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
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
    </View>
  );
}
function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
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
