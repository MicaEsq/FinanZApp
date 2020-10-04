import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";
export default function ChangePasswordForm(props) {
  const { setShowModal, toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordn, setShowPasswordn] = useState(false);
  const [showPasswordr, setShowPasswordr] = useState(false);
  const [formData, setFormData] = useState(defaultValue());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = async () => {
    let isSetErrors = true;
    let errorsTemp = {};
    setErrors({});
    if (
      !formData.password &&
      !formData.newPassword &&
      !formData.repeatNewPassword
    ) {
      errorsTemp = {
        password: "La contraseña está vacía.",
        newPassword: "La nueva contraseña no puede estar vacía.",
        repeatNewPassword: "La nueva contraseña no puede estar vacía.",
      };
    } else if (!formData.password) {
      errorsTemp = {
        password: "La contraseña está vacía.",
      };
    } else if (!formData.newPassword) {
      errorsTemp = {
        newPassword: "La nueva contraseña no puede estar vacía.",
      };
    } else if (!formData.repeatNewPassword) {
      errorsTemp = {
        repeatNewPassword: "La nueva contraseña no puede estar vacía.",
      };
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      errorsTemp = {
        newPassword: "Las contraseñas no son iguales.",
        repeatNewPassword: "Las contraseñas no son iguales.",
      };
    } else if (size(formData.newPassword) < 6) {
      errorsTemp = {
        newPassword: "La nueva contraseña debe ser mayor a 5 caracteres",
        repeatNewPassword: "La nueva contraseña debe ser mayor a 5 caracteres",
      };
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              isSetErrors = false;
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(() => {
              errorsTemp = {
                other: "Error al actualizar la contraseña",
              };
              setIsLoading(false);
            });
        })
        .catch(() => {
          errorsTemp = {
            password: "La contraseña ingresada no es correcta",
          };
          setIsLoading(false);
        });
    }
    isSetErrors && setErrors(errorsTemp);
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
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
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPasswordn ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPasswordn ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPasswordn(!showPasswordn),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPasswordr ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPasswordr ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setShowPasswordr(!showPasswordr),
        }}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        errorMessage={errors.repeatNewPassword}
      />
      {/* <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      /> */}
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
          title="Cambiar contraseña"
          // containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultValue() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
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
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#ffde59",
  },
});
