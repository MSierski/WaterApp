import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Navigation';

export default function App() {
  return (
    <Provider store={store} style={{flex:1}}>
      <Navigation/>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});
