export const foodTypeTranslations: Record<string, string> = {
  BRAZILIAN: "Brasileira",
  JAPANESE: "Japonesa",
  ITALIAN: "Italiana",
  FRENCH: "Francesa",
  VEGAN: "Vegana",
  VEGETARIAN: "Vegetariana",
  HEALTHY: "Saudável",
  DESSERT: "Sobremesa",
  ARABIC: "Árabe",
  MEXICAN: "Mexicana",
  MEDITERRANEAN: "Mediterrânea",
  INDIAN: "Indiana",
  OTHER: "Outra",
};

export function translateFoodType(type: string): string {
  return foodTypeTranslations[type] || type;
}
