import AppText from '@/components/AppText';
import { colors } from '@/constants/Styles';
import React from 'react';
import { Animated, Modal, Pressable, View } from 'react-native';
import { Button } from 'react-native-paper';
import { StatusModalStyles } from './StatusModalStyles';

export type StatusModalType = 'success' | 'error' | 'warning' | 'info';

interface StatusModalProps {
    visible: boolean;
    onDismiss: () => void;
    type: StatusModalType;
    title: string;
    message: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
    showSecondaryButton?: boolean;
    autoClose?: boolean;
    autoCloseDelay?: number;
}

export default function StatusModal({
    visible,
    onDismiss,
    type,
    title,
    message,
    primaryButtonText = 'OK',
    secondaryButtonText = 'Cancelar',
    onPrimaryPress,
    onSecondaryPress,
    showSecondaryButton = false,
    autoClose = false,
    autoCloseDelay = 3000,
}: StatusModalProps) {
    
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

    React.useEffect(() => {
        if (visible) {
            // Animação de entrada
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Animação de saída
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, fadeAnim, scaleAnim]);
    
    // Auto close functionality
    React.useEffect(() => {
        if (visible && autoClose) {
            const timer = setTimeout(() => {
                onDismiss();
            }, autoCloseDelay);
            
            return () => clearTimeout(timer);
        }
    }, [visible, autoClose, autoCloseDelay, onDismiss]);

    const getIconByType = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return 'ℹ️';
        }
    };

    const getColorByType = () => {
        switch (type) {
            case 'success':
                return '#4CAF50';
            case 'error':
                return '#F44336';
            case 'warning':
                return '#FF9800';
            case 'info':
                return '#2196F3';
            default:
                return colors.primary;
        }
    };

    const handlePrimaryPress = () => {
        if (onPrimaryPress) {
            onPrimaryPress();
        } else {
            onDismiss();
        }
    };

    const handleSecondaryPress = () => {
        if (onSecondaryPress) {
            onSecondaryPress();
        } else {
            onDismiss();
        }
    };    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onDismiss}
        >
            <Pressable 
                style={StatusModalStyles.overlay}
                onPress={onDismiss}
                disabled={autoClose}
            >
                <Animated.View 
                    style={[
                        StatusModalStyles.modalContainer,
                        {
                            opacity: fadeAnim,
                        }
                    ]}
                >
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <Animated.View 
                            style={[
                                StatusModalStyles.modalContent,
                                {
                                    transform: [{ scale: scaleAnim }]
                                }
                            ]}
                        >
                            {/* Header com ícone */}
                            <View style={StatusModalStyles.iconContainer}>
                                <View style={[
                                    StatusModalStyles.iconBackground, 
                                    { backgroundColor: getColorByType() + '20' }
                                ]}>
                                    <AppText style={StatusModalStyles.iconText}>
                                        {getIconByType()}
                                    </AppText>
                                </View>
                            </View>

                            {/* Título */}
                            <AppText style={[
                                StatusModalStyles.title,
                                { color: getColorByType() }
                            ]}>
                                {title}
                            </AppText>

                            {/* Mensagem */}
                            <AppText style={StatusModalStyles.message}>
                                {message}
                            </AppText>

                            {/* Auto close indicator */}
                            {autoClose && (
                                <View style={StatusModalStyles.autoCloseIndicator}>
                                    <AppText style={StatusModalStyles.autoCloseText}>
                                        Este modal fechará automaticamente
                                    </AppText>
                                </View>
                            )}

                            {/* Botões */}
                            <View style={StatusModalStyles.buttonContainer}>
                                {showSecondaryButton && (
                                    <Button
                                        mode="outlined"
                                        onPress={handleSecondaryPress}
                                        style={[
                                            StatusModalStyles.secondaryButton,
                                            { borderColor: getColorByType() }
                                        ]}
                                    >
                                        <AppText style={{ color: getColorByType() }}>
                                            {secondaryButtonText}
                                        </AppText>
                                    </Button>
                                )}
                                
                                <Button
                                    mode="contained"
                                    onPress={handlePrimaryPress}
                                    style={[
                                        StatusModalStyles.primaryButton,
                                        showSecondaryButton ? { flex: 1 } : { width: '100%' },
                                        { backgroundColor: getColorByType() }
                                    ]}
                                >
                                    <AppText style={StatusModalStyles.primaryButtonText}>
                                        {primaryButtonText}
                                    </AppText>
                                </Button>
                            </View>
                        </Animated.View>
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    );
}
