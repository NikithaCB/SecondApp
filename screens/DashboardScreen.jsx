import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { createDrawerNavigator } from '@react-navigation/drawer';


// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//     </Drawer.Navigator>
//   );
// }

export default function DashboardScreen() {
  const Drawer = createDrawerNavigator();

  console.log('On Dashboard Screeen');

  return (
    <View style={styles.scrollView}>
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
     <Icon name="plus-circle" size={24} color="#0492c2" style={styles.icon} />
    </View>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  topBar: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'blue',
  }
});

