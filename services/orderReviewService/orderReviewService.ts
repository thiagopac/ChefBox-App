import { ReviewRequest } from "@/interfaces/orderReview";
import api from "../api";

export const orderReviewService = {
    async addReview(orderId: string, review: ReviewRequest & { customerId: string }): Promise<void> {
        try {
            console.log('Enviando avaliação para API:', { orderId, ...review });
            await api.post(`/order/${orderId}/review`, review);
        } catch (error: any) {
            console.error('Erro ao enviar avaliação:', error?.response || error);
            throw new Error(error?.response?.data?.message || "Erro desconhecido ao enviar avaliação.");
        }
    },
};
