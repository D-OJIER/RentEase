import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ThemedText } from './ThemedText';

// Sample cart items
const cartItems = [
  { id: '1', name: 'PS5', price: 499 },
  { id: '2', name: 'Sofa', price: 299 },
  { id: '3', name: 'Bicycle', price: 150 },
  { id: '4', name: 'Laptop', price: 799 },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Your Cart</ThemedText>
      
      {/* List Cart Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemPrice}>${item.price}</ThemedText>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <ThemedText style={styles.removeText}>Remove</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Cart Summary */}
      <View style={styles.cartSummary}>
        <ThemedText style={styles.totalText}>Total: ${totalPrice}</ThemedText>
        <TouchableOpacity style={styles.checkoutButton}>
          <ThemedText style={styles.checkoutText}>Proceed to Checkout</ThemedText>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2B4D5D',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  itemDetails: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 18,
    color: '#ffffff',
  },
  itemPrice: {
    fontSize: 16,
    color: '#ccc',
  },
  removeButton: {
    backgroundColor: '#E94E77',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
  },
  cartSummary: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#4A90E2',
  },
  totalText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
  },
});
