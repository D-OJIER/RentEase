import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, createUserWithEmailAndPassword } from './firebaseConfig'; // Import auth and createUserWithEmailAndPassword function

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user); // Log user info to console (optional)
          alert('Signup successful! Please log in.');
          navigation.navigate('Login'); // Navigate to Login screen after successful signup
        })
        .catch((error) => {
          alert(error.message); // Show error message if signup fails
        });
    } else {
      alert("Passwords don't match!"); // Show alert if passwords don't match
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to RentEase! Let's Get You Set Up</Text> {/* Catchy Header */}
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#A8A8A8"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1D3D47', // Dark background similar to login page
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

export default SignupScreen;
