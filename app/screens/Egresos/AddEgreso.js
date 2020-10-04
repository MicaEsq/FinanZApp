import React, { useState, useRef } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import AddEgresoForm from "../../components/Egresos/AddEgresoForm";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

export default function AddEgreso(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <Icon
          name="chevron-down"
          style={{
            height: heightPercentageToDP("6%"),
            top: "5.5%",
            left: "4%",
            position: "absolute",
            color: "rgba(0,0,0,1)",
            fontSize: 30,
          }}
          onPress={() => props.navigation.navigate("egresos")}
        >
          {" "}
          <Text style={{ fontSize: 30 }}>Añadir Egreso:</Text>
        </Icon>

        <ScrollView
          style={{ height: heightPercentageToDP("100%"), top: "10%" }}
        >
          <View>
            <Image
              source={require("../../../assets/img/egreso.png")}
              resizeMode="contain"
              style={styles.card}
            />
            {/* <Text style={{ color: "#FF0000", marginLeft: 25, marginTop: 0 }}>
              Aclaración: Si seleccionó la opción de efectivo no debe vincular
              con una cuenta bancaria.
            </Text> */}
            <AddEgresoForm toastRef={toastRef} navigation={navigation} />
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
