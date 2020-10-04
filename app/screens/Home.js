import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Grafico from "../components/Grafico";

import { SwipeListView } from "react-native-swipe-list-view";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

function home(props) {
  const { navigation } = props;
  const [version, setVersion] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItemsSaldos, setFlatListItemsSaldos] = useState([]);
  let [flatListItemsIversiones, setFlatListItemsInversiones] = useState([]);
  let [flatListItemsPrestamos, setFlatListItemsPrestamos] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    db.transaction((tx) => {
      tx.executeSql("select * from egresos", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setRefreshing(false);
      });
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select tipoDeMedio,sum(monto) as monto from egresos group by tipoDeMedio",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select cuenta, sum(monto) as monto from egresos group by cuenta ",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.item(i).cuenta != "") {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
          }
          setFlatListItemsSaldos(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestatario' order by fechaVto",
        [],
        (tx, results) => {
          var temp = [];
          var totalisimo = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            totalisimo = totalisimo + results.rows.item(i).monto;
            console.log(results.rows.item(i));
          }
          console.log("Total: ", totalisimo);
          setFlatListItemsPrestamos(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "select * from inversiones where vtoPlazoFijo!='' order by vtoPlazoFijo ",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.item(i).cuenta != "") {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
          }
          setFlatListItemsInversiones(temp);
        }
      );
    });
  };

  
  //-----EGRESOS--------------------------------------------------------------

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select tipoDeMedio,sum(monto) as monto from egresos group by tipoDeMedio",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  

  let listItemView = (egresos) => {
    console.log(egresos.id);
    return (
      <View
        key={egresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>Tipo: {egresos.tipoDeMedio}</Text>
      </View>
    );
  };

  //--------SALDOS------------------------------------------------------------------
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select cuenta, sum(monto) as monto from egresos group by cuenta ",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.item(i).cuenta != "") {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
          }
          setFlatListItemsSaldos(temp);
        }
      );
    });
  }, []);
  let listItemViewSaldos = (egresos) => {
    console.log(egresos.monto);
    return (
      <View
        key={egresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>Cuenta: {egresos.cuenta}</Text>
      </View>
    );
  };
  //--------INVERSIONES------------------------------------------------------------------
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from inversiones where vtoPlazoFijo!='' order by vtoPlazoFijo ",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.item(i).cuenta != "") {
              temp.push(results.rows.item(i));
              console.log(results.rows.item(i));
            }
          }
          setFlatListItemsInversiones(temp);
        }
      );
    });
  }, []);
  let listItemViewInversiones = (egresos) => {
    console.log(egresos.monto);
    return (
      <View
        key={egresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>Fecha de Vto: {egresos.vtoPlazoFijo}</Text>
        <Text>Origen: {egresos.origen}</Text>
      </View>
    );
  };
  //--------PRESTAMOS------------------------------------------------------------------
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from prestamos where rol='Prestatario' order by fechaVto",
        [],
        (tx, results) => {
          var temp = [];
          var totalisimo = 0;
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            totalisimo = totalisimo + results.rows.item(i).monto;
            console.log(results.rows.item(i));
          }
          setFlatListItemsPrestamos(temp);
        }
      );
    });
  }, []);
  let listItemViewPrestamos = (egresos) => {
    console.log(egresos.monto);
    return (
      <View
        key={egresos.id}
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30 }}>${egresos.monto}</Text>
        <Text>Fecha de Vto: {egresos.fechaVto}</Text>
        <Text>Origen: {egresos.nombreActor}</Text>
      </View>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setVersion(Math.random());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.barraTop}>
        <FontAwesomeIcon
          name="navicon"
          style={styles.iconoMenu}
          onPress={() => navigation.navigate("slideMenu")}
        ></FontAwesomeIcon>
        <Image
          source={require("../../assets/logoHome.png")}
          resizeMode="contain"
          style={styles.logo}
        ></Image>
        <FontAwesomeIcon
          name="file-excel-o"
          style={styles.iconoBell}
          onPress={() => navigation.navigate("opciones")}
        ></FontAwesomeIcon>
      </View>
      <ScrollView
        horizontal={false}
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ScrollView horizontal={false}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ top: "-8%", height: heightPercentageToDP("50%") }}
          >
            <Grafico version={version} />
          </ScrollView>
        </ScrollView>
        <Text
          style={styles.egresos}
          onPress={() => navigation.navigate("egresos")}
        >
          Egresos {">"}
        </Text>
        <View
          style={{
            backgroundColor: "#ffde59",
            flex: 1,
            height: heightPercentageToDP("30%"),
          }}
        >
          <View
            style={{
              backgroundColor: "#ffde59",
              width: widthPercentageToDP("120%"),
              height: heightPercentageToDP("15%"),
              borderRadius: 20,
              top: "5%",
            }}
          >
            <SwipeListView
              style={{ top: "0%", width: widthPercentageToDP("91%") }}
              horizontal={true}
              data={flatListItems}
              renderItem={({ item }) => listItemView(item)}
              rightOpenValue={-180}
              scrollEnabled={true}
            />
          </View>
        </View>
        <Text
          style={styles.saldos}
          onPress={() => props.navigation.navigate("banco")}
        >
          Saldos egresos {">"}
        </Text>
        <View
          style={{
            backgroundColor: "#ffde59",
            flex: 1,
            height: heightPercentageToDP("30%"),
            top: "-4%",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffde59",
              width: widthPercentageToDP("120%"),
              height: heightPercentageToDP("15%"),
              borderRadius: 20,
            }}
          >
            <SwipeListView
              style={{
                width: widthPercentageToDP("91%"),
                height: heightPercentageToDP("40%"),
              }}
              horizontal={true}
              data={flatListItemsSaldos}
              renderItem={({ item }) => listItemViewSaldos(item)}
              rightOpenValue={-180}
              scrollEnabled={true}
            />
          </View>
        </View>
        <View style={{ top: "-10%" }}>
          <Text style={styles.vencimientos}>Vencimientos</Text>
          <View
            style={{
              height: 1,
              width: "100%",
              top: "1%",
              backgroundColor: "black",
            }}
          />
          <Text style={{ ...styles.vencimientos, fontSize: 20, top: "5%" }}>
            Inversiones:
          </Text>
          <View
            style={{
              backgroundColor: "#ffde59",
              flex: 1,
              top: "7%",
            }}
          >
            <View style={styles.container}>
              <SwipeListView
                style={{
                  top: "0%",
                  width: widthPercentageToDP("90%"),
                }}
                horizontal={true}
                data={flatListItemsIversiones}
                renderItem={({ item }) => listItemViewInversiones(item)}
                rightOpenValue={-180}
                scrollEnabled={true}
              />
            </View>
          </View>
          <Text style={{ ...styles.vencimientos, top: "12%", fontSize: 20 }}>
            Prestamos:
          </Text>
          <View
            style={{
              backgroundColor: "#ffde59",
              flex: 1,
              top: "15%",
            }}
          >
            <View style={styles.container}>
              <SwipeListView
                style={{
                  top: "0%",
                  width: widthPercentageToDP("90%"),
                }}
                horizontal={true}
                data={flatListItemsPrestamos}
                renderItem={({ item }) => listItemViewPrestamos(item)}
                scrollEnabled={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,222,89,1)",
  },
  scroll: {
    width: wp("100"),
    height: hp("180%"),
    padding: 15,
  },
  barraTop: {
    alignContent: "center",
    width: wp("100%"),
    height: hp("12%"),
    top: "2%",
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
    top: "6%",
  },
  iconoBell: {
    top: "27%",
    left: "87%",
    alignSelf: "center",
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
  },
  egresos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    left: "5%",
  },
  saldos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    top: "-5%",
    left: "5%",
  },
  vencimientos: {
    fontFamily: "normal",
    color: "#121212",
    fontSize: 25,
    top: "0%",
    left: "6%",
  },
});

export default home;
