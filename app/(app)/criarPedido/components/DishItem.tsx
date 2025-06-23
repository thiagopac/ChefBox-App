import AppText from '@/components/AppText';
import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';

interface DishItemProps {
    dish: {
        id: string;
        name: string;
        description: string;
        imageUrl?: string;
        price: number;
        hasOffer: boolean;
        originalPrice: number;
    };
    quantity: number;
    onUpdateQuantity: (dishId: string, newQuantity: number) => void;
}

export default function DishItem({ dish, quantity, onUpdateQuantity }: DishItemProps) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.presentationContainer}>
                <Image
                    source={dish.imageUrl || 'https://placehold.co/70x70'}
                    style={styles.imagemContainer}
                />
                <View style={{ flex: 1 }}>
                    <View style={styles.titleSection}>
                        <AppText style={styles.pratoTitle}>
                            {dish.name}
                        </AppText>
                        {dish.hasOffer && (
                            <View style={styles.ofertaLabel}>
                                <AppText style={styles.ofertaText}>
                                    🔥 OFERTA
                                </AppText>
                            </View>
                        )}
                    </View>
                    <AppText style={styles.itemDescription}>
                        {dish.description}
                    </AppText>
                </View>
            </View>
            
            {/* Row com Quantidade e Preço */}
            <View style={styles.pratoQtd}>
                {/* Seção da Quantidade - Esquerda */}
                <View style={styles.quantitySection}>
                    <AppText style={styles.quantityLabel}>Qtde:</AppText>
                    <View style={styles.pratoNumber}>
                        <Button
                            style={styles.qtdeButton}
                            onPress={() => onUpdateQuantity(dish.id, quantity - 1)}
                            rippleColor="#ff00001a"
                        >
                            <AppText style={styles.qtdeTextButton}>-</AppText>
                        </Button>
                        <AppText style={styles.qtdeText}>{quantity}</AppText>
                        <Button
                            style={styles.qtdeButton}
                            onPress={() => onUpdateQuantity(dish.id, quantity + 1)}
                            rippleColor="#ff00001a"
                        >
                            <AppText style={styles.qtdeTextButton}>+</AppText>
                        </Button>
                    </View>
                </View>

                {/* Seção do Preço - Direita */}
                <View style={styles.priceSection}>
                    {dish.hasOffer ? (
                        <>
                            <AppText style={styles.originalPrice}>
                                R$ {dish.originalPrice.toFixed(2).replace(".", ",")}
                            </AppText>
                            <AppText style={styles.offerPrice}>
                                R$ {dish.price.toFixed(2).replace(".", ",")}
                            </AppText>
                        </>
                    ) : (
                        <AppText style={styles.regularPrice}>
                            R$ {dish.price.toFixed(2).replace(".", ",")}
                        </AppText>
                    )}
                </View>
            </View>
        </View>
    );
}