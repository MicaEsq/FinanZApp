import React, { useState, useRef } from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import AddInversionForm from "../../components/Inversiones/AddInversionForm";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

export default function AddInversion(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.contenedor}>
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
          onPress={() => props.navigation.navigate("inversiones")}
        >
          {" "}
          <Text style={{ fontSize: 30 }}>Añadir inversión:</Text>
        </Icon>

        <ScrollView
          style={{ height: heightPercentageToDP("100%"), top: "10%" }}
        >
          <View>
            <AddInversionForm toastRef={toastRef} navigation={navigation} />
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
