export type Rating = "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";

export interface ReviewRequest {
    rating: Rating;
    comment: string;
    createdAt: string;
}