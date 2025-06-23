import AppText from '@/components/AppText';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusModal from '@/components/StatusModal';
import { useChefMenuContext } from '@/contexts/MenuChefContext';
import { useStatusModal } from '@/hooks/useStatusModal';
import { CreateOrder } from '@/services/orderService';
import { Image } from 'expo-image';
import { useLocalSearchParams } from "expo-router";
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { SlideInRight } from 'react-native-reanimated';
import ChefHeader from './components/ChefHeader';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import { styles } from './components/styles';


export default function Create() {
    const { chefId } = useLocalSearchParams();
    const { chefMenuData, isLoading, fetchChefMenu } = useChefMenuContext();
    const { modalState, hideModal, showError, showSuccess, showWarning } = useStatusModal();
    const dishes = chefMenuData?.dishes || [];

    React.useEffect(() => {
        if (chefId) {
            fetchChefMenu(chefId as string);
        }
    }, [chefId]);

    const dishesWithOffer = dishes.map((dish, index) => {
        if (dish.specialOffer && dish.specialOffer.newPrice) {
            return {
                ...dish,
                hasOffer: true,
                originalPrice: dish.price,
                price: dish.specialOffer.newPrice
            };
        }
        return {
            ...dish,
            hasOffer: false,
            originalPrice: dish.price,
            price: dish.price  
        };

    });


    // Estado para controlar quantidade de cada prato
    const [quantities, setQuantities] = React.useState<{ [key: string]: number }>({});

    // Estado para controlar o modal de confirmação
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);



    // Função para atualizar quantidade de um prato específico
    const updateQuantity = (dishId: string, newQuantity: number) => {
        setQuantities(prev => ({
            ...prev,
            [dishId]: Math.max(0, newQuantity)
        }));
    };

    const calculateTotal = () => {
        return dishesWithOffer.reduce((total, dish) => {
            const quantity = quantities[dish.id] || 0;
            return total + (dish.price * quantity);
        }, 0);
    }; 
    
    const handleCreateOrder = () => {
        const selectedItems = dishesWithOffer
            .filter(dish => (quantities[dish.id] || 0) > 0)
            .map(dish => ({
                dishId: dish.id,
                quantity: quantities[dish.id],
                price: dish.price,
                name: dish.name,
                imageUrl: dish.imageUrl
            }));        if (selectedItems.length === 0) {
            showWarning('Atenção', 'Selecione pelo menos um prato!');
            return;
        }

        setModalVisible(true);
    };

    const handleConfirmOrder = async () => {
        setIsCreatingOrder(true);

        try {
            // Preparar itens para API (apenas dishId e quantity)
            const selectedItemsForAPI = dishesWithOffer
                .filter(dish => (quantities[dish.id] || 0) > 0)
                .map(dish => ({
                    dishId: dish.id,
                    quantity: quantities[dish.id]
                }));

            const orderData = {
                Items: selectedItemsForAPI
            };

            console.log('Dados enviados para API:', orderData);

            const createdOrder = await CreateOrder(orderData);

            setModalVisible(false);
            setIsCreatingOrder(false);            
            showSuccess(
                'Sucesso!',
                `Pedido criado com sucesso!\nNúmero: ${createdOrder.OrderNumber}`,
                {
                    onPrimaryPress: () => {
                        // Reset quantities after successful order
                        setQuantities({});
                        hideModal();
                    }
                }
            );        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            setIsCreatingOrder(false);
            showError(
                'Erro',
                'Não foi possível criar o pedido. Tente novamente.'
            );
        }
    };

    const getSelectedItems = () => {
        return dishesWithOffer
            .filter(dish => (quantities[dish.id] || 0) > 0)
            .map(dish => ({
                dishId: dish.id,
                quantity: quantities[dish.id],
                price: dish.price,
                name: dish.name,
                imageUrl: dish.imageUrl
            }));
    };


    if (isLoading) {
        return (
            <LoadingSpinner isLoading={isLoading} text="Carregando cardápio..." />
        );
    }

    return (
        <Animated.View style={{ flex: 1 }} entering={SlideInRight.duration(400)}>
            <View style={styles.container}>
                <ChefHeader />
                <AppText style={styles.pratoTitle}>Pratos</AppText>
                <ScrollView style={{ width: "100%", padding: 0, margin: 0 }}>
                    {dishesWithOffer.map((dish, index) => (
                        <View style={styles.itemContainer} key={dish.id || index}>
                            <View style={styles.presentationContainer}>
                                <Image
                                    source={dish.imageUrl || 'https://placehold.co/70x70'}
                                    style={styles.imagemContainer}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <AppText style={styles.pratoTitle}>
                                            {dish.name}
                                        </AppText>
                                        {dish.hasOffer && (
                                            <View style={{ position: "relative", right: 50, bottom: 35, backgroundColor: "#E53935", borderRadius: 8, paddingHorizontal: 6, paddingVertical: 6 }}>
                                                <AppText style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
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
                            <View style={styles.pratoQtd}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <AppText>Qtde:</AppText>
                                    <View style={styles.pratoNumber}>
                                        <Button
                                            style={styles.qtdeButton}
                                            onPress={() => updateQuantity(dish.id, (quantities[dish.id] || 0) - 1)}
                                            rippleColor="#ff00001a"
                                        >
                                            <AppText style={styles.qtdeTextButton}>-</AppText>
                                        </Button>
                                        <AppText style={styles.qtdeText}>
                                            {quantities[dish.id] || 0}
                                        </AppText>
                                        <Button
                                            style={styles.qtdeButton}
                                            onPress={() => updateQuantity(dish.id, (quantities[dish.id] || 0) + 1)}
                                            rippleColor="#ff00001a"
                                        >
                                            <AppText style={styles.qtdeTextButton}>+</AppText>
                                        </Button>
                                    </View>
                                </View>
                                <View>
                                    {dish.hasOffer ? (
                                        <>
                                            <AppText style={{ fontSize: 12, color: "#999", textDecorationLine: "line-through" }}>
                                                R$ {dish.originalPrice.toFixed(2).replace(".", ",")}
                                            </AppText>
                                            <AppText style={{ fontSize: 16, fontWeight: "bold", color: "#12c902c1" }}>
                                                R$ {dish.price.toFixed(2).replace(".", ",")}
                                            </AppText>
                                        </>
                                    ) : (
                                        <AppText style={{ fontSize: 16, fontWeight: "bold" }}>
                                            R$ {dish.price.toFixed(2).replace(".", ",")}
                                        </AppText>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.TotalContainer}>
                <View>
                    <AppText style={styles.TotalPagar}>Total a Pagar</AppText>
                    <AppText style={styles.TotalPreco}>
                        R$ {calculateTotal().toFixed(2).replace(".", ",")}
                    </AppText>
                </View>
                <Button
                    style={styles.TotalButton}
                    buttonColor="#E53935"
                    rippleColor="#ffffffb3"
                    mode="contained"
                    onPress={handleCreateOrder}
                    
                >
                    <AppText style={styles.TotalTextButton}>Realizar Pedido</AppText>
                </Button>
            </View>            
            <OrderConfirmationModal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                items={getSelectedItems()}
                total={calculateTotal()}
                onConfirmOrder={handleConfirmOrder}
                isLoading={isCreatingOrder}
            />

            <StatusModal
                visible={modalState.visible}
                onDismiss={hideModal}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                primaryButtonText={modalState.primaryButtonText}
                secondaryButtonText={modalState.secondaryButtonText}
                onPrimaryPress={modalState.onPrimaryPress}
                onSecondaryPress={modalState.onSecondaryPress}
                showSecondaryButton={modalState.showSecondaryButton}
                autoClose={modalState.autoClose}
                autoCloseDelay={modalState.autoCloseDelay}
            />
        </Animated.View>
    );
};