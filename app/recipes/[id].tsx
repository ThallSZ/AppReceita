import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { isFavorite, toggleFavorite } from '../../lib/storage';

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://dummyjson.com/recipes/${id}`);
      const json = await res.json() as Recipe;
      setRecipe(json);
      setFav(await isFavorite(json.id));
    })();
  }, [id]);

  const handleFav = async () => {
    if (!recipe) return;
    const updated = await toggleFavorite(recipe.id);
    setFav(updated.includes(recipe.id));
  };

  if (!recipe) {
    return <Text style={{ margin: 16, color: '#555' }}>Carregando...</Text>;
  }

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#fff' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#f4511e',
          marginBottom: 12
        }}
      >
        {recipe.name}
      </Text>
      <Image
        source={{ uri: recipe.image }}
        style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 16 }}
      />

      <TouchableOpacity
        onPress={handleFav}
        style={{
          backgroundColor: '#f4511e',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>
          {fav ? 'Remover dos favoritos' : 'Favoritar'}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>
        Ingredientes:
      </Text>
      {recipe.ingredients.map((ing, idx) => (
        <Text key={idx} style={{ fontSize: 16, color: '#555', marginVertical: 2 }}>
          • {ing}
        </Text>
      ))}

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginTop: 16,
          marginBottom: 8
        }}
      >
        Instruções:
      </Text>
      <Text style={{ fontSize: 16, color: '#555', lineHeight: 22 }}>
        {recipe.instructions}
      </Text>
    </ScrollView>
  );
}
