import React, { useState, useRef } from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Icon from "react-native-vector-icons/Feather";
import AddCuentaForm from "../../components/Banco/AddCuentaForm";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function AddCuenta(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    // <ScrollView>
    <View style={styles.contenedor}>
      <View
        style={{
          top: "6%",
          // backgroundColor: "#ffde59",
          // height: heightPercentageToDP("40%"),
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
          onPress={() => props.navigation.navigate("banco")}
        >
          {" "}
          <Text style={{ fontSize: 30 }}>Añadir cuenta:</Text>
        </Icon>
      </View>
      <Image
        source={require("../../../assets/img/cuenta.jpg")}
        resizeMode="contain"
        style={styles.card}
      />
      <AddCuentaForm toastRef={toastRef} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      {/* </View> */}
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("100%"),
    backgroundColor: "#ffde59",
  },
  card: {
    width: "100%",
    height: "20%",
    marginTop: "25%",
    marginBottom: "5%",
  },
});
