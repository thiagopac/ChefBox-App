export interface CreateOrderDto {
    Items: OrderItemDto[];
}

export interface OrderItemDto {
    dishId: string;
    quantity: number;
    dishName: string;
}

export interface Order {
    Id: string;
    OrderNumber: number;
    CustomerId: string;
    CustomerName: string;
    CustomerAddress: string;
    ChefId: string;
    ChefName: string;
    ChefInitials: string;
    Items: OrderItemDto[];
    TotalPrice: number;
    Status: string; // e.g., "Pending", "InProgress", "Completed", "Cancelled"
    CreatedAt: Date;
    UpdatedAt: Date;
    // Reviews : Review[];
}

export interface OrderItem {
    dishId: string;
    quantity: number;
    dishName:string;
}

// export interface Review {
//     Id: string;
//     OrderId: string;
//     CustomerId: string;
//     Rating: number; // e.g., 1 to 5 stars
//     Comment: string;
//     CreatedAt: Date;
// }