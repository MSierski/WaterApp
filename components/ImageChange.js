import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useSelector } from 'react-redux';

const History = (item) => {
    const [hisDate, setHisDate] = useState();
    const Water = useSelector((state) => state.Water.water)
    const [waterLvL, setWaterLvL] = useState();
    const procent = 0;

    const getImage = () => {
        Water.map((item, index) => {
          setWaterLvL(item.value);
        })

        procent = waterLvL / item * 100

      }

  return (
    <View>
      {procent === 0 ? (
        <Image style={styles.imageStyle} source={require("../assets/cat1.jpg")}/>
      ) : (
        <Image style={styles.imageStyle} source={require('../assets/cat2.jpg')}/>
      )}
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  imageStyle: {
    transform: [{scale : 0.15}]
  }
})