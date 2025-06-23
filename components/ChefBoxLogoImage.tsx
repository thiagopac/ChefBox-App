import { Image, ImageProps } from 'expo-image';
import React from "react";


// Componente para exibir o logo ChefBox
export default function ChefBoxLogoImage(props: ImageProps) {
  return (
    <Image
      source="./../assets/images/logo-white.png" // Caminho para a imagem do logo
      {...props}
    />
  );
}
