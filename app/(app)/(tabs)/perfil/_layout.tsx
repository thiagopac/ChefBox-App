import { Stack } from "expo-router";
import React from "react";

export default function PerfilLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Perfil do Usuário",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editar"
        options={{
          title: "Editar Perfil",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
