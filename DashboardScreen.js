import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Animated, Image } from 'react-native';
import { ThemedText } from './ThemedText';

// Dummy data for rented items (Renters' dashboard) with online URLs for images
const initialRentedItems = [
  { id: '1', name: 'PS5', timeRemaining: 2, image: 'https://www.gizmochina.com/wp-content/uploads/2020/09/PlayStation-5.jpg' }, // Example online URL
  { id: '2', name: 'Sofa', timeRemaining: 5, image: 'https://i5.walmartimages.com/asr/d36a4209-4edb-49c0-9b7e-32f96311f564_1.a82a0344a085884be0395706940ba5e3.jpeg' },
  { id: '3', name: 'Laptop', timeRemaining: 3, image: 'https://imgeng.jagran.com/images/2023/nov/laptop1700656366159.jpg' },
  { id: '4', name: 'Washing Machine', timeRemaining: 7, image: 'https://whirlpoolindia.vtexassets.com/arquivos/ids/167574/1.png?v=638320917724870000' },
  { id: '5', name: 'Refrigerator', timeRemaining: 10, image: 'https://media.croma.com/image/upload/v1682588643/Croma%20Assets/Large%20Appliances/Refrigerator/Images/267758_0_p1ddwp.png' },
  { id: '6', name: 'Gaming Chair', timeRemaining: 4, image: 'https://www.makemychairs.com/cdn/shop/files/BLACK_PHANTOM_LIFE_STYLE_002.jpg?v=1722407831&width=1946' },
  { id: '7', name: 'Microwave', timeRemaining: 6, image: 'https://morphyrichardsindia.com/cdn/shop/files/4_f5253327-562f-4c4c-aaa8-d8dcd7fab461.png?v=1722078726&width=416' },
  { id: '8', name: 'Air Conditioner', timeRemaining: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2HKGTP3X_sdd9_jw1Mxv0M_MYbaYFV2pTFw&s' },
];

// The Renter's Dashboard
export default function RenterDashboard() {
  const [rentedItems, setRentedItems] = useState(initialRentedItems);

  // Function to handle press animation for item interaction
  const animateItemPress = (id) => {
    const itemAnimation = new Animated.Value(1); // Unique animation per item
    Animated.sequence([
      Animated.timing(itemAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    return itemAnimation;
  };

  // Function to handle extending the rental period
  const handleExtendItem = (id) => {
    setRentedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, timeRemaining: item.timeRemaining + 3 } : item
      )
    );
  };

  // Function to handle item removal (return item)
  const handleReturnItem = (id) => {
    setRentedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>Your Rented Items</ThemedText>

      {/* FlatList to render rented items */}
      <FlatList
        data={rentedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const animatedScale = animateItemPress(item.id);

          return (
            <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
              <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={0.7}
                onPress={() => animateItemPress(item.id)}
              >
                {/* Display the item image from online URL */}
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText style={styles.itemTime}>
                  Time remaining: {item.timeRemaining} day{item.timeRemaining !== 1 && 's'}
                </ThemedText>

                {/* Extend Button */}
                <TouchableOpacity
                  style={styles.extendButton}
                  onPress={() => handleExtendItem(item.id)}
                >
                  <ThemedText style={styles.buttonText}>Extend</ThemedText>
                </TouchableOpacity>

                {/* Return Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleReturnItem(item.id)}
                >
                  <ThemedText style={styles.removeText}>Return</ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background for the dashboard
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#2B4D5D', // Background color for item containers
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Light border color for the item containers
  },
  itemName: {
    color: '#ffffff', // White text for item names
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemTime: {
    color: '#cccccc', // Lighter color for time remaining text
    marginTop: 4,
  },
  itemImage: {
    width: '100%',  // Image width set to 100% of container width
    height: 150,    // Fixed height for images
    borderRadius: 8, // Rounded corners for images
    marginBottom: 10, // Spacing between image and text
  },
  // Extend Button styling (Orange)
  extendButton: {
    marginTop: 10,
    backgroundColor: '#FF8C00', // Orange background for Extend button
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%', // Button width reduced to 40% of the container width
    alignSelf: 'center', // Center the button horizontally
  },
  // Return Button styling (Red)
  removeButton: {
    marginTop: 10,
    backgroundColor: '#E74C3C', // Red background for Return button
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%', // Button width reduced to 40% of the container width
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: '#ffffff', // White text for buttons
    fontWeight: 'bold',
  },
  removeText: {
    color: '#ffffff', // White text for return button
    fontWeight: 'bold',
  },
});
