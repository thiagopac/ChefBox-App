import { Dish, FoodType } from "./dish";

export interface ChefMenuDto {
    chef: {
        id: string;
        name: string;
        email: string;
        foodType: FoodType;
        address: string;
        city: string;
        about: string;
        initials: string;
    };
    dishes: Dish[];
    totalDishes: number;
}

export interface ChefReviewDto {
    review: {
        customerId: string;
        customerName: string;
        rating: number;
        comment: string;
        createdAt: Date;
    };
    orderItems: {
        dishId: string;
        dishName: string;
        quantity: number;
    }[];
}