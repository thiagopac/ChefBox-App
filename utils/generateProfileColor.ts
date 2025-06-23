export const generateConsistentColor = (text: string): string => {
    // Cores predefinidas que ficam boas com texto branco
    const colors = [
        '#E53935', // Vermelho
        '#1976D2', // Azul
        '#388E3C', // Verde
        '#F57C00', // Laranja
        '#7B1FA2', // Roxo
        '#5D4037', // Marrom
        '#455A64', // Cinza-azulado
        '#D32F2F', // Vermelho escuro
        '#1565C0', // Azul escuro
        '#2E7D32', // Verde escuro
        '#EF6C00', // Laranja escuro
        '#6A1B9A', // Roxo escuro
        '#8D6E63', // Marrom claro
        '#546E7A', // Cinza
        '#C62828', // Vermelho médio
        '#0D47A1', // Azul muito escuro
    ];

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; 
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

export const getInitialsBackgroundColor = (initials: string): string => {
    return generateConsistentColor(initials);
};

export const getNameBackgroundColor = (name: string): string => {
    return generateConsistentColor(name);
};