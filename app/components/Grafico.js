import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

// const screenWidth = Dimensions.get("window").width;
export default function Grafico(props) {
  // render() {
  const screenWidth = Dimensions.get("window").width;
  const [totalIngresos, setTotalIngresos] = useState(1);
  const [totalEgresos, setTotalEgresos] = useState(1);
  const [totalInversiones, setTotalInversiones] = useState(1);
  const [totalOtorgados, setTotalOtorgados] = useState(1);
  const [totalRecibidos, setTotalRecibidos] = useState(1);
  const [presupIngresos, setpresupIngresos] = useState(1);
  const [presupEgresos, setpresupEgresos] = useState(1);
  const [presupInversiones, setpresupInversiones] = useState(1);
  const [presupOtorgados, setpresupOtorgados] = useState(1);
  const [presupRecibidos, setpresupRecibidos] = useState(1);
  // console.log("el dato es", totalIngresos);
  useEffect(() => {
    obtenerTotales();
  }, [props.version]);

  const obtenerTotales = () => {
    //sumo ingresos
    db.transaction((tx) => {
      tx.executeSql("select * from ingresos", [], (tx, results) => {
        var temp = [];
        var tot = 0;
        //console.log("Ingresos",results.rows)
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          tot = tot + results.rows.item(i).monto;
        }
        if(tot == 0){
          tot = 1;}
        setTotalIngresos(tot);
        
        console.log("ingresos", tot);
      }); //tx
    }); //db
    //sumo presupuesto
    db.transaction((tx) => {
      tx.executeSql(
        "select * from presupuestos where categoria =?",
        ["ingresos"],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Presupuesto",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setpresupIngresos(tot);
          console.log("presupuesto", tot);
        }
      ); //tx
    }); //db
    //EGRESOS
    db.transaction((tx) => {
      tx.executeSql("select * from egresos", [], (tx, results) => {
        var temp = [];
        var tot = 0;
        //console.log("Ingresos",results.rows)
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          tot = tot + results.rows.item(i).monto;
        }
        if(tot == 0){
          tot = 1;}
        setTotalEgresos(tot);
        console.log("egresos", tot);
      }); //tx
    }); //db
    db.transaction((tx) => {
      tx.executeSql(
        "select * from presupuestos where categoria =?",
        ["egresos"],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Presupuesto",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setpresupEgresos(tot);
          console.log("presupuesto", tot);
        }
      ); //tx
    }); //db
    //INVERSION
    db.transaction((tx) => {
      tx.executeSql("select * from inversiones", [], (tx, results) => {
        var temp = [];
        var tot = 0;
        //console.log("Ingresos",results.rows)
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          tot = tot + results.rows.item(i).monto;
        }
        if(tot == 0){
          tot = 1;}
        setTotalInversiones(tot);
        console.log("inversiones", tot);
      }); //tx
    }); //db
    db.transaction((tx) => {
      tx.executeSql(
        "select * from presupuestos where categoria =?",
        ["inversiones"],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Presupuesto",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setpresupInversiones(tot);
          console.log("presupuesto", tot);
        }
      ); //tx
    }); //db
    //PRESTAMO OTORGADO
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestamista'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Ingresos",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setTotalOtorgados(tot);
          console.log("otorgado", tot);
        }
      ); //tx
    }); //db
    db.transaction((tx) => {
      tx.executeSql(
        "select * from presupuestos where categoria =?",
        ["prestamosOtorgados"],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Presupuesto",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setpresupOtorgados(tot);
          console.log("presupuesto", tot);
        }
      ); //tx
    }); //db
    //PRESTAMO RECIBIDO
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestatario'",
        [],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Ingresos",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = tot + results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setTotalRecibidos(tot);
          console.log("recibido", tot);
        }
      ); //tx
    }); //db
    db.transaction((tx) => {
      tx.executeSql(
        "select * from presupuestos where categoria =?",
        ["prestamosRecibidos"],
        (tx, results) => {
          var temp = [];
          var tot = 0;
          //console.log("Presupuesto",results.rows)
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            tot = results.rows.item(i).monto;
          }
          if(tot == 0){
            tot = 1;}
          setpresupRecibidos(tot);
          console.log("presupuesto", tot);
        }
      ); //tx
    }); //db
  };

  const data = {
    labels: [
      "Egresos",
      "Ingresos",
      " Inversiones ",
      " P.Otorgados ",
      "P.Recibidos",
    ],
    legend: ["Realidad", "Presupuestado"],
    // values:[30,70,90,100],
    data: [
      [totalEgresos, presupEgresos],
      [totalIngresos, presupIngresos],
      [totalInversiones, presupInversiones],
      [totalOtorgados, presupOtorgados],
      [totalRecibidos, presupRecibidos],
    ],
    barColors: ["#ffa726", "#ffff70"],
  };

  return (
    <View
      style={{
        width: "100%",
        // width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("40%"),
        top: "8%",
        backgroundColor: "white",
        borderRadius: 20,
      }}
      // onAccessibilityAction={totIngresos}
    >
      <StackedBarChart
        style={{ marginLeft: 7, borderRadius: 13 }}
        data={data}
        width={550}
        height={240}
        // elevation={10}
        // marginLeft={8}
        // width={screenWidth}
        // height={250}
        // withHorizontalLabels={false}
        // yAxisInterval={0,10000}
        // yAxisSuffix={}
        // yAxisInterval={-1}
        yLabelsOffset={true}
        yAxisLabel="$"
        // verticalLabelRotation={180}
        // formatYLable=
        chartConfig={{
          // left: ,
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          // backgroundGradientTo: "#ffa726",
          backgroundGradientTo: "white",
          // labelColor: "pink",
          // marginLeft: "100%",
          barPercentage: 0.7,
          // borderRadius: 20,
          decimalPlaces: 0, // optional, defaults to 2dp

          color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
          // propsForVerticalLables: {},
          // propsForDots: {
          //   r: "6",
          //   strokeWidth: "2",
          //   stroke: "#ffa726",
          //   // stroke: "violet",
          // },
        }}
      />
    </View>
  );
  // }
}
