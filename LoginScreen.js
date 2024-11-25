import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { auth, signInWithEmailAndPassword } from './firebaseConfig'; // Import auth and signIn function

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user); // Log user info to console (optional)
        navigation.replace('Main'); // Navigate to the main screen after successful login
      })
      .catch((error) => {
        alert(error.message); // Show error message if login fails
      });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>Welcome back to RentEasE</Text> {/* Header */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A8A8A8"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#A8A8A8"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1D3D47', // Dark background similar to home page
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9A825', // Gold color for header
    textAlign: 'center',
    marginBottom: 40, // Spacing between header and input fields
  },
  input: {
    height: 50,
    borderColor: '#F9A825', // Gold border to match theme
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#FFFFFF', // White text color
    borderRadius: 8,
    backgroundColor: '#2B4D5D', // Darker background for input fields
  },
  button: {
    backgroundColor: '#F9A825', // Gold button to match theme
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#1D3D47', // Dark text on the gold button
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: '#F9A825', // Gold color for links
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
