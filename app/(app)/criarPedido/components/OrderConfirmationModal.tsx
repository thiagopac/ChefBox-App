import AppText from '@/components/AppText';
import { Image } from 'expo-image';
import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { styles } from './styles';

interface OrderItem {
    dishId: string;
    quantity: number;
    price: number;
    name: string;
    imageUrl?: string;
}

interface OrderConfirmationModalProps {
    visible: boolean;
    onDismiss: () => void;
    items: OrderItem[];
    total: number;
    onConfirmOrder: () => void;
    isLoading?: boolean;
}

export default function OrderConfirmationModal({
    visible,
    onDismiss,
    items,
    total,
    onConfirmOrder,
    isLoading = false
}: OrderConfirmationModalProps) {
    
    const handleConfirm = () => {
        if (items.length === 0) {
            Alert.alert('Atenção', 'Nenhum item foi selecionado!');
            return;
        }
        onConfirmOrder();
    };

    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.modalHeader}>
                    <AppText style={styles.modalTitle}>Confirmar Pedido</AppText>
                    <AppText style={styles.modalSubtitle}>
                        Revise os itens antes de finalizar
                    </AppText>
                </View>

                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                    {items.map((item, index) => (
                        <View key={`${item.dishId}-${index}`} style={styles.confirmationItem}>
                            <View style={styles.confirmationItemInfo}>
                                <Image
                                    source={item.imageUrl || 'https://placehold.co/50x50'}
                                    style={styles.confirmationImage}
                                />
                                <View style={styles.confirmationDetails}>
                                    <AppText style={styles.confirmationItemName}>
                                        {item.name}
                                    </AppText>
                                    <AppText style={styles.confirmationItemQuantity}>
                                        Quantidade: {item.quantity}
                                    </AppText>
                                    <AppText style={styles.confirmationItemPrice}>
                                        R$ {item.price.toFixed(2).replace(".", ",")}
                                    </AppText>
                                </View>
                            </View>
                            <View style={styles.confirmationItemTotal}>
                                <AppText style={styles.confirmationItemTotalText}>
                                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                </AppText>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.modalFooter}>
                    <View style={styles.modalTotalSection}>
                        <AppText style={styles.modalTotalLabel}>Total do Pedido:</AppText>
                        <AppText style={styles.modalTotalValue}>
                            R$ {total.toFixed(2).replace(".", ",")}
                        </AppText>
                    </View>
                    
                    <View style={styles.modalButtons}>
                        <Button
                            mode="outlined"
                            onPress={onDismiss}
                            style={styles.modalCancelButton}
                            disabled={isLoading}
                        >
                            <AppText style={{ color: '#E53935' }}>Cancelar</AppText>
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleConfirm}
                            style={styles.modalConfirmButton}
                            buttonColor="#E53935"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            <AppText style={{ color: '#fff' }}>
                                {isLoading ? 'Processando...' : 'Confirmar'}
                            </AppText>
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}
