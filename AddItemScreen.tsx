import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function AddItemScreen() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [buttonScale] = useState(new Animated.Value(1)); // Scale for button press animation

  const handleImageUpload = () => {
    // Logic for uploading an image would go here
    // Placeholder for now
    setImage('https://via.placeholder.com/150');
  };

  const handleAddItem = () => {
    // Logic to add the item would go here
    console.log('Item Added:', { itemName, description, image });
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95, // Scale down
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1, // Scale back to original
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Add New Item</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#ccc"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        onFocus={() => handleInputFocus('itemName')}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={(text) => setDescription(text)}
        onFocus={() => handleInputFocus('description')}
      />
      <TouchableOpacity style={styles.imageContainer} onPress={handleImageUpload}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <ThemedText type="subtitle" style={styles.uploadText}>Tap to Upload Image</ThemedText>
        )}
      </TouchableOpacity>
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity style={styles.button} onPress={() => {
          animateButtonPress();
          handleAddItem();
        }}>
          <ThemedText type="buttonText" style={styles.buttonText}>Add Item</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold', // Bold title for emphasis
  },
  input: {
    height: 50,
    borderColor: '#4A90E2', // Highlighted border color
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#2B4D5D', // Darker input background
    color: '#fff', // Light text color for input
  },
  imageContainer: {
    height: 150,
    borderRadius: 8,
    backgroundColor: '#2B4D5D', // Darker background for the image container
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4A90E2', // Border color for the image container
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#ccc',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A90E2', // Button color
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', // Bold button text
  },
});
