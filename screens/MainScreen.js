import { StyleSheet, Text, View,Image, ScrollView, Alert, Pressable, TextInput } from 'react-native'
import * as GeoData from "expo-location"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWater, newWaterInput } from '../WaterReducer';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { getHis } from '../HistoryReducer';
import History from '../components/ImageChange';

const MainScreen = () => {
  let waterData = [
    {
      id: "1",
      value: 0.0,
    },
  ];
  const history = [];
  const dispatch = useDispatch();
  const [CurrectTemp, setCurrentTemp] = useState([]);
  const [WaterInput, setWaterinput] = useState();
  const [drink, setToDrink] = useState("");
  const [currDrinked, setCurrDrinked] = useState();
  const [DisplayCurrenctAdress, setDisplayCurrentAddress] = useState("Odczytujemy twoją lokalizacje");
  const [LocationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const Water = useSelector((state) => state.Water.water)
  const his = useSelector((state) => state.History.history)
  const UserUID = auth.currentUser.uid;
  let ifEnoughDrinked = "";  
  useEffect(() => {
      checkIfLocationEnabled();
      getCurrentLocation();
      getWeight();
  },[])
  useEffect(() => {
      getWaterHistory();
  },[])
  const checkIfLocationEnabled = async () => {
      let enabled = await GeoData.hasServicesEnabledAsync();
      if(!enabled) {
          Alert.alert(
              "Nie włączono usługi lokalizacji",
              "Daj aplikacji uprawnienia do lokalizacji",
              [
                {
                  text: "Anuluj",
                  onPress: () => console.log("Anulowano"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK") }
              ],
              { cancelable: false }
            );
      }else setLocationServicesEnabled(enabled);
  }
  const getCurrentLocation = async () => {
      let {status} = await GeoData.requestForegroundPermissionsAsync();

      if (status !== "granted"){
          Alert.alert(
              "Brak autoryzacji",
              "Proszę włączyć lokalizację na urządzeniu",
              [
                {
                  text: "Anuluj",
                  onPress: () => console.log("Anulowano"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK") }
              ],
              { cancelable: false }
            );
      }
      const {coords} = await GeoData.getCurrentPositionAsync();
      console.log(coords);

      if(coords){
          const {latitude, longitude} = coords;

          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2e7e74f9030fc7fb3555562981ed6602`)
          .then((responseGeo) => responseGeo.json())
          .then((result) => 
          setCurrentTemp(JSON.stringify(result.main.temp)),
          ).catch((error) => console.error(error))

          console.log(CurrectTemp);

          let response = await GeoData.reverseGeocodeAsync({
              latitude,
              longitude
          });

          console.log(response);

          for (let item of response){
              let address = `${item.country} ${item.city} ${item.region}`
              setDisplayCurrentAddress(address);
          }
      }
  }
  const getWeight = async () => {
    const Reference = doc(db,"Users",`${UserUID}`);
    const userWeight = await getDoc(Reference);
    const toDrink = userWeight.data().weight * 0.030;
    setToDrink(toDrink);

  }
  const trasferWaterData = () => {
    waterData[0].value = Number(WaterInput);
    waterData.value = WaterInput;
    console.log(typeof waterData[0].value);
    waterData.map((WD) => dispatch(newWaterInput(WD)));
  }
  const setWaterHistory = () => {
    Water.map((item, index) => {
      setCurrDrinked(item.value);
    });
    console.log(currDrinked);
    if(drink >= currDrinked){
      ifEnoughDrinked = "Nie"
    }else{
      ifEnoughDrinked = "Tak"
    };
    console.log(ifEnoughDrinked);
    const Date = "25.04.2023";
    setDoc(doc(db,`${UserUID}`,`${Date}`),{
      date: Date,
      waterDrinked: currDrinked,
      howMuch: ifEnoughDrinked,
  })
  }
  const getWaterHistory = async () => {
    var Date = '23.04.2023'
    const dbSnap = await getDocs(collection(db,`${UserUID}`));
    dbSnap.forEach((doc) => {
      history.push(doc.data())
    })
    console.log(history);
    history?.map((his) => dispatch(getHis(his))); 
    console.log(his) 
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={{marginTop: 30,color: '#FFA500',textAlign:"auto", marginRight: "auto"}}>{DisplayCurrenctAdress}</Text>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row', height: 250, justifyContent: 'space-between'}}>
        <View style={styles.borderData}>
          <View style={styles.DataDisplay}>
            <Text style={styles.DataText}>Ilość zalecena</Text>
            <Text style={styles.DataText}>{drink} L</Text>
          </View>
          <View style={styles.DataDisplay}>
            <Text style={styles.DataText}>Ilość obecna</Text>
            {Water.map((item, index) => (
              <Text style={styles.DataText}>{item.value} L</Text>
            ))}
          </View>
          <View style={styles.DataDisplay}>
            <Text style={styles.DataText}>Temperatura</Text>
            <Text style={styles.DataText}>{CurrectTemp} °C</Text>
          </View>
        </View>
        <View style={styles.borderData}>
          <History style={{flex: 1}} item={drink}/>
        </View>
      </View>
      <View>
        <Text style={styles.inputH}>Ile wypiłeś wody?</Text>
        <TextInput style={{backgroundColor:"grey"}} onChangeText={setWaterinput}/>
        <Pressable onPressIn={trasferWaterData} onPress={setWaterHistory}>
          <Text style={styles.InputB}>Dodaj</Text>
        </Pressable>
      </View>
      <View style={{flex: 1, width: '100%'}}>
      <View>
          <Text style={styles.HistoryText}>Historia</Text>
        </View>
        <View style={{flexDirection: 'row',}}>
          <Text style={styles.HistoryDBText}>Data</Text>
          <Text style={styles.HistoryDBText} >Ile wypito wody w litrach</Text>
          <Text style={styles.HistoryDBText} >Czy wypito wystarczająco?</Text>
        </View>     
        <ScrollView style={{flex: 1, backgroundColor: "black"}}>
        {his.map((item, index) => (
          <View style={styles.HistoryDB} key={index}>
              <Text style={styles.HistoryDBText}>{item.date}</Text>
              <Text style={styles.HistoryDBText}>{item.waterDrinked}</Text>
              <Text style={styles.HistoryDBText}>{item.howMuch}</Text>
          </View>
        ))}
      </ScrollView>  
      
      </View>  
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems:"center"
      },
      borderData: {
        borderColor: '#FFA500',
        borderWidth:0.8,
        alignItems:'center',
        justifyContent: 'space-evenly',
        flex: 1,
      },
      DataDisplay: {
        borderWidth:0.5,
        borderRadius: 15,
        borderColor: '#FFA500',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      DataText: {
        color: '#FFA500',
        fontSize: 13,
        flex: 1,
        marginLeft: 10,
        textAlign: 'center'
      },
      HistoryText: {
        color: '#FFA500',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 30,
        borderColor: '#FFA500',
        borderWidth:0.5,
      },
      HistoryDB: {
        borderWidth:0.5,
        borderRadius: 15,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      HistoryDBText: {
        flex: 1,
        fontSize: 13,
        color: '#FFA500',
        textAlign: 'center',
        fontSize: 15,
      },
      inputH: {
        color: '#FFA500',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30,
        borderColor: '#FFA500',
        borderWidth:0.5,
      },
      InputB: {
        color: '#FFA500',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30,
        borderColor: '#FFA500',
        borderWidth:0.5,
      }
      
})