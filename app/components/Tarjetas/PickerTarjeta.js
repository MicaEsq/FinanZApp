import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function PickerTarjeta() {
  return (
    <View
      style={{
        top: "7%",
        width: widthPercentageToDP("70%"),
        backgroundColor: "red",
        alignSelf: "center",
      }}
    >
      <Picker
        style={{
          marginTop: 10,
          height: 40,
          marginLeft: 10,
          marginRight: 10,
        }}
        mode="dropdown"
        selectedValue={dropTarjetas}
      >
        <Picker.Item label="Seleccione una tarjeta" value=""></Picker.Item>
        <Picker.Item label="xxxx.xxxx.xxxx.4321" value=""></Picker.Item>
        <Picker.Item label="xxxx.xxxx.xxxx.6734" value=""></Picker.Item>
        <Picker.Item label="xxxx.xxxx.xxxx.8853" value=""></Picker.Item>
        <Picker.Item label="xxxx.xxxx.xxxx.2397" value=""></Picker.Item>
      </Picker>
    </View>
  );
}
