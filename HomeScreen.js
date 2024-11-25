import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

const items = [
  { id: '1', name: 'PlayStation 5', description: 'Latest gaming console with immersive experiences', price: '$499.99', image: 'https://www.gizmochina.com/wp-content/uploads/2020/09/PlayStation-5.jpg' },
  { id: '2', name: 'Sofa Set', description: 'Comfortable 3-seater with modern design', price: '$899.99', image: 'https://i5.walmartimages.com/asr/d36a4209-4edb-49c0-9b7e-32f96311f564_1.a82a0344a085884be0395706940ba5e3.jpeg' },
  { id: '3', name: 'Mountain Bike', description: 'Rugged bike suitable for all terrains', price: '$299.99', image: 'https://th.bing.com/th/id/OIP.rPA8YAu8wyo4HkzXjRt7HgAAAA?rs=1&pid=ImgDetMain' },
  { id: '4', name: 'Projector', description: '4K projector for home theater setup', price: '$649.99', image: 'https://www.bhphotovideo.com/images/images2500x2500/Panasonic_PT_EX12KU_PT_EX12KU_LCD_Projector_871669.jpg' },
  { id: '5', name: 'Dining Table', description: 'Wooden dining table set with 4 chairs', price: '$399.99', image: 'https://www.vikinterio.com/product-images/VROFS_A_0.jpg/473239000004621305/900x900' },
  {
    id: '6',
    name: 'Nintendo Switch OLED',
    description: 'Upgraded handheld console with vibrant OLED display',
    price: '$349.99',
    rating: 4.7,
    reviews: 2500,
    delivery: 'Free Shipping',
    image: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-photo-01'
    },
    {
    id: '7',
    name: 'Smart Watch',
    description: 'Track fitness, receive notifications, and stay connected',
    price: '$199.99',
    rating: 4.4,
    reviews: 1800,
    delivery: 'Free Shipping',
    image: 'https://m.media-amazon.com/images/I/610OiiTm9PL.jpg'
    },
    {
    id: '8',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in music and block out distractions',
    price: '$249.99',
    rating: 4.6,
    reviews: 1500,
    delivery: 'Free Shipping',
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/396375750/YJ/MZ/CD/188850416/bose-quietcomfort-ultra-wireless-noise-cancelling-over-ear-headphones-500x500.jpg'
    },
    {
    id: '9',
    name: 'Gaming Laptop',
    description: 'Powerful laptop for playing demanding games',
    price: '$1499.99',
    rating: 4.8,
    reviews: 1100,
    delivery: 'Free Shipping',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWBTxVzAcFThlUFrkQGv0oWDdI0mFC74_jQ&s'
    },
    {
    id: '10',
    name: 'Instant Pot',
    description: 'Versatile kitchen appliance for easy cooking',
    price: '$99.99',
    rating: 4.9,
    reviews: 3200,
    delivery: 'Free Shipping',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQN6XItY38KEY57g1sgtUbQENKZV24jz4AA&s'
    }
];

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [isDarkTheme, setIsDarkTheme] = useState(true); // State to toggle theme

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.9}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
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

  const modalButtonStyles = isDarkTheme ? styles.darkButton : styles.lightButton;
  const modalButtonTextStyles = isDarkTheme ? styles.darkButtonText : styles.lightButtonText;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
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
            <ThemedText type="title" style={styles.modalTitle}>{selectedItem.name}</ThemedText>
            <ThemedText style={styles.modalDescription}>{selectedItem.description}</ThemedText>  {/* Detailed description */}
            <ThemedText style={styles.modalPrice}>Price: {selectedItem.price}</ThemedText>
            <TouchableOpacity style={modalButtonStyles} onPress={() => alert(`${selectedItem.name} added to cart!`)}>
              <Text style={modalButtonTextStyles}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity 
          style={[styles.darkButton, styles.requestButton]} 
          onPress={() => alert(`Request placed for ${selectedItem.name}!`)}
        >
          <Text style={styles.darkButtonText}>Request</Text>
        </TouchableOpacity>
            <TouchableOpacity style={[modalButtonStyles, styles.closeButton]} onPress={() => setModalVisible(false)}>
              <Text style={modalButtonTextStyles}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
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
    backgroundColor: '#2B4D5D',
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    color: '#CCCCCC',
    fontSize: 14,
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    color: '#F9A825',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    width: '60%', // Adjusted width for narrower modal
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF5733',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#FF5733', // Change the color here (example: orange)
    paddingHorizontal: 20, // Padding for better readability
    lineHeight: 20, // Line height for spacing
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9A825',
    marginBottom: 16,
  },
  darkButton: {
    backgroundColor: '#F9A825',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  lightButton: {
    backgroundColor: '#1D3D47',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
  },
  darkButtonText: {
    color: '#1D3D47',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#D32F2F',

  },
  requestButton: {
    backgroundColor: '#4CAF50', // Green color for Request
    marginTop: 10, // Space between buttons
  },
});
