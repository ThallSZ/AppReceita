import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#fff' }
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Receitas' }} />
        <Stack.Screen name="recipes/index" options={{ title: 'Lista' }} />
        <Stack.Screen name="recipes/[id]" options={{ title: 'Detalhes' }} />
        <Stack.Screen name="about" options={{ title: 'Sobre' }} />
      </Stack>
    </>
  );
}