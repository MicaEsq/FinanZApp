import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Select2 from "react-native-select-two";
// import { Dropdown } from "react-native-material-dropdown";

const mockData = [
  { id: 1, name: "Día" },
  { id: 2, name: "Semana" },
  { id: 3, name: "Mes" },
  { id: 4, name: "Año" },
];

// create a component
class ModalTiempo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "black", fontSize: 15, top: "1%", left: "3%" }}>
          Filtro por:
        </Text>
        <Select2
          isSelectSingle
          style={{ borderRadius: 20 }}
          colorTheme={"#ffde59"}
          popupTitle="Filtro"
          cancelButtonText="Cancelar"
          selectButtonText="Filtrar"
          showSearchBox={false}
          title="Filtro"
          // style={}
          data={mockData}
          onSelect={(data) => {
            this.setState({ data });
          }}
          onRemoveItem={(data) => {
            this.setState({ data });
          }}
        />
      </View>
    );
  }
}
export default ModalTiempo;

// class Inputs extends Component {
//   state = {
//     dia: "",
//     semana: "",
//     mes: "",
//     año: "",
//   };
//   handleMonto = (Number) => {
//     this.setState({ dia: Number });
//   };
//   handleTipo = (text) => {
//     this.setState({ semana: text });
//   };
//   handleFecha = (Date) => {
//     this.setState({ mes: Date });
//   };
//   handleOrigen = (text) => {
//     this.setState({ año: text });
//   };

//   //    login = (email, pass) => {
//   //       alert('email: ' + email + ' password: ' + pass)
//   //    }
//   render() {
//     // const [estado, navigate] = this.props.navigation;
//     // let data = [
//     //   {
//     //     value: "Plazo fijo",
//     //   },
//     //   {
//     //     value: "Titulos y acciones",
//     //   },
//     //   {
//     //     value: "Divisas",
//     //   },
//     //   {
//     //     value: "Bonos",
//     //   },
//     //   {
//     //     value: "Otros",
//     //   },
//     // ];
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.vista}>
//           <Text style={{ color: "black", fontSize: 20, top: "-2%" }}>
//             Añadir Inversión:
//           </Text>

//           <TextInput
//             style={styles.input}
//             // underlineColorAndroid="transparent"

//             placeholder="   Monto"
//             placeholderTextColor="grey"
//             //   autoCapitalize="none"
//             onChangeText={this.handleMonto}
//           />

//           {/* <TextInput
//             style={styles.input}
//             underlineColorAndroid="transparent"
//             placeholder="   Tipo"
//             placeholderTextColor="grey"
//             //   autoCapitalize="none"
//             onChangeText={this.handleTipo}
//           /> */}
//           <View style={{ width: "90%", marginLeft: "5%", top: "-10%" }}>
//             <Text style={{ top: "35%", color: "grey" }}>Tipo</Text>
//             {/* <Dropdown lable="Plazo fijo" data={data} /> */}
//           </View>
//           <TextInput
//             style={{ ...styles.input, top: "-10%" }}
//             underlineColorAndroid="transparent"
//             placeholder="   Fecha"
//             placeholderTextColor="grey"
//             //   autoCapitalize="none"
//             onChangeText={this.handleFecha}
//           />

//           <TextInput
//             style={{ ...styles.input, top: "-10%" }}
//             underlineColorAndroid="transparent"
//             placeholder="   Origen"
//             placeholderTextColor="grey"
//             //   autoCapitalize="none"
//             onChangeText={this.handleOrigen}
//           />
//         </View>
//       </ScrollView>
//     );
//   }
// }

// export default Inputs;

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "10%",
    // backgroundColor: "white",
    borderRadius: 10,
    top: "5%",
    left: "57%",
  },
  vista: {
    paddingTop: "15%",
    width: "90%",
    backgroundColor: "white",
    marginLeft: "5%",
  },
  input: {
    margin: 7,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    // color: "grey",
  },
  //   submitButton: {
  //     backgroundColor: "#ffde59",
  //     padding: 10,
  //     margin: 15,
  //     height: 40,
  //     borderRadius: 10,
  //   },
  //   submitButtonText: {
  //     color: "black",
  //   },
  //   iconRow: {
  //     width: "80%",
  //     height: 52,
  //     flexDirection: "row",
  //     // justifyContent: "center",
  //     marginTop: "10%",
  //     left: "3%",
  //     // marginLeft: ,
  //     // marginRight: "0%",
  //   },
});
