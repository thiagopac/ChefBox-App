import { ChefMenuDto, ChefReviewDto } from "@/interfaces/chefMenu";
import api from "./api";


export async function GetChefMenu(chefId: string): Promise<ChefMenuDto> {
    const response = await api.get(`/menu/chef/${chefId}`);
    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error fetching menu for chef ${chefId}: ${response.statusText}`);
    }
    const data = response.data;
     return {
        chef: {
            id: data.chef.id,
            name: data.chef.name,
            email: data.chef.email,
            foodType: data.chef.foodType,
            address: data.chef.address,
            city: data.chef.city,
            about: data.chef.about,
            initials: data.chef.initials
        },
        dishes: data.dishes,
        totalDishes: data.totalDishes
    } as ChefMenuDto;
}


export async function GetReviews(chefId: string): Promise<ChefReviewDto[]> {
    const response = await api.get(`/order/chef/reviews/${chefId}`);
    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Error fetching reviews for chef ${chefId}: ${response.statusText}`);
    }
    const data = response.data as ChefReviewDto[];

    return data;
}

