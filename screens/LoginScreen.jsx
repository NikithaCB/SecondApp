import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginTabScreen from './LoginTabScreen'; // Separate Login Tab
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import RegisterScreen from './RegisterScreen';

// Create Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Custom Tab Bar Component (Optional)
const MyTabBar = ({state, navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/task-icon.png')}
        />
        <Text style={styles.logo_text}>Task Manager Dev</Text>
      </View>

      <View>
        <Text style={styles.text_welcome}>Welcome to Task Manager Dev</Text>
        <Text style={styles.text_desclimer}>
          Sign up or login below to manage your projects, task and productivity
        </Text>
      </View>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tabButton, isFocused && styles.activeTab]}>
              <Text style={[styles.tabText, isFocused && styles.activeText]}>
                {route.name}
              </Text>
              {isFocused && <View style={styles.underline} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default function LoginScreen() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {backgroundColor: '#fff'}, // Custom styling
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold'}, // Label styling
        tabBarIndicatorStyle: {backgroundColor: '#3E6B48'}, // Indicator color
      }}>
      <Tab.Screen name="Login" component={LoginTabScreen} />
      <Tab.Screen name="Sign Up" component={RegisterScreen} />
    </Tab.Navigator>
  );
}

// Styles for Custom Top Tab Bar
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_header: {
    color: '#420475',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  logo_text: {
    color: '#0492c2',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  text_desclimer: {
    color: '#a9a9a9',
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 15,
  },
  text_welcome: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 12,
  },
  logo: {
    height: 40,
    width: 40,
    margin: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeText: {
    color: '#333',
    fontWeight: 'bold',
  },
  underline: {
    width: '60%',
    height: 2,
    backgroundColor: '#3E6B48',
    marginTop: 4,
  },
});
