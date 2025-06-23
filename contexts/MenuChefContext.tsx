import { ChefMenuDto, ChefReviewDto } from "@/interfaces/chefMenu";
import { GetChefMenu, GetReviews } from "@/services/menuService";
import React, { createContext } from "react";

interface ChefMenuContextType {
    fetchChefMenu: (chefId: string) => Promise<void>;
    fetchReviews: (chefId: string) => Promise<void>;
    chefMenuData: ChefMenuDto | null;
    quantidadeAvaliacoes: number;
    notaMediaDoChef: number;
    isLoading: boolean;
    isLoadingReviews: boolean;
};

const ChefMenuContext = createContext<ChefMenuContextType | undefined>(undefined);

export const ChefMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chefMenuData, setChefMenuData] = React.useState<ChefMenuDto | null>(null);
    const [notaMediaDoChef, setNotaMediaDoChef] = React.useState<number>(0);
    const [quantidadeAvaliacoes, setQuantidadeAvaliacoes] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isLoadingReviews, setIsLoadingReviews] = React.useState<boolean>(false);
    
    const calculoAvaliacoes = (reviewsChef: ChefReviewDto[]) => {
        const total = reviewsChef.reduce((acc, reviews) => acc + reviews.review.rating, 0);
        setNotaMediaDoChef(total / reviewsChef.length);
    }

    async function fetchChefMenu(chefId: string) {
        setIsLoading(true);
        try {
            const data: ChefMenuDto = await GetChefMenu(chefId);
            setChefMenuData(data);
        } catch {
            setChefMenuData(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchReviews(chefId: string) {
        setIsLoadingReviews(true);
        try {
            const data = await GetReviews(chefId);
            if (data.length === 0) {
                setNotaMediaDoChef(0);
                setQuantidadeAvaliacoes(0);
                return;
            }

            calculoAvaliacoes(data);
            setQuantidadeAvaliacoes(data.length);
        } catch {
            setNotaMediaDoChef(0);
            setQuantidadeAvaliacoes(0);
        } finally {
            setIsLoadingReviews(false);
        }
    }

    return (
        <ChefMenuContext.Provider value={{ 
            fetchChefMenu, 
            chefMenuData, 
            fetchReviews, 
            notaMediaDoChef, 
            quantidadeAvaliacoes,
            isLoading,
            isLoadingReviews
        }}>
            {children}
        </ChefMenuContext.Provider>
    );
}

export const useChefMenuContext = (): ChefMenuContextType => {
    const context = React.useContext(ChefMenuContext);
    if (!context) {
        throw new Error("useChefMenuContext deve ser usado dentro de um ChefMenuProvider");
    }
    return context;
};