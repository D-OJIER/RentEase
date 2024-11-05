import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const items = [
  { id: '1', name: 'PS5' },
  { id: '2', name: 'Sofa' },
  { id: '3', name: 'Gaming Chair' },
  { id: '4', name: 'Laptop' },
  { id: '5', name: 'Bicycle' },
  { id: '6', name: 'Watch' },
  { id: '7', name: 'Camera' },
  { id: '8', name: 'Headphones' },
  // Add more items as needed for search results
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor="#ccc" // Placeholder color for better visibility
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7}>
            <ThemedText style={styles.itemText}>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background for the entire screen
    padding: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#4A90E2', // Light border color
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#2B4D5D', // Darker input background
    color: '#fff', // Light text color for input
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#2B4D5D', // Darker background for items
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Light border color for items
  },
  itemText: {
    color: '#ffffff', // White text for item names
    fontSize: 18,
  },
});
