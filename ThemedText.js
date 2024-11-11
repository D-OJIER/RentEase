// ThemedText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const ThemedText = ({ type = 'body', style, children }) => {
  let textStyle = styles[type] || styles.body;

  return <Text style={[textStyle, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#AAAAAA',
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ThemedText;
