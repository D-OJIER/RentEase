import React, { useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  Image 
} from 'react-native';
import { ThemedText } from './ThemedText';

const initialMessages = [
  { id: '1', text: 'Hi! Is your sofa still available?', sender: 'Lender1', type: 'received', profilePic: 'https://www.example.com/lender1.jpg' },
  { id: '2', text: 'Yes, I would like to rent it for the weekend.', sender: 'Renter1', type: 'sent', profilePic: 'https://www.example.com/renter1.jpg' },
  { id: '3', text: 'Can you provide more details about the condition?', sender: 'Lender1', type: 'received', profilePic: 'https://www.example.com/lender1.jpg' },
  { id: '4', text: 'It\'s in good condition, used only a few times.', sender: 'Renter1', type: 'sent', profilePic: 'https://www.example.com/renter1.jpg' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessageContainer : styles.receivedMessageContainer]}>
      {/* Profile Picture */}
      <View style={[styles.profilePicContainer, item.type === 'sent' ? styles.sentProfilePicContainer : styles.receivedProfilePicContainer]}>
        <Image 
          source={{ uri: item.profilePic }}
          style={styles.profilePic} 
          resizeMode="cover"  // Ensures the image is properly fitted
        />
      </View>

      {/* Message Content */}
      <View style={[styles.messageContent, item.type === 'sent' ? styles.sentMessageContent : styles.receivedMessageContent]}>
        {/* Sender Name */}
        <View style={[styles.senderNameBox, item.type === 'sent' ? styles.sentSenderNameBox : styles.receivedSenderNameBox]}>
          <ThemedText style={styles.senderNameText}>
            {item.sender}
          </ThemedText>
        </View>

        {/* Message Text */}
        <View style={[styles.messageBubble, item.type === 'sent' ? styles.sentMessageBubble : styles.receivedMessageBubble]}>
          <ThemedText style={[styles.messageText, item.type === 'sent' ? styles.sentMessageText : styles.receivedMessageText]}>
            {item.text}
          </ThemedText>
        </View>
      </View>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: (messages.length + 1).toString(),
      text: newMessage,
      sender: 'Renter1',
      type: 'sent',
      profilePic: 'https://static.vecteezy.com/system/resources/thumbnails/024/646/930/small_2x/ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg', // Placeholder for current user
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />

      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <ThemedText style={styles.sendButtonText}>Send</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sentMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  receivedMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  profilePicContainer: {
    marginRight: 10,
    marginTop: 6,
    borderRadius: 20, // Rounded profile pic container
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sentProfilePicContainer: {
    alignSelf: 'flex-end',
  },
  receivedProfilePicContainer: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    flexDirection: 'column',
    flex: 1,
    maxWidth: '80%',
  },
  sentMessageContent: {
    alignItems: 'flex-end',
  },
  receivedMessageContent: {
    alignItems: 'flex-start',
  },
  senderNameBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  sentSenderNameBox: {
    backgroundColor: '#4A90E2',
    alignSelf: 'flex-end',
  },
  receivedSenderNameBox: {
    backgroundColor: '#2B4D5D',
    alignSelf: 'flex-start',
  },
  senderNameText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sentMessageBubble: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  receivedMessageBubble: {
    backgroundColor: '#2B4D5D',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: '#FFFFFF',
    textAlign: 'right',
  },
  receivedMessageText: {
    color: '#FFFFFF',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1D1D1D', // Dark background for input area
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#333333', // Dark input area
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    color: '#FFFFFF', // White text color
  },
  sendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
