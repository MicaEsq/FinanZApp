import * as firebase from "firebase";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.finanzDB");

export function reauthenticate(email, password) {
  const user = email;
 
  db.transaction((tx) => {
    tx.executeSql("select * from usuarios", [], (tx, results) => {
      var temp = [];
      
      for (let i = 0; i < results.rows.length; ++i) {
        // temp.push(results.rows.item(i));
        console.log(results.rows.item(i).email);
        if(results.rows.item(i).email == email &&
         results.rows.item(i).password == password){

          // console.log(results.rows.item(i).email);
          flag= true;
          // Alert.alert("Error!", "Este email ya esta registrado")
        }
        // console.log(temp.item(i).monto);

      }
      // if(!flag){
      // Alert.alert("Error!", "El email o la password son incorrectos")
      // }

      // navigation.navigate("home");
      // setFlatListItems(temp);
    });
  })
  return flag;
}
