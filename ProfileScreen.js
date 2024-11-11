import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, View, FlatList } from 'react-native';
import { ThemedText } from './ThemedText';
import { UserContext } from './UserContext'; // Corrected import path

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  rentedItems: [
    { id: '1', name: 'PS5', timeRemaining: '2 days' },
    { id: '2', name: 'Sofa', timeRemaining: '5 days' },
    { id: '3', name: 'Bicycle', timeRemaining: '1 day' },
  ],
  lentItems: [
    { id: '4', name: 'Xbox One', timeRemaining: '7 days' },
    { id: '5', name: 'Dining Table', timeRemaining: '10 days' },
  ],
};

export default function ProfileScreen() {
  const { userType, switchUserType } = useContext(UserContext); // Get userType from context

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemTimeRemaining}>Time remaining: {item.timeRemaining}</Text>
    </View>
  );

  const itemsToDisplay = userType === 'Lender' ? userData.lentItems : userData.rentedItems;

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Profile</ThemedText>
      <Text style={styles.description}>User details and preferences</Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <View style={styles.modeSwitchContainer}>
        <Text style={styles.switchText}>Switch to {userType === 'Lender' ? 'Renter' : 'Lender'} Mode</Text>
        <Switch
          value={userType === 'Lender'}
          onValueChange={switchUserType} // Use context's switchUserType
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={userType === 'Lender' ? '#fff' : '#f4f3f4'}
        />
      </View>

      <Text style={styles.itemsHeader}>{userType === 'Lender' ? 'Lent Items:' : 'Rented Items:'}</Text>
      <FlatList
        data={itemsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
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
  itemsHeader: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
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
