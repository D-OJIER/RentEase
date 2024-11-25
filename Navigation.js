import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from './UserContext'; // Ensure correct path
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import AddScreen from './AddScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for icons
import { Dimensions } from 'react-native'; // For responsive scaling

// Create Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Get screen width for responsive scaling
const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size; // Scale function based on screen width

// Tab Navigator for post-login navigation
const TabNavigator = () => {
  const { userType } = React.useContext(UserContext); // Access user type (Renter/Lender)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: scale(50), // Adjust tab bar height
        },
        tabBarLabelStyle: {
          fontSize: scale(10), // Adjust label font size
        },
        tabBarIcon: ({ color }) => {
          // Dynamically assign icons based on route name
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
          }

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
  );
};

// Main Navigation (Login/Signup + Tab Navigation)
const AppNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigation;
