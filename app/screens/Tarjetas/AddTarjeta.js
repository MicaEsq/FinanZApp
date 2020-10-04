import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import AddTarjetaForm from "../../components/Tarjetas/AddTarjetaForm";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

export default function AddTarjeta(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <View
      style={{
        backgroundColor: "#ffde59",
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("100%"),
      }}
    >
      <Icon
        name="chevron-left"
        style={{
          height: heightPercentageToDP("6%"),
          top: "5.5%",
          left: "4%",
          position: "absolute",
          color: "rgba(0,0,0,1)",
          fontSize: 30,
        }}
        onPress={() => props.navigation.goBack()}
      >
        {" "}
        <Text style={{ fontSize: 30 }}>Añadir tarjeta:</Text>
      </Icon>
      <AddTarjetaForm toastRef={toastRef} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
