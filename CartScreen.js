import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemedText } from './ThemedText';

// Sample cart items with images
const cartItems = [
  { id: '1', name: 'PS5', price: 499, image: 'https://www.gizmochina.com/wp-content/uploads/2020/09/PlayStation-5.jpg' },
  { id: '2', name: 'Sofa', price: 299, image: 'https://i5.walmartimages.com/asr/d36a4209-4edb-49c0-9b7e-32f96311f564_1.a82a0344a085884be0395706940ba5e3.jpeg' },
  { id: '3', name: 'Bicycle', price: 150, image: 'https://th.bing.com/th/id/OIP.rPA8YAu8wyo4HkzXjRt7HgAAAA?rs=1&pid=ImgDetMain' },
  { id: '4', name: 'Laptop', price: 799, image: 'https://www.bhphotovideo.com/images/images2500x2500/Panasonic_PT_EX12KU_PT_EX12KU_LCD_Projector_871669.jpg' },
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
              <Image source={{ uri: item.image }} style={styles.itemImage} />
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
    backgroundColor: '#1D3D47', // Sticking to your color scheme
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#2B4D5D', // Consistent with your color
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Keeping your blue border
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Blue border around image for consistency
  },
  itemName: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#ccc', // Lighter price text
  },
  removeButton: {
    backgroundColor: '#E94E77', // Keep the remove button color
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    borderTopColor: '#4A90E2', // Blue border for cart summary section
  },
  totalText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#4A90E2', // Blue for checkout button
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
  },
});
