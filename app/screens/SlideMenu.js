import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";

function SlideMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.button8StackStack}>
        {/* <View> */}
        {/* <View style={styles.buttonStack}> */}

        {/* </View> */}
        {/* <Image
          source={require("../../assets/img/logo.jpeg")}
          resizeMode="contain"
          style={styles.image1}
        ></Image>
        <View style={styles.rect2} />
        <FontAwesomeIcon
          name="navicon"
          style={styles.icon1}
          onPress={() => navigation.navigate("home")}
        ></FontAwesomeIcon>
        {/* </View> 
        <FontAwesomeIcon name="bell-o" style={styles.icon2}></FontAwesomeIcon>
        </View> */}
        <View style={styles.rect2} />
        <View style={styles.barraTop}>
          <FontAwesomeIcon
            name="navicon"
            style={styles.iconoMenu}
            onPress={() => navigation.navigate("home")}
          ></FontAwesomeIcon>
          <Image
            source={require("../../assets/logoHome.png")}
            resizeMode="contain"
            style={styles.logo}
          ></Image>
        <FontAwesomeIcon
          name="file-excel-o"
          style={styles.iconoUser}
          onPress={() => navigation.navigate("opciones")}
        ></FontAwesomeIcon>
        </View>

        <View style={styles.button8Stack}>
          <View style={styles.rectanguloFondo}>
            <View style={styles.icon3ColumnRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("start")}
                style={styles.button9}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="sign-out"
                    style={{ ...styles.icon5, left: "7%" }}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Cerrar sesion</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("presupuesto")}
                style={styles.button8}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="dollar"
                    style={{ ...styles.icon5, left: "15%" }}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Presupuesto</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("prestamos")}
                style={styles.button7}
              >
                <View style={styles.lineaIngreso}>
                  <MaterialCommunityIconsIcon
                    name="clipboard-flow"
                    style={styles.icon5}
                  ></MaterialCommunityIconsIcon>
                  <Text style={styles.ingresos}>Prestamos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("inversion")}
                style={styles.button6}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="line-chart"
                    style={styles.icon5}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Inversiones</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("banco")}
                style={styles.button5}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="bank"
                    style={styles.icon5}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Cuentas Bancarias</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("tarjeta")}
                style={styles.buttonTarjetas}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="credit-card"
                    style={styles.icon5}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Tarjetas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("egresos")}
                style={styles.button3}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="minus"
                    style={{ ...styles.icon5, left: "7%" }}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Egresos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ingreso")}
                style={styles.buttonIngresos}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="plus"
                    style={{ ...styles.icon5, left: "7%" }}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Ingresos</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("home")}
                style={styles.buttonInicio}
              >
                <View style={styles.lineaIngreso}>
                  <FontAwesomeIcon
                    name="home"
                    style={styles.icon5}
                  ></FontAwesomeIcon>
                  <Text style={styles.ingresos}>Inicio</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barraTop: {
    alignContent: "center",
    width: wp("100%"),
    height: hp("12%"), //tratar de no modificar
    top: "2%", //no modificar
  },
  iconoMenu: {
    top: "25%",
    left: "6%",
    alignSelf: "center",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  logo: {
    alignSelf: "center",
    width: wp("20%"),
    height: hp("10%"),
    position: "absolute",
    top: "6%", //no cambiar
  },
  iconoUser: {
    top: "27%",
    left: "87%",
    alignSelf: "center",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  lineaIngreso: {
    flexDirection: "row",
    alignContent: "center",
    // justifyContent: "space-between",
    width: "70%",
    top: "2%",
    left: "50%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
  },

  rectanguloFondo: {
    // top: 0,
    left: "2%",
    width: 300,
    height: 420,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
  },
  icon3: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 40,
    width: 37,
    marginLeft: -8,
    marginTop: 1,
  },
  icon5: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 40,
    width: 31,
    // marginTop: 5,
    // marginLeft: -6,
  },
  icon6: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 40,
    width: 31,
    marginTop: 3,
    marginLeft: -5,
  },
  icon7: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 35,
    width: 37,
    marginTop: 5,
    marginLeft: -6,
  },
  icon8: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 35,
    width: 40,
    marginTop: 5,
    marginLeft: -6,
  },
  icon9: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 31,
    width: 35,
    marginTop: 7,
    marginLeft: -6,
  },
  icon10: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 41,
    width: 38,
    marginTop: 10,
    marginLeft: -7,
  },
  icon11: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    height: 35,
    width: 20,
    marginTop: 2,
    marginLeft: 0,
  },
  icon4: {
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    height: 35,
    width: 30,
    marginTop: 5,
    marginLeft: -3,
  },
  icon3Column: {
    width: 35,
    // justifyContent: "center",
    height: 300,
    marginTop: 0,
  },
  group: {
    width: 198,
    height: 410,
    justifyContent: "space-between",
    marginLeft: 14,
    marginTop: 3,
  },
  inicio: {
    fontFamily: "normal",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    // top: 5,
  },
  ingresos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    marginLeft: "10%",
    // width: 150,
    // top: -3,
  },
  egresos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    // top: "0%",
  },
  tarjetas: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -14,
  },
  cuentasBancarias: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -21,
  },
  inversiones: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -27,
  },
  prestamos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -35,
  },
  presupuesto: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -41,
  },
  cerrarSesion: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 20,
    top: -49,
  },
  icon3ColumnRow: {
    height: 493,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 26,
    marginLeft: 27,
    // marginRight: 43,
  },
  // groupButtons: {
  //   width: 198,
  //   height: 475,
  //   justifyContent: "space-between",
  //   marginLeft: 14,
  //   marginTop: 11,
  // },
  button8Stack: {
    top: 106,
    left: 0,
    width: 324,
    height: 551,
    position: "absolute",
  },
  button9: {
    top: 334,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  button8: {
    top: 292,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  button7: {
    top: 250,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  button6: {
    top: 208,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  button5: {
    top: 166,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  buttonTarjetas: {
    top: 124,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  button3: {
    top: 82,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  buttonIngresos: {
    top: 41,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },
  buttonInicio: {
    // top: -2,
    left: 1,
    width: 295,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: -25,
  },

  rect2: {
    top: "4%",
    left: "2%",
    width: 58,
    height: 130,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
  },
  icon1: {
    top: "7%",
    left: "5%",
    alignSelf: "center",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  buttonStack: {
    top: 31,
    left: 1,
    width: 323,
    height: 149,
    position: "absolute",
  },
  image1: {
    // top: 0,
    // left: 85,
    alignSelf: "center",
    width: 132,
    height: 132,
    position: "absolute",
  },
  icon2: {
    top: "7%",
    left: "90%",
    alignSelf: "center",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  button8StackStack: {
    width: 334,
    height: 657,
    // marginLeft: 0,
  },
});

export default SlideMenu;
