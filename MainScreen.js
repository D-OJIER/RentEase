import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from './UserContext'; // Correct the import path
import AppNavigation from './Navigation'; // Import your navigation

const MainScreen = () => {
  const { userType, switchUserType } = useContext(UserContext); // Corrected function name

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current User Type: {userType}</Text>
      <AppNavigation /> {/* Render your navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MainScreen;
