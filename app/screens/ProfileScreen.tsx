import React, { useState } from 'react';
import {View,Text,TouchableOpacity,ActivityIndicator,StyleSheet,ScrollView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePostStore } from '@/stores/usePostStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigators/AppStackParamList';

type RootStackNavigation = NativeStackNavigationProp<AppStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const fetchPostById = usePostStore((state) => state.fetchPostById);
  const selectedPost = usePostStore((state) => state.selectedPost);
  const loading = usePostStore((state) => state.loading);

  const handleFetchPost = async (id: number) => {
    setSelectedPostId(id);
    await fetchPostById(id);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 5; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.button,
            selectedPostId === i && styles.activeButton,
          ]}
          onPress={() => handleFetchPost(i)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPostId === i && styles.activeButtonText,
            ]}
          >
            Post {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fetch a Post by Button</Text>

      <View style={styles.buttonContainer}>{renderButtons()}</View>

      <TouchableOpacity
        style={[styles.button, styles.navigateButton]}
        onPress={() => navigation.navigate('PersistScreen')}
      >
        <Text style={[styles.buttonText, styles.navigateButtonText]}>
          Persist Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.navigateButton]}
        onPress={() => navigation.navigate('SvgScreen')}
      >
        <Text style={[styles.buttonText, styles.navigateButtonText]}>
          SVG Screen
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Loading post...</Text>
        </View>
      ) : selectedPost ? (
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>{selectedPost.title}</Text>
          <Text style={styles.postBody}>{selectedPost.body}</Text>
        </View>
      ) : (
        <Text style={styles.noPost}>No post selected yet.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111827',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#374151',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 5,
  },
  activeButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#000',
  },
  center: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#D1FAE5',
    fontSize: 16,
    fontWeight: '500',
  },
  postCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F9FAFB',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
    color: '#E5E7EB',
  },
  noPost: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  navigateButton: {
    backgroundColor: '#34D399',
    marginBottom: 20,
  },
  navigateButtonText: {
    color: 'white',
  },
});
