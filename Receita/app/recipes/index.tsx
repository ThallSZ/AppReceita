import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Link } from 'expo-router';
import { getFavorites } from '../../lib/storage';

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecipes();
    loadFavorites();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/recipes');
      const json = await res.json() as { recipes: Recipe[] };
      setRecipes(json.recipes);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (!onlyFavs || favorites.includes(r.id))
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <TextInput
        placeholder="Buscar receita..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 8,
          marginBottom: 12
        }}
      />

      <TouchableOpacity
        onPress={() => setOnlyFavs(!onlyFavs)}
        style={{ alignSelf: 'flex-end', marginBottom: 12 }}
      >
        <Text style={{ color: '#f4511e', fontWeight: 'bold' }}>
          {onlyFavs ? 'Ver todas' : 'Ver favoritos'}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/recipes/${item.id}`} asChild>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                  backgroundColor: '#fafafa',
                  borderRadius: 8,
                  padding: 8
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 60, height: 60, borderRadius: 4, marginRight: 12 }}
                />
                <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}
