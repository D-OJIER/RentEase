import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Animated } from 'react-native';

const rentedItems = [
  { id: '1', name: 'PS5', timeRemaining: '2 days' },
  { id: '2', name: 'Sofa', timeRemaining: '5 days' },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={rentedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
            <ThemedText style={styles.itemName}>{item.name}</ThemedText>
            <ThemedText style={styles.itemTime}>Time remaining: {item.timeRemaining}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#2B4D5D', // Darker background for item containers
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Light border for item containers
    transition: 'background-color 0.3s ease', // Smooth background transition
  },
  itemName: {
    color: '#ffffff', // White text for item names
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTime: {
    color: '#cccccc', // Lighter color for time remaining text
    marginTop: 4,
  },
});
