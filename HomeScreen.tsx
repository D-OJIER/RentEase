import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const items = [
    { id: '1', name: 'PlayStation 5', description: 'Latest gaming console with immersive experiences' },
    { id: '2', name: 'Sofa Set', description: 'Comfortable 3-seater with modern design' },
    { id: '3', name: 'Mountain Bike', description: 'Rugged bike suitable for all terrains' },
    { id: '4', name: 'Projector', description: '4K projector for home theater setup' },
    { id: '5', name: 'Dining Table', description: 'Wooden dining table set with 4 chairs' },
    { id: '6', name: 'Guitar', description: 'Acoustic guitar, perfect for beginners' },
    { id: '7', name: 'Air Conditioner', description: 'Energy-efficient AC with fast cooling' },
    { id: '8', name: 'Laptop', description: 'Lightweight laptop with powerful performance' },
    { id: '9', name: 'Coffee Machine', description: 'Brews a perfect cup of coffee every time' },
    { id: '10', name: 'Electric Scooter', description: 'Eco-friendly scooter for city commute' },
    { id: '11', name: 'Camera', description: 'DSLR camera with high-resolution lens' },
    { id: '12', name: 'Camping Tent', description: 'Waterproof tent for 4 people' },
    { id: '13', name: 'Fitness Tracker', description: 'Monitors steps, heart rate, and sleep' },
    { id: '14', name: 'Smartphone', description: 'Latest model with high-quality camera' },
    { id: '15', name: 'VR Headset', description: 'Virtual reality headset for immersive experiences' },
    { id: '16', name: 'Electric Guitar', description: 'High-quality electric guitar with amp' },
    { id: '17', name: 'Home Gym Set', description: 'All-in-one gym equipment for home workouts' },
    { id: '18', name: 'Lawn Mower', description: 'Electric mower for easy lawn maintenance' },
    { id: '19', name: 'Smart TV', description: '55-inch 4K Smart TV with streaming capabilities' },
    { id: '20', name: 'Gaming Chair', description: 'Ergonomic chair designed for long gaming sessions' },
  ];
  

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
        <Ionicons name="cube-outline" size={50} color="#4A90E2" style={styles.icon} />
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
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
    backgroundColor: '#1D3D47', // Dark background color
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2B4D5D', // Darker item background
    marginBottom: 12,
    borderColor: '#4A90E2', // Border color
    borderWidth: 1,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    color: '#ffffff', // White text for item name
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#ccc', // Light grey text for description
    fontSize: 14,
  },
});
