import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from './UserContext'; // Ensure correct import path
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import AddScreen from './AddScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for example
import { Dimensions } from 'react-native'; // Import Dimensions to get screen size

const Tab = createBottomTabNavigator();

// Get screen width for responsiveness
const { width } = Dimensions.get('window');

// A scaling function for tab bar styling
const scale = (size) => (width / 375) * size; // Assuming 375 is the base width for scaling

const AppNavigation = () => {
  const { userType } = React.useContext(UserContext); // Access userType from context

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: scale(20), // Adjust tab bar height based on screen width
          },
          tabBarLabelStyle: {
            fontSize: scale(5), // Adjust label font size for responsiveness
          },
          tabBarIcon: ({ color, size }) => {
            // Setting up icons based on route name
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Search':
                iconName = 'search-outline';
                break;
              case 'Cart':
                iconName = 'cart-outline';
                break;
              case 'Add':
                iconName = 'add-circle-outline';
                break;
              case 'Dashboard':
                iconName = 'grid-outline';
                break;
              case 'Chat':
                iconName = 'chatbubble-outline';
                break;
              case 'Profile':
                iconName = 'person-outline';
                break;
              default:
                iconName = 'home-outline';
                break;
            }

            // Returning Icon component with assigned iconName
            return <Icon name={iconName} size={scale(20)} color={color} />;
          },
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />

        {userType === 'Renter' && (
          <>
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
          </>
        )}

        {userType === 'Lender' && (
          <>
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
          </>
        )}
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
