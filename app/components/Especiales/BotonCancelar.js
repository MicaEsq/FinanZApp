import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { StackNavigator } from "react-navigation";

function BotonCancelar(props) {
  return (
    <Button
      style={styles.boton}
      title="Cancelar"
      onPress={() => props.navigation.navigate.goBack()}
    ></Button>
  );
  //   return <View style={[styles.container, props.style]}></View>;
}

const styles = StyleSheet.create({
  boton: {
    // top: 0,
    // left: 4,
    position: "absolute",
    color: "#ffde59",
    // fontSize: 30,
  },
});

export default BotonCancelar;
