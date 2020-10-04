import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";
import { StackNavigator } from "react-navigation";
import BotonCancelar from "../Especiales/BotonCancelar";

export default function ChangeEmailForm(props) {
  const { navigation } = props;
  const { email, setShowModal, toastRef, setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    setErrors({});
    if (!formData.email || email === formData.email) {
      setErrors({
        email: "El email no ha sido modificado",
      });
    } else if (!validateEmail(formData.email)) {
      setErrors({
        email: "El email ingresado es incorrecto",
      });
    } else if (!formData.password) {
      setErrors({
        password: "Debe ingresar su contraseña actual",
      });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadUserInfo(true);
              setShowModal(false);
              toastRef.current.show(
                "El email ha sido actualizado correctamente"
              );
            })
            .catch(() => {
              setErrors({ email: "Error al actualizar el email" });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setIsLoading(false);
          setErrors({
            password: "La contraseña no es correcta",
          });
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        defaultValue={email}
        rightIcon={{
          type: "material-community",
          name: "email",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          top: "2%",
        }}
      >
        {/* <BotonCancelar></BotonCancelar> */}
        <Button
          title="Cancelar"
          buttonStyle={styles.btn}
          onPress={() => setShowModal(false)}
          // loading={isLoading}
        />
        <Button
          title="Cambiar email"
          // containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  // btnContainer: {
  //   marginTop: 20,
  //   width: "90%",
  //   // left: "5%",
  // },
  btn: {
    backgroundColor: "#ffde59",
    // top: "5%",
    // marginTop: "3%",
    // width: "5%",
    // padding: 5,
    // paddingVertical: 5,
  },
});
