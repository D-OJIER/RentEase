import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from './ThemedText';

const items = [
  { id: '1', name: 'PlayStation 5', description: 'Latest gaming console with immersive experiences', price: '$499.99', image: 'https://www.gizmochina.com/wp-content/uploads/2020/09/PlayStation-5.jpg' },
  { id: '2', name: 'Sofa Set', description: 'Comfortable 3-seater with modern design', price: '$899.99', image: 'https://i5.walmartimages.com/asr/d36a4209-4edb-49c0-9b7e-32f96311f564_1.a82a0344a085884be0395706940ba5e3.jpeg' },
  { id: '3', name: 'Mountain Bike', description: 'Rugged bike suitable for all terrains', price: '$299.99', image: 'https://th.bing.com/th/id/OIP.rPA8YAu8wyo4HkzXjRt7HgAAAA?rs=1&pid=ImgDetMain' },
  { id: '4', name: 'Projector', description: '4K projector for home theater setup', price: '$649.99', image: 'https://www.bhphotovideo.com/images/images2500x2500/Panasonic_PT_EX12KU_PT_EX12KU_LCD_Projector_871669.jpg' },
  { id: '5', name: 'Dining Table', description: 'Wooden dining table set with 4 chairs', price: '$399.99', image: 'https://rajadigitalplanets.com/cdn/shop/products/514JgB3bmQL_480x480@2x.jpg?v=1603092206' },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
          <View style={styles.priceContainer}>
            <ThemedText style={styles.itemPrice}>{item.price}</ThemedText>
            <Ionicons name="cart-outline" size={24} color="#F9A825" style={styles.cartIcon} />
          </View>
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
    backgroundColor: '#1D3D47', // Dark background for the screen
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#2B4D5D', // Darker background for item containers
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    color: '#FFFFFF', // White text for item name
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    color: '#CCCCCC', // Lighter color for item description
    fontSize: 14,
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    color: '#F9A825', // Accent color for price
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartIcon: {
    marginLeft: 10,
  },
});
