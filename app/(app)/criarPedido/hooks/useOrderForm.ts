import { useForm } from 'react-hook-form';

export interface OrderFormData {
    dishes: { [key: string]: number };
    observacoes?: string;
}

export interface UseOrderFormReturn {
    watchedDishes: { [key: string]: number };
    updateQuantity: (dishId: string, newQuantity: number) => void;
    calculateTotal: (dishesWithOffer: any[]) => number;
    handleSubmit: (onSubmit: (data: OrderFormData) => void) => () => void;
    getValues: () => OrderFormData;
}

export function useOrderForm(): UseOrderFormReturn {
    const defaultValues: OrderFormData = {
        dishes: {},
        observacoes: ''
    };

    const { handleSubmit, setValue, watch, getValues } = useForm<OrderFormData>({
        defaultValues,
    });

    const watchedDishes = watch("dishes");

    const updateQuantity = (dishId: string, newQuantity: number) => {
        const quantity = Math.max(0, newQuantity);
        setValue(`dishes.${dishId}`, quantity);
    };

    const calculateTotal = (dishesWithOffer: any[]) => {
        const currentDishes = getValues().dishes;
        return dishesWithOffer.reduce((total, dish) => {
            const quantity = currentDishes[dish.id] || 0;
            return total + (dish.price * quantity);
        }, 0);
    };

    return {
        watchedDishes,
        updateQuantity,
        calculateTotal,
        handleSubmit,
        getValues
    };
}
