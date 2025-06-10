import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export async function getFavorites(): Promise<number[]> {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
}

export async function toggleFavorite(id: number): Promise<number[]> {
  const favorites = await getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter(f => f !== id)
    : [...favorites, id];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export async function isFavorite(id: number): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(id);
}
