import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppText from './AppText';

interface LoadingSpinnerProps {
    isLoading: boolean;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading, text = 'Carregando...' }) => {
    if (!isLoading) return null;

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#E53935" />
            <AppText style={styles.text}>{text}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
    },
});

export default LoadingSpinner;