import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';

const Navigation = () => {
    const Nav = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Nav.Navigator>
            <Nav.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Nav.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
            <Nav.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        </Nav.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})