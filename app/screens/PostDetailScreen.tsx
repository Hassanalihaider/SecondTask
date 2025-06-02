import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../navigators/AppStackParamList';
import { usePostStore } from '@/stores/usePostStore';

type PostDetailRouteProp = RouteProp<AppStackParamList, 'ProfilePostDetail'>;

export const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { id } = route.params;

  const fetchPostById = usePostStore((state) => state.fetchPostById);
  const selectedPost = usePostStore((state) => state.selectedPost);
  const loading = usePostStore((state) => state.loading);

  useEffect(() => {
    fetchPostById(Number(id));
  }, [id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#10B981" />
      ) : selectedPost ? (
        <>
          <Text style={styles.title}>{selectedPost.title}</Text>
          <Text style={styles.body}>{selectedPost.body}</Text>
        </>
      ) : (
        <Text style={styles.noPost}>No post found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111827',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  noPost: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});