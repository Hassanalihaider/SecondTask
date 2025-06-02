import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { saveToStorage, getFromStorage } from '../utils/storage/storage';
import { useNavigation } from '@react-navigation/native';

export function PersistScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await getFromStorage('user_name');
      if (storedName) {
        setSavedName(storedName);
      }
    };

    fetchName();
  }, []);

  const handleSave = async () => {
    if (name.trim()) {
      await saveToStorage('user_name', name.trim());
      setSavedName(name.trim());
      setName('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Persist to MMKV</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#6B7280"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Name</Text>
        </TouchableOpacity>

        {savedName ? (
          <Text style={styles.greeting}>Hello, {savedName} 👋</Text>
        ) : (
          <Text style={styles.greetingMuted}>No name saved yet.</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#111827',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#34D399',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  greetingMuted: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
