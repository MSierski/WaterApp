import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [weight, setWeight] = useState("");
    const Nav = useNavigation();

    const register = () => {
        if(email === "" || password === "" || weight === ""){
            Alert.alert(
                "Braki w danych",
                "Niepodano wszystkich danych do rejestracji",
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

        createUserWithEmailAndPassword(auth,email,password).then((userData) => {
            console.log(userData);
            const user = userData._tokenResponse.email;
            const UserUID = auth.currentUser.uid;

            setDoc(doc(db,"Users",`${UserUID}`),{
                email: user,
                weight: weight,
            })
        })
    }
  return (
    <SafeAreaView style={styles.main}>
        <KeyboardAvoidingView>
        <View style={styles.staticTextView}>
            <Text style={styles.staticText1}>Zarejestruj się</Text>
            <Text style={styles.staticText2}>Załóż konto do serwisu</Text>
        </View>
        <View style={{marginTop:50}}>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
            <MaterialIcons name="email" size={24} color="#FFA500"/>
            <TextInput style={styles.textInput} placeholder='Email' placeholderTextColor="#FFA500" value={email} onChangeText={(text) => setEmail(text)}/>
        </View>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
            <Entypo name="lock" size={24} color="#FFA500" />
            <TextInput style={styles.textInput} placeholder='Hasło' placeholderTextColor="#FFA500" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>
        </View>
        <View style={{flexDirection: 'row', alignItems:"center"}}>
            <FontAwesome5 name="weight-hanging" size={24} color="#FFA500" />
            <TextInput style={styles.textInput} placeholder='Waga' placeholderTextColor="#FFA500" value={weight} onChangeText={(text) => setWeight(text)}/>
        </View>
        <Pressable onPress={register} style={styles.loginButton}>
            <Text style={styles.loginText}>Załóż konto</Text>
        </Pressable>
        <Pressable onPress={() => Nav.navigate("Login")}style={{marginTop: 15}}>
            <Text style={styles.registerText}>Masz już konto? Zaloguj się!</Text>
        </Pressable>
      </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:"black",
        alingItems: "center",
        padding: 10,
    },
    staticTextView: {
        justifyContent:"center",
        alignItems:"center",
        marginTop:100,
    },
    staticText1: {
        fontSize:20,
        color:"#FFA500",
        fontWeight:"bold",
    },
    staticText2: {
        fontSize: 18,
        marginTop: 8,
        fontWeight:"600",
        color:"#FFA500",
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#FFA500",
        width: 300,
        marginVertical: 20,
        marginLeft: 10,
        backgroundColor:"grey",
        color:"#FFA500",
    },
    loginButton: {
        width: 150,
        backgroundColor: "#FFA500",
        padding: 10,
        borderRadius:15,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    loginText: {
        fontSize: 15,
        textAlign:"center",
    },
    registerText: {
        textAlign: "center",
        fontSize: 20,
        color: "#FFA500",
        fontWeight: "400",
    }
})