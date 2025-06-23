import { CreateOrderDto, Order } from "@/interfaces/order";
import api from "./api";


export async function CreateOrder(order: CreateOrderDto): Promise<Order> {
    const result = await api.post(`/order`, order);
    return {
        Id: result.data.id,
        OrderNumber: result.data.orderNumber,
        CustomerId: result.data.customerId,
        CustomerName: result.data.customerName,
        CustomerAddress: result.data.customerAddress,
        ChefId: result.data.chefId,
        Items: result.data.items,
        TotalPrice: result.data.totalPrice,
        Status: result.data.status,
        CreatedAt: new Date(result.data.createdAt),
        UpdatedAt: new Date(result.data.updatedAt),
        // Reviews: data.reviews // descomentar se precisar
    } as Order;
}

export async function GetAllOrders(status?: string): Promise<Order[]> {
    try {
        const result = await api.get(`/order${status ? `?status=${status}` : ''}`);
        if (!result.data) {
            throw new Error('Nenhum pedido encontrado!');
        }
        return result.data.map((order: any) => ({
            Id: order.id,
            OrderNumber: order.orderNumber,
            CustomerId: order.customerId,
            CustomerName: order.customerName,
            CustomerAddress: order.customerAddress,
            ChefId: order.chefId,
            ChefName: order.chefName,
            ChefInitials: order.chefInitials,
            Items: order.items,
            TotalPrice: order.totalPrice,
            Status: order.status,
            CreatedAt: new Date(order.createdAt),
            UpdatedAt: new Date(order.updatedAt),
        })) as Order[];
    } catch (error: any) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        throw error;
    }
}
