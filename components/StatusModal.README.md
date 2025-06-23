# StatusModal - Modal de Status Personalizado

## 📋 Descrição

O `StatusModal` é um modal personalizado seguindo o padrão de design da aplicação ChefBox para exibir mensagens de status ao usuário. É perfeito para mostrar feedback de operações como sucesso, erro, aviso ou informação.

## ✨ Características

- **4 tipos de status**: success, error, warning, info
- **Cores automáticas**: cada tipo tem sua cor correspondente
- **Ícones visuais**: emojis apropriados para cada tipo
- **Auto-close**: opcional com delay configurável
- **Botões personalizáveis**: suporte a 1 ou 2 botões
- **Responsivo**: adapta-se ao tamanho da tela
- **Acessível**: segue boas práticas de UX/UI

## 🚀 Como Usar

### Implementação Básica

```tsx
import StatusModal from '@/components/StatusModal';
import { useStatusModal } from '@/hooks/useStatusModal';

function MeuComponente() {
    const { modalState, hideModal, showSuccess, showError } = useStatusModal();

    const handleSuccess = () => {
        showSuccess('Sucesso!', 'Operação realizada com sucesso!');
    };

    return (
        <>
            <Button onPress={handleSuccess}>Mostrar Sucesso</Button>
            
            <StatusModal
                visible={modalState.visible}
                onDismiss={hideModal}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                // ... outras props
            />
        </>
    );
}
```

### Métodos do Hook

```tsx
const {
    modalState,    // Estado atual do modal
    hideModal,     // Fecha o modal
    showSuccess,   // Mostra modal de sucesso
    showError,     // Mostra modal de erro  
    showWarning,   // Mostra modal de aviso
    showInfo,      // Mostra modal de informação
    showModal      // Método genérico
} = useStatusModal();
```

### Exemplos Práticos

#### Sucesso com Auto-Close
```tsx
showSuccess(
    'Pedido Criado!', 
    'Seu pedido foi criado com sucesso.',
    { 
        autoClose: true,
        autoCloseDelay: 3000 
    }
);
```

#### Erro Simples
```tsx
showError(
    'Erro na Operação', 
    'Não foi possível completar a operação.'
);
```

#### Warning com Confirmação
```tsx
showWarning(
    'Confirmar Exclusão', 
    'Tem certeza que deseja excluir este item?',
    {
        showSecondaryButton: true,
        primaryButtonText: 'Excluir',
        secondaryButtonText: 'Cancelar',
        onPrimaryPress: () => {
            // Lógica de exclusão
            hideModal();
        }
    }
);
```

## 🎨 Tipos e Cores

| Tipo | Cor | Ícone | Uso Recomendado |
|------|-----|-------|-----------------|
| `success` | Verde `#4CAF50` | ✅ | Operações bem-sucedidas |
| `error` | Vermelho `#F44336` | ❌ | Erros e falhas |
| `warning` | Laranja `#FF9800` | ⚠️ | Avisos e confirmações |
| `info` | Azul `#2196F3` | ℹ️ | Informações gerais |

## 📝 Props do StatusModal

```tsx
interface StatusModalProps {
    visible: boolean;                 // Controla visibilidade
    onDismiss: () => void;           // Callback ao fechar
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;                   // Título do modal
    message: string;                 // Mensagem principal
    primaryButtonText?: string;      // Texto do botão principal
    secondaryButtonText?: string;    // Texto do botão secundário
    onPrimaryPress?: () => void;     // Callback botão principal
    onSecondaryPress?: () => void;   // Callback botão secundário
    showSecondaryButton?: boolean;   // Mostrar botão secundário
    autoClose?: boolean;             // Auto fechar modal
    autoCloseDelay?: number;         // Delay do auto close (ms)
}
```

## 🔧 Personalização

Para personalizar o visual, edite o arquivo `StatusModalStyles.ts`:

```tsx
export const StatusModalStyles = StyleSheet.create({
    modalContainer: {
        // Estilos do container
    },
    modalContent: {
        // Estilos do conteúdo
    },
    // ... outros estilos
});
```

## ⚠️ Cuidados Importantes

1. **Formatação JSX**: Sempre manter quebras de linha adequadas entre tags
2. **Performance**: Usar apenas um StatusModal por tela
3. **UX**: Evitar modais em excesso
4. **Acessibilidade**: Textos claros e concisos

## 🐛 Troubleshooting

**Erro "Text strings must be rendered within a <Text> component"**
- Verificar formatação JSX das tags
- Garantir quebras de linha entre elementos
- Verificar se não há strings soltas no código

**Modal não aparece**
- Verificar se `visible={modalState.visible}` está correto
- Conferir se o Portal está configurado no app principal

## 📚 Implementado em

- ✅ Tela de Criar Pedido (`/criarPedido/index.tsx`)
- ✅ Hook personalizado (`/hooks/useStatusModal.ts`)
- ✅ Componente StatusModal (`/components/StatusModal.tsx`)
- ✅ Estilos (`/components/StatusModalStyles.ts`)

## 🎯 Boas Práticas UX/UI

- **Feedback imediato**: Sempre dar retorno visual das ações
- **Mensagens claras**: Textos objetivos e compreensíveis  
- **Cores consistentes**: Usar as cores padrão do sistema
- **Auto-close inteligente**: Para sucessos, auto-fechar; para erros, aguardar ação
- **Botões contextuais**: Textos dos botões devem ser específicos da ação
