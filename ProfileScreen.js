import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Button,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { UserContext } from './UserContext';

const ProfileScreen = () => {
  const { userType, switchUserType } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [userData, setUserData] = useState({
    name: 'Ragnar Lothrok',
    email: 'ragnarlothrok@vikings.com',
    profilePicture:
      'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg',
    rentedItems: [
    { id: '1', name: 'PS5', timeRemaining: '2 days', image: 'https://st1.techlusive.in/wp-content/uploads/2024/08/PS5-Pro.jpg?impolicy=Medium_Widthonly&w=400', description: 'PS5 console in good condition.' },
    { id: '2', name: 'Sofa', timeRemaining: '5 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVZYler46lV2RP6CXzPw6NmKo0UwYC5FfYg&s', description: 'Comfortable sofa for your living room.' },
    { id: '3', name: 'Bicycle', timeRemaining: '1 day', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSey4Q0J9_3T1A7wRFfd4wfjU6_sSH-eEq5NA&s', description: 'Mountain bike with great suspension.' },
    { id: '4', name: 'Laptop', timeRemaining: '3 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_EhZgCpRWJLoYBdBB9kmf14cRvEfbVPSizA&s', description: 'High-performance laptop for professionals.' },
    { id: '5', name: 'Camera', timeRemaining: '7 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8oEHTP_G8D2TFvQ6DQRgxLOrDQwDqHUs_w&s', description: 'DSLR camera for photography enthusiasts.' },
  ],
  lentItems: [
  { id: '6', name: 'Xbox One', timeRemaining: '7 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s', description: 'Xbox One console with all accessories.' },
  { id: '7', name: 'Dining Table', timeRemaining: '10 days', image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/dining-table/i/b/g/290-4-seater-340-foam-dining-table-utkarsh-450-honey-finish-original-imah27tfhvd6tec5.jpeg?q=20&crop=false', description: 'Stylish dining table perfect for family gatherings.' },
  { id: '8', name: 'Headphones', timeRemaining: '1 day', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3dZG95KDWAB_d3gMsKLbMMYh8tpa9RrR7g&s', description: 'Noise-canceling headphones.' },
  { id: '9', name: 'Vacuum Cleaner', timeRemaining: '3 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7UoJ_FvVbsD8YknnhFSuMFms3BlDfzz-JQ&s', description: 'Efficient vacuum cleaner for home cleaning.' },
  { id: '10', name: 'Camping Tent', timeRemaining: '5 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rlU7pkJNGPfyqKnfIYyl_8uO9TgxP7FjsA&s', description: 'Spacious camping tent for outdoor adventures.' },
  { id: '11', name: 'Smartwatch', timeRemaining: '2 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOm0B4rCeH3IgsaLBqyfZrf_sceZ0MIER9TQ&s', description: 'Smartwatch with multiple fitness tracking features.' },
  { id: '12', name: 'Electric Kettle', timeRemaining: '4 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZpOiEYckmvDyXBWmpf5MgTFG-J2IQqtKog&s', description: 'Electric kettle for quick hot water.' },
  { id: '13', name: 'Microwave Oven', timeRemaining: '6 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCnfx4JpBa61zSD1EyIXQUWStWxqFPTTZ1w&s', description: 'Compact microwave oven with multiple functions.' },
  { id: '14', name: 'Lawn Mower', timeRemaining: '8 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9E8DukMSeJY5nCBVNFzayntQ2PftkccCGyA&s', description: 'Electric lawn mower for garden maintenance.' },
  { id: '15', name: 'Projector', timeRemaining: '2 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLPIMNiHByNDR9eWTkDR1sG-lZewkl7_wJeA&s', description: 'Portable projector for movies and presentations.' },
  { id: '16', name: 'Tool Kit', timeRemaining: '7 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jSY2Ulsy7EVxqkWT0H4QBTuNaxPr2ZL_7Q&s', description: 'Comprehensive tool kit for home repairs.' },
  { id: '17', name: 'Electric Guitar', timeRemaining: '9 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREc0JueVXou5-KO5s3CtgyirBFXEorKuMjig&s', description: 'Electric guitar in excellent condition for musicians.' },
  { id: '18', name: 'Recliner Chair', timeRemaining: '5 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPoequCqtTtOKqQROZ0jQoKPCDYB_3kDg6FQ&s', description: 'Comfortable recliner chair for relaxation.' },
  { id: '19', name: 'Treadmill', timeRemaining: '6 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62IkGcCegKfgUpy0DExl4xQJwd-xfQqJ0BA&s', description: 'Motorized treadmill for home workouts.' },
  { id: '20', name: 'GoPro Camera', timeRemaining: '2 days', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWY19HtWnzndebJHDdAu58UTSf3hIQwVsBzA&s', description: 'GoPro for adventure videography and photography.' },
],
  });

  const itemsToDisplay =
    userType === 'Lender' ? userData.lentItems : userData.rentedItems;

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          {userType === 'Renter' && (
            <Text style={styles.itemTime}>Time Remaining: {item.timeRemaining}</Text>
          )}
        </View>
      </TouchableOpacity>
    );

  const deleteItem = (id) => {
    const updatedLentItems = userData.lentItems.filter((item) => item.id !== id);
    setUserData((prevData) => ({ ...prevData, lentItems: updatedLentItems }));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        <View style={styles.userInfoContainer}>
          <ThemedText type="title" style={styles.userName}>
            {userData.name}
          </ThemedText>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>
      </View>

      {/* Mode Switch */}
      <View style={styles.modeSwitchContainer}>
        <Text style={styles.switchText}>
          Switch to {userType === 'Lender' ? 'Renter' : 'Lender'} Mode
        </Text>
        <Switch
          value={userType === 'Lender'}
          onValueChange={switchUserType}
          trackColor={{ false: '#767577', true: '#4A90E2' }}
          thumbColor={userType === 'Lender' ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Items Header */}
      <Text style={styles.itemsHeader}>
        {userType === 'Lender' ? 'Lent Items' : 'Rented Items'}
      </Text>
      <FlatList
        data={itemsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
        numColumns={3}
      />

      {/* Modal for Item Details */}
      {selectedItem && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
        <Text style={styles.modalTitle}>{selectedItem.name}</Text>
        <Text style={styles.modalDescription}>{selectedItem.description}</Text>
        {userType === 'Renter' && (
          <Text style={styles.modalTime}>Time Remaining: {selectedItem.timeRemaining}</Text>
        )}
        {userType === 'Lender' && (
          <Button
            title="Delete Post"
            onPress={() => deleteItem(selectedItem.id)}
          />
        )}
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </View>
    </View>
  </Modal>
)}
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background
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
  gridContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  itemCard: {
    flex: 1, // Makes each item occupy equal space in the row
    margin: 4, // Space between grid items
    backgroundColor: '#2B4D5D',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  itemImage: {
    width: '100%',
    height: 100, // Adjust height for grid layout
    resizeMode: 'cover',
  },
  itemTextContainer: {
    padding: 8,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center', // Center-align text for grid layout
  },
  itemDescription: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalTime: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
});

export default ProfileScreen;
