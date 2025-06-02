import { makeAutoObservable, runInAction } from 'mobx';
import apiClient from '../services/api/apiClient';
import { saveToStorage, getFromStorage } from '../utils/storage/storage';


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

class PostStore {
  posts: Post[] = [];
  selectedPost: Post | null = null;
  loading: boolean = false;
  error: string | null = null;

 constructor() {
  makeAutoObservable(this);
  this.loadFromStorage(); 
}

loadFromStorage = () => {
  const savedPosts = getFromStorage('posts');
  const savedSelectedPost = getFromStorage('selectedPost');

  if (savedPosts) {
    this.posts = JSON.parse(savedPosts);
  }

  if (savedSelectedPost) {
    this.selectedPost = JSON.parse(savedSelectedPost);
  }
};


  fetchPosts = async () => {
  this.loading = true;
  this.error = null;

  try {
    const response = await apiClient.get<Post[]>('/posts');
    runInAction(() => {
      const data = response.data.slice(0, 10);
      this.posts = data;
      this.loading = false;

      saveToStorage('posts', JSON.stringify(data));
    });
  } catch (err) {
    runInAction(() => {
      this.error = err instanceof Error ? err.message : 'Failed to fetch posts';
      this.loading = false;
    });
  }
};


fetchPostById = async (id: number) => {
  this.loading = true;
  this.error = null;

  try {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    runInAction(() => {
      this.selectedPost = response.data;
      this.loading = false;

      saveToStorage('selectedPost', JSON.stringify(response.data));
    });
  } catch (err) {
    runInAction(() => {
      this.error = err instanceof Error ? err.message : 'Failed to fetch post';
      this.loading = false;
    });
  }
};

}

export const postStore = new PostStore();