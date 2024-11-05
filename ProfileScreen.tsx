import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  rentedItems: [
    { id: '1', name: 'PS5', timeRemaining: '2 days' },
    { id: '2', name: 'Sofa', timeRemaining: '5 days' },
    { id: '3', name: 'Bicycle', timeRemaining: '1 day' },
  ],
};

export default function ProfileScreen() {
  const [isLenderMode, setIsLenderMode] = useState(false);

  const toggleMode = () => setIsLenderMode((prevMode) => !prevMode);

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Profile</ThemedText>
      <Text style={styles.description}>User details and preferences</Text>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>
      
      <View style={styles.modeSwitchContainer}>
        <Text style={styles.switchText}>Switch to {isLenderMode ? 'Renter' : 'Lender'} Mode</Text>
        <Switch 
          value={isLenderMode} 
          onValueChange={toggleMode} 
          trackColor={{ false: '#767577', true: '#4A90E2' }} 
          thumbColor={isLenderMode ? '#fff' : '#f4f3f4'} 
        />
      </View>

      <Text style={styles.rentedItemsHeader}>Rented Items:</Text>
      <FlatList
        data={userData.rentedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemTimeRemaining}>Time remaining: {item.timeRemaining}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 16,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  userName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#ccc',
    fontSize: 16,
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  switchText: {
    color: '#ffffff',
    fontSize: 16,
  },
  rentedItemsHeader: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#2B4D5D',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 16,
  },
  itemTimeRemaining: {
    color: '#ccc',
    fontSize: 14,
  },
});
