import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Nav = useNavigation();

    useEffect(() => {
        const logout = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                Nav.navigate("Main");
            }
        })

        return logout;
    },[])

    const login = () => {
        signInWithEmailAndPassword(auth,email,password).then((userData) => {
            console.log(userData);
            const user = userData.user;
        })
    }

  return (
    <SafeAreaView style={styles.main}>
    <KeyboardAvoidingView>
      <View style={styles.staticTextView}>
        <Text style={styles.staticText1}>Zaloguj się</Text>
        <Text style={styles.staticText2}>Zaloguj się do swojego konta</Text>
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
        <Pressable onPress={login} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => Nav.navigate("Register")}style={{marginTop: 15}}>
            <Text style={styles.registerText}>Nie masz konta? Zarejestruj się!</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

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