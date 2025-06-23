import { Stack } from "expo-router";
import React from "react";

export default function AvaliacaoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Avaliação do Pedido",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
