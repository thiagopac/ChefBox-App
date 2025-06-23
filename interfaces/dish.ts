import { SpecialOffer } from "./specialOffer";

export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    chefId: string; 
    foodType: FoodType;
    specialOffer: SpecialOffer;
    createdAt: Date;
    updatedAt: Date;
}

export enum FoodType {
    BRAZILIAN = "BRAZILIAN",
    JAPANESE = "JAPANESE",
    ITALIAN = "ITALIAN",
    FRENCH = "FRENCH",
    VEGAN = "VEGAN",
    VEGETARIAN = "VEGETARIAN",
    HEALTHY = "HEALTHY",
    DESSERT = "DESSERT",
    ARABIC = "ARABIC",
    MEXICAN = "MEXICAN",
    MEDITERRANEAN = "MEDITERRANEAN",
    INDIAN = "INDIAN",
    OTHER = "OTHER"
}