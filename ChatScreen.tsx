import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const conversations = [
  { id: '1', name: 'Lender1', lastMessage: 'Hi! Is your sofa still available?' },
  { id: '2', name: 'Renter1', lastMessage: 'Yes, I’d like to rent it for the weekend.' },
  { id: '3', name: 'Lender2', lastMessage: 'Can you provide more details about your gaming console?' },
  { id: '4', name: 'Renter2', lastMessage: 'Sure! It’s in great condition, used only a few times.' },
  { id: '5', name: 'Lender3', lastMessage: 'Are you flexible with the rental price?' },
  { id: '6', name: 'Renter3', lastMessage: 'What price do you have in mind?' },
  { id: '7', name: 'Lender4', lastMessage: 'Let me know when you can pick it up!' },
  { id: '8', name: 'Renter4', lastMessage: 'I can come by tomorrow afternoon.' },
  { id: '9', name: 'Lender5', lastMessage: 'The item is still available. Ready to proceed?' },
  { id: '10', name: 'Renter5', lastMessage: 'Yes, let’s finalize the details.' },
];

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.conversationContainer}>
            <ThemedText type="title" style={styles.userName}>{item.name}</ThemedText>
            <ThemedText style={styles.lastMessage}>{item.lastMessage}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background for the chat screen
    padding: 16,
  },
  conversationContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2B4D5D', // Darker border color
    backgroundColor: '#2B4D5D', // Background color for individual chat items
    borderRadius: 8,
    marginBottom: 8,
  },
  userName: {
    color: '#fff', // White text for user names
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#ccc', // Lighter color for last message text
    marginTop: 4,
  },
});
