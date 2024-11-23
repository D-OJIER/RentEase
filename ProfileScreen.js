import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { UserContext } from './UserContext'; 

const userData = {
  name: 'Ragnar Lothrok',
  email: 'ragnarlothrok@vikings.com',
  profilePicture: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg', // Placeholder for profile picture
  rentedItems: [
    { id: '1', name: 'PS5', timeRemaining: '2 days', image: 'https://st1.techlusive.in/wp-content/uploads/2024/08/PS5-Pro.jpg?impolicy=Medium_Widthonly&w=400', description: 'PS5 console in good condition.', renterName: 'Alice' },
    { id: '2', name: 'Sofa', timeRemaining: '5 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVZYler46lV2RP6CXzPw6NmKo0UwYC5FfYg&s', description: 'Comfortable sofa for your living room.', renterName: 'Bob' },
    { id: '3', name: 'Bicycle', timeRemaining: '1 day', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSey4Q0J9_3T1A7wRFfd4wfjU6_sSH-eEq5NA&s', description: 'Mountain bike with great suspension.', renterName: 'Charlie' },
  ],
  lentItems: [
    { id: '4', name: 'Xbox One', timeRemaining: '7 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s', description: 'Xbox One console with all accessories.', lenderName: 'Ragnar Lothrok' },
    { id: '5', name: 'Dining Table', timeRemaining: '10 days', image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/dining-table/i/b/g/290-4-seater-340-foam-dining-table-utkarsh-450-honey-finish-original-imah27tfhvd6tec5.jpeg?q=20&crop=false', description: 'Stylish dining table perfect for family gatherings.', lenderName: 'Mary Jane' },
  ],
};

export default function ProfileScreen() {
  const { userType, switchUserType } = useContext(UserContext);  // Fixed the typo here

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemTimeRemaining}>Time remaining: {item.timeRemaining}</Text>
        <Text style={styles.itemOwner}>Owner: {userType === 'Lender' ? item.lenderName : item.renterName}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const itemsToDisplay = userType === 'Lender' ? userData.lentItems : userData.rentedItems;

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        <View style={styles.userInfoContainer}>
          <ThemedText type="title" style={styles.userName}>{userData.name}</ThemedText>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
      </View>

      {/* Mode Switch */}
      <View style={styles.modeSwitchContainer}>
        <Text style={styles.switchText}>Switch to {userType === 'Lender' ? 'Renter' : 'Lender'} Mode</Text>
        <Switch
          value={userType === 'Lender'}
          onValueChange={switchUserType}  // Fixed the typo here
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={userType === 'Lender' ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Items Header */}
      <Text style={styles.itemsHeader}>{userType === 'Lender' ? 'Lent Items' : 'Rented Items'}</Text>
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
    backgroundColor: '#1D3D47',  // Dark background
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular profile picture
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4A90E2', // Border color for profile picture
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 24,
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
    marginBottom: 16,
  },
  switchText: {
    color: '#ffffff',
    fontSize: 16,
  },
  itemsHeader: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: '#2B4D5D',  // Slightly lighter card color
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',  // Ensures rounded corners for content inside the card
    elevation: 2, // For Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  itemImage: {
    width: '100%',
    height: 300,  // Larger image like Instagram posts
    resizeMode: 'cover',
  },
  itemTextContainer: {
    padding: 12,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  itemDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  itemTimeRemaining: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  itemOwner: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',  // Lender/Renter name in italic
  },
  shareButton: {
    backgroundColor: '#4A90E2',  // Blue share button
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',  // Align to the left of the card
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
