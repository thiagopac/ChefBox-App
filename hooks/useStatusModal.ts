import { StatusModalType } from '@/components/StatusModal';
import { useCallback, useState } from 'react';

interface StatusModalState {
    visible: boolean;
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

export function useStatusModal() {
    const [modalState, setModalState] = useState<StatusModalState>({
        visible: false,
        type: 'info',
        title: '',
        message: '',
    });

    const showModal = useCallback((config: Omit<StatusModalState, 'visible'>) => {
        setModalState({
            ...config,
            visible: true,
        });
    }, []);

    const hideModal = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            visible: false,
        }));
    }, []);

    // Convenience methods for different types
    const showSuccess = useCallback((
        title: string,
        message: string,
        options?: Partial<StatusModalState>
    ) => {
        showModal({
            type: 'success',
            title,
            message,
            autoClose: true,
            autoCloseDelay: 3000,
            ...options,
        });
    }, [showModal]);

    const showError = useCallback((
        title: string,
        message: string,
        options?: Partial<StatusModalState>
    ) => {
        showModal({
            type: 'error',
            title,
            message,
            showSecondaryButton: false,
            ...options,
        });
    }, [showModal]);

    const showWarning = useCallback((
        title: string,
        message: string,
        options?: Partial<StatusModalState>
    ) => {
        showModal({
            type: 'warning',
            title,
            message,
            showSecondaryButton: true,
            ...options,
        });
    }, [showModal]);
    const showInfo = useCallback((
        title: string,
        message: string,
        options?: Partial<StatusModalState>
    ) => {
        showModal({
            type: 'info',
            title,
            message,
            ...options,
        });
    }, [showModal]);

    // Método para confirmação com dois botões
    const showConfirmation = useCallback((
        title: string,
        message: string,
        onConfirm: () => void,
        onCancel?: () => void,
        options?: Partial<StatusModalState>
    ) => {
        showModal({
            type: 'warning',
            title,
            message,
            primaryButtonText: 'Confirmar',
            secondaryButtonText: 'Cancelar',
            showSecondaryButton: true,
            onPrimaryPress: () => {
                onConfirm();
                hideModal();
            },
            onSecondaryPress: () => {
                if (onCancel) onCancel();
                hideModal();
            },
            ...options,
        });
    }, [showModal, hideModal]);

    return {
        modalState,
        showModal,
        hideModal,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirmation,
    };
}
