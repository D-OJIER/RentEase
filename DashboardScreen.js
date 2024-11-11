import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from './ThemedText';

const rentedItems = [
  { id: '1', name: 'PS5', timeRemaining: '2 days' },
  { id: '2', name: 'Sofa', timeRemaining: '5 days' },
];

export default function DashboardScreen() {
  const animatedScale = new Animated.Value(1); // Scale value for animation

  const animateItemPress = () => {
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rentedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
            <TouchableOpacity
              style={styles.itemContainer}
              activeOpacity={0.7}
              onPress={animateItemPress}
            >
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemTime}>Time remaining: {item.timeRemaining}</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47', // Dark background for the dashboard
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#2B4D5D', // Background color for item containers
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2', // Light border color for the item containers
  },
  itemName: {
    color: '#ffffff', // White text for item names
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTime: {
    color: '#cccccc', // Lighter color for time remaining text
    marginTop: 4,
  },
});
