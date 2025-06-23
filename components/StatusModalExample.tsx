import AppText from '@/components/AppText';
import StatusModal from '@/components/StatusModal';
import { useStatusModal } from '@/hooks/useStatusModal';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * 🎯 EXEMPLO PRÁTICO: Como usar os modais customizados
 * 
 * Este é um exemplo completo mostrando todos os tipos de modal
 * e como implementá-los em qualquer tela do seu app.
 */
export default function StatusModalExample() {
    const { 
        modalState, 
        hideModal, 
        showSuccess, 
        showError, 
        showWarning, 
        showInfo,
        showConfirmation 
    } = useStatusModal();

    // ✅ Exemplo: Modal de Sucesso Simples
    const exemploSucesso = () => {
        showSuccess('Parabéns!', 'Operação realizada com sucesso!');
    };

    // ❌ Exemplo: Modal de Erro com Ação Personalizada
    const exemploErro = () => {
        showError('Erro de Conexão', 'Falha ao conectar com o servidor.', {
            primaryButtonText: 'Tentar Novamente',
            onPrimaryPress: () => {
                console.log('Tentando novamente...');
                hideModal();
            }
        });
    };

    // ⚠️ Exemplo: Modal de Aviso com Dois Botões
    const exemploAviso = () => {
        showWarning('Dados não salvos', 'Você tem alterações não salvas. Deseja continuar?', {
            showSecondaryButton: true,
            primaryButtonText: 'Continuar',
            secondaryButtonText: 'Salvar Primeiro',
            onPrimaryPress: () => {
                console.log('Continuando sem salvar...');
                hideModal();
            },
            onSecondaryPress: () => {
                console.log('Salvando primeiro...');
                hideModal();
            }
        });
    };

    // ℹ️ Exemplo: Modal Informativo com Auto-Close
    const exemploInfo = () => {
        showInfo('Nova Funcionalidade', 'Esta funcionalidade estará disponível na próxima versão.', {
            autoClose: true,
            autoCloseDelay: 4000 // 4 segundos
        });
    };

    // 🤔 Exemplo: Modal de Confirmação para Exclusão
    const exemploConfirmacao = () => {
        showConfirmation(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
            () => {
                console.log('Item excluído!');
                showSuccess('Excluído!', 'Item removido com sucesso!');
            },
            () => {
                console.log('Exclusão cancelada');
            }
        );
    };

    return (
        <View style={{ flex: 1, padding: 20, gap: 15 }}>
            <AppText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                🎭 Exemplos de Modals
            </AppText>

            <Button mode="contained" onPress={exemploSucesso} buttonColor="#4CAF50">
                ✅ Modal de Sucesso
            </Button>

            <Button mode="contained" onPress={exemploErro} buttonColor="#F44336">
                ❌ Modal de Erro
            </Button>

            <Button mode="contained" onPress={exemploAviso} buttonColor="#FF9800">
                ⚠️ Modal de Aviso
            </Button>

            <Button mode="contained" onPress={exemploInfo} buttonColor="#2196F3">
                ℹ️ Modal Informativo
            </Button>

            <Button mode="contained" onPress={exemploConfirmacao} buttonColor="#9C27B0">
                🤔 Modal de Confirmação
            </Button>

            {/* IMPORTANTE: Sempre adicione o StatusModal no final do componente! */}
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
        </View>
    );
}
