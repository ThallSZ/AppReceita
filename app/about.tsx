import { View, Text } from 'react-native';

export default function About() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 12 }}>Sobre o App</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
        Aplicativo criado por Ian Thalles{"\n"}
        App de Receitas - Timon-MA, 2025
      </Text>
    </View>
  );
}