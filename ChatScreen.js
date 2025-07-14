import React, { useContext, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { UserContext } from './UserContext'; // Import the context

const users = [
  { id: '1', name: 'Alice (Lender)', profilePic: 'https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d', lastMessage: 'Is the bike still available?' },
  { id: '2', name: 'Bob (Renter)', profilePic: 'https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d', lastMessage: 'Yes, I can pick it up tomorrow.' },
  { id: '3', name: 'Charlie (Lender)', profilePic: 'https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d', lastMessage: 'I can rent the camera for $50.' },
  { id: '4', name: 'Diana (Renter)', profilePic: 'https://icon-library.com/images/profile-icon/profile-icon-4.jpg', lastMessage: 'Great! Can we schedule a time?' },
  { id: '5', name: 'Ethan (Lender)', profilePic: 'https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d', lastMessage: 'How long do you need the tent?' },
  { id: '6', name: 'Fiona (Renter)', profilePic: 'https://icon-library.com/images/profile-icon/profile-icon-4.jpg', lastMessage: 'Just for the weekend.' },
  { id: '7', name: 'Grace (Lender)', profilePic: 'https://icon-library.com/images/profile-icon/profile-icon-4.jpg', lastMessage: 'Let me know if you need the drill.' },
  { id: '8', name: 'Henry (Renter)', profilePic: 'https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d', lastMessage: 'Thank you! I’ll confirm soon.' },
];

const ChatScreen = () => {
  const { userType } = useContext(UserContext); // Use userType from context
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Automatically filter users based on userType
  const filteredUsers = userType === 'Renter'
    ? users.filter((user) => user.name.includes('(Renter)'))
    : users.filter((user) => user.name.includes('(Lender)'));

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([
      { id: '1', text: user.lastMessage, sender: user.name, type: 'received', profilePic: user.profilePic },
    ]);
    setCurrentScreen('chat');
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMessageObj = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      type: 'sent',
    };

    setMessages([newMessageObj, ...messages]);
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {item.type === 'received' && (
        <Image
          source={{ uri: item.profilePic }}
          style={styles.profilePic}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.type === 'sent' ? styles.sentMessageBubble : styles.receivedMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );
    
  const renderUserList = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>
        {userType === 'Renter' ? 'Renter Chats' : 'Lender Chats'}
      </Text>
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => handleUserSelect(item)}
          >
            <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
            <View style={styles.userInfo}>
              {/* Remove (Lender) or (Renter) from the name */}
              <Text style={styles.userName}>{item.name.replace(/\s\((Lender|Renter)\)/, '')}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );

  const renderChatHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setCurrentScreen('home')}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Image source={{ uri: selectedUser.profilePic }} style={styles.headerPic} />
      {/* Remove (Lender) or (Renter) from the name */}
      <Text style={styles.headerTitle}>{selectedUser.name.replace(/\s\((Lender|Renter)\)/, '')}</Text>
    </View>
  );


  const renderChatScreen = () => (
    <SafeAreaView style={styles.container}>
      {renderChatHeader()}
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
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  if (currentScreen === 'chat') return renderChatScreen();

  // Directly render the user list based on userType
  return renderUserList();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  userContainer: {
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: { marginLeft: 10 },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lastMessage: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#2B4D5D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B4D5D',
    padding: 10,
  },
  backButton: {
    fontSize: 20,
    color: '#F9A825',
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerPic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  sentMessage: {
    justifyContent: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
  },
  sentMessageBubble: {
    backgroundColor: '#F9A825',
    alignSelf: 'flex-end',
  },
  receivedMessageBubble: {
    backgroundColor: '#2E2E2E',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#2B4D5D',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#FFFFFF',
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#F9A825',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '60%',
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
    color: '#FF5733',
    paddingHorizontal: 20,
    lineHeight: 20,
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
    backgroundColor: '#4CAF50',
    marginTop: 10,
  },
});

export default ChatScreen;
