import { create } from 'zustand';
import apiClient from '../services/api/apiClient';
import { saveToStorage, getFromStorage } from '../utils/storage/storage';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostStoreState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;

  loadFromStorage: () => void;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
}

export const usePostStore = create<PostStoreState>((set) => ({
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,

  loadFromStorage: () => {
    const savedPosts = getFromStorage('posts');
    const savedSelectedPost = getFromStorage('selectedPost');

    set({
      posts: savedPosts ? JSON.parse(savedPosts) : [],
      selectedPost: savedSelectedPost ? JSON.parse(savedSelectedPost) : null,
    });
  },

  fetchPosts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get<Post[]>('/posts');
      const data = response.data.slice(0, 10);

      set({ posts: data, loading: false });
      saveToStorage('posts', JSON.stringify(data));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch posts',
        loading: false,
      });
    }
  },

  fetchPostById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get<Post>(`/posts/${id}`);
      set({ selectedPost: response.data, loading: false });
      saveToStorage('selectedPost', JSON.stringify(response.data));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch post',
        loading: false,
      });
    }
  },
}));
