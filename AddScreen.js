import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ThemedText } from './ThemedText';
import { launchImageLibrary } from 'react-native-image-picker'; // Image picker library
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for the icon

export default function AddItemScreen() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [buttonScale] = useState(new Animated.Value(1));

  const handleImageUpload = () => {
    launchImageLibrary({ 
      mediaType: 'photo', 
      quality: 1, 
      includeBase64: true 
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick an image.');
      } else {
        setImage(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  const handleAddItem = () => {
    if (!itemName || !description || !image) {
      Alert.alert('Missing Information', 'Please fill in all fields and add an image.');
      return;
    }
    console.log('Item Added:', { itemName, description, image });
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Add New Item</ThemedText>
      
      <TextInput
        style={[styles.input, itemName && styles.inputFilled]}
        placeholder="Item Name"
        placeholderTextColor="#ccc"
        value={itemName}
        onChangeText={setItemName}
      />
      
      <TextInput
        style={[styles.input, description && styles.inputFilled]}
        placeholder="Description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TouchableOpacity style={styles.imageContainer} onPress={handleImageUpload}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.uploadTextContainer}>
            <Icon name="camera" size={24} color="#ccc" />
            <ThemedText type="subtitle" style={styles.uploadText}>Tap to Upload Image</ThemedText>
          </View>
        )}
      </TouchableOpacity>
      
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            animateButtonPress();
            handleAddItem();
          }}
        >
          <ThemedText type="buttonText" style={styles.buttonText}>Add Item</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#4A90E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#2B4D5D',
    color: '#fff',
  },
  inputFilled: {
    borderColor: '#77B1C2',
  },
  imageContainer: {
    height: 150,
    borderRadius: 8,
    backgroundColor: '#2B4D5D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4A90E2',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  uploadTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
