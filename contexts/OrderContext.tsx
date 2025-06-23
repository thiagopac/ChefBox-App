import { CreateOrderDto, Order } from "@/interfaces/order";
import { CreateOrder, GetAllOrders } from "@/services/orderService";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Define o tipo do contexto
interface OrderContextType {
  orders: Order[];
  order: Order | undefined; // Lista de pedidos
  createOrder: (order: CreateOrderDto) => Promise<Order>; // Função para criar pedido
  getAllOrders: (status?: string) => Promise<Order[]>;
  setOrder: (order: Order) => void;
  loading: boolean; // Estado de carregamento
  error: string | null; // Estado de erro
}

// Cria o contexto
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider do contexto
export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllOrders = async (status?: string): Promise<Order[]> => {
    setLoading(true);
    setError(null);
    try {
      const fetchedOrders = await GetAllOrders(status);
      setOrders(fetchedOrders);
      return fetchedOrders;
    } catch (err: any) {
      setError(err.message || "Erro ao buscar pedidos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (order: CreateOrderDto): Promise<Order> => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await CreateOrder(order);
      setOrder(newOrder);
      return newOrder;
    } catch (err: any) {
      setError(err.message || "Erro ao criar pedido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        createOrder,
        getAllOrders,
        setOrder,
        loading,
        error,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook para usar o contexto
export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      "useOrderContext deve ser usado dentro de um OrderProvider"
    );
  }
  return context;
};
