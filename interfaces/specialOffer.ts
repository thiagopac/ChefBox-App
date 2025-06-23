export interface SpecialOffer {
    id:string;
    chefId: string; // ID do chef associado à oferta especial
    dishId: string; // ID do prato associado à oferta especial
    newPrice: number; // Novo preço do prato na oferta especial
    expiresAt: Date; // Data de expiração da oferta especial
}