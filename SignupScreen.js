import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from './firebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const saveUserData = async (userData) => {
    try {
      const userDocRef = doc(db, "users", userData.uid);
      await setDoc(userDocRef, userData);
      console.log("User data saved successfully:", userData);
    } catch (error) {
      console.error("Error saving user data to Firestore:", error);
      alert("Error saving user data. Please try again.");
    }
  };

  const handleSignup = () => {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = { 
            uid: user.uid, 
            email: user.email, 
            username 
          };
          saveUserData(userData);
          setLoading(false);
          alert('Signup successful! Please log in.');
          navigation.navigate('Login');
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error signing up:", error);
          alert(error.message);
        });
    } else {
      alert("Passwords don't match!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#AAAAAA"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAAAAA"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#AAAAAA"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      {loading && <ActivityIndicator size="large" color="#F9A825" style={styles.loader} />}
      
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
  loader: {
    marginTop: 20,
  },
});

export default SignupScreen;
