import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileCreationScreen from './screens/ProfileCreationScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      {/* <View>
        <Text style={styles.textStyle}>Demo of Components</Text>
      </View>
      <View>
        <Button
          style={[styles.button, {backgroundColor: 'red'}]}
          textColor="white"
          labelStyle={{fontSize: 15}}>
          Press Me
        </Button>
        <Button
          style={[styles.button, {backgroundColor: 'red'}]}
          textColor="white"
          labelStyle={{fontSize: 15}}>
          Press Me
        </Button>
        <Button
          style={[styles.button, {backgroundColor: 'red'}]}
          textColor="white"
          labelStyle={{fontSize: 15}}>
          Press Me
        </Button>
        <Button
          style={[styles.button, {backgroundColor: 'red'}]}
          textColor="white"
          labelStyle={{fontSize: 15}}>
          Press Me
        </Button>
      </View> */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* headerShown for the visibility */}
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
          {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown:false}} />
          <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: '100%',
    borderRadius: 3,
    marginBottom: 10,
  },
});

export default App;
