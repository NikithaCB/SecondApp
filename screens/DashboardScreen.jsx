import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {Card} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId} = route.params || {};

  const [loading, setLoading] = useState(true);
  const [userBio, setUserBio] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const drawerRef = useRef(null);

  // const saveEmail = async (email) => {
  //   try {
  //     await AsyncStorage.setItem('email', email);
  //     console.log('✅ Email saved successfully:', email);
  //   } catch (error) {
  //     console.error('❌ Error saving email:', error);
  //   }
  // };

  useEffect(() => {
    if (!userId) {
      navigation.navigate('LoginScreen');
    } else {
      fetchUserBio();
      fetchEmail();
    }
  }, [userId, navigation]);

  const fetchUserBio = async () => {
    try {
      const response = await axios.get(
        `https://your-api-url.com/user/bio/${userId}`,
      );
      setUserBio(response.data.bio || 'No bio available.');
      setUserName(response.data.name || '....');
    } catch (error) {
      Alert.alert('Error', 'Failed to load user bio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        console.log('📧 Email fetched in DashboardScreen:', storedEmail); // 🔎 Add this log
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('❌ Error fetching email:', error);
      }
    };
  
    fetchEmail();
  }, []);
  
  useEffect(() => {
    AsyncStorage.getItem('email').then(email => {
      console.log('🟡 Stored Email in AsyncStorage:', email);
    });
  }, []);
  

  const renderDrawer = () => (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="home" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('ProfileCreation', {email})}>
        <Icon name="user" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="cog" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Icon name="sign-out" size={24} color="black" style={styles.icon} />
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={renderDrawer}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View>
            <TouchableOpacity
              onPress={() => drawerRef.current.openDrawer()}
              style={styles.menuButton}>
              <Icon name="bars" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View>
            <Card style={styles.cardStyle}>
              <Card.Content>
                <Text style={styles.cardTitle}>Welcome {userName}!</Text>
                {/* {loading ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  
                )} */}
                <Text style={styles.cardText}>{userBio}</Text>
              </Card.Content>
            </Card>

            <Card style={styles.cardStyle}>
              <Card.Content>
                <Text style={styles.cardTitle}>Skills Swapped</Text>
                <Text style={styles.cardText}>
                  On click on this you will be able to check the skills that you
                  have shared.
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.cardStyle}>
              <Card.Content>
                <Text style={styles.cardTitle}>Match Now</Text>
                <Text style={styles.cardText}>
                  On click on this you will be able to see the perfect Match.
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.cardStyle}>
              <Card.Content>
                <Text style={styles.cardTitle}>Tasks</Text>
                <Text style={styles.cardText}>
                  Scheduled learning sessions.
                </Text>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>

        <View style={styles.footerNav}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={styles.footerItem}>
            <Icon name="dashboard" size={24} color="black" />
            <Text>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileCreation')}
            style={styles.footerItem}>
            <Icon name="plus-circle" size={24} color="black" />
            <Text>Profile Creation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MatchProfile')}
            style={styles.footerItem}>
            <Icon name="users" size={24} color="black" />
            <Text>Match Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.footerItem}>
            <Icon name="user" size={24} color="black" />
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  menuButton: {
    left: 10,
    marginBottom: 20,
    zIndex: 5,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
  },
  cardStyle: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 15,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
});
