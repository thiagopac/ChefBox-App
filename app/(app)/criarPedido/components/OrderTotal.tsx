import AppText from '@/components/AppText';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';

interface OrderTotalProps {
    total: number;
    onCreateOrder: () => void;
}

export default function OrderTotal({ total, onCreateOrder }: OrderTotalProps) {
    return (
        <View style={styles.TotalContainer}>
            <View>
                <AppText style={styles.TotalPagar}>Total a Pagar</AppText>
                <AppText style={styles.TotalPreco}>
                    R$ {total.toFixed(2).replace(".", ",")}
                </AppText>
            </View>
            <Button
                style={styles.TotalButton}
                buttonColor="#E53935"
                rippleColor="#ffffffb3"
                mode="contained"
                onPress={onCreateOrder}
            >
                Realizar Pedido
            </Button>
        </View>
    );
}
