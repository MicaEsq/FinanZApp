import React, { useState, useRef } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import AddIngresoForm from "../../components/Ingresos/AddIngresoForm";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

export default function AddIngreso(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <Icon
          name="chevron-left"
          style={{
            height: heightPercentageToDP("7%"),
            top: "4.5%",
            left: "4%",
            position: "absolute",
            color: "rgba(0,0,0,1)",
            fontSize: 30,
          }}
          onPress={() => props.navigation.navigate("ingresos")}
        >
          {" "}
          <Text style={{ fontSize: 30 }}>Añadir ingreso:</Text>
        </Icon>

        <ScrollView
          style={{ height: heightPercentageToDP("100%"), top: "10%" }}
        >
          <View>
            <Image
              source={require("../../../assets/img/ingreso.png")}
              resizeMode="contain"
              style={styles.card}
            />
            <Text style={{ color: "#FF0000", marginLeft: 25, marginTop: 0 }}>
              Aclaración: Si seleccionó la opción de efectivo no debe vincular
              con una cuenta bancaria.
            </Text>
            <AddIngresoForm toastRef={toastRef} navigation={navigation} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    width: heightPercentageToDP("100%"),
    width: widthPercentageToDP("100%"),
    backgroundColor: "#ffde59",
  },
  card: {
    width: "100%",
    height: heightPercentageToDP("15%"),
    marginTop: 20,
    marginBottom: 15,
  },
});
