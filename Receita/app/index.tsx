import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#f4511e', marginBottom: 24 }}>App de Receitas</Text>

      <Link href="/recipes" asChild>
        <TouchableOpacity style={{ backgroundColor: '#f4511e', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Ver Receitas</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/about" asChild>
        <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, borderWidth: 2, borderColor: '#f4511e' }}>
          <Text style={{ color: '#f4511e', fontSize: 16, fontWeight: '500' }}>Sobre</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}