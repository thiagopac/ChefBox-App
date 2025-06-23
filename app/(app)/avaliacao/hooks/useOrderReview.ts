import { Rating } from "@/interfaces/orderReview";
import { orderReviewService } from "@/services/orderReviewService/orderReviewService";
import { useState } from "react";

export function useOrderReview(orderId: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitReview = async (rating: number, comment: string) => {
        const RATING_VALUES = ["ONE", "TWO", "THREE", "FOUR", "FIVE"] as const;
        const ratingEnum: Rating = RATING_VALUES[rating - 1];
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await orderReviewService.addReview(orderId, {
                rating: ratingEnum,
                comment,
                createdAt: new Date().toISOString(),
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Erro ao enviar avaliação.");
        } finally {
            setLoading(false);
        }
    };

    return {
        submitReview,
        loading,
        error,
        success,
    };
}
