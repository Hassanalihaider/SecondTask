import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const saveToStorage = (key: string, value: string) => {
  storage.set(key, value);
};

export const getFromStorage = (key: string) => {
  return storage.getString(key);
};

export const deleteFromStorage = (key: string) => {
  storage.delete(key);
};
