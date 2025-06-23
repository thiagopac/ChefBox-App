import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function CriarPedidoLayout() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Animação padrão
          presentation: 'transparentModal', // <-- aqui!
          contentStyle: { backgroundColor: 'transparent' },

        }}
      >
        <Stack.Screen
          name="index"
          options={{
            animation: 'slide_from_bottom', // Animação específica para esta tela
            presentation: 'transparentModal', // <-- aqui também!
          }}
        />
      </Stack>
    </>
  );
}