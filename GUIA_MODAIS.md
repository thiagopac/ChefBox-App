# 📋 Guia Completo: Como Usar os Modais Customizados

## 🎯 O que foi implementado

Substituímos todos os `Alert.alert()` por modais customizados mais bonitos e funcionais. Agora você tem:

### ✅ Componentes implementados:
- **StatusModal**: Modal principal com animações e design customizado
- **useStatusModal**: Hook para gerenciar facilmente os modais
- **4 tipos de modal**: success, error, warning, info

---

## 🚀 Como Usar

### 1. **Importar o hook**
```tsx
import { useStatusModal } from '@/hooks/useStatusModal';
import StatusModal from '@/components/StatusModal';
```

### 2. **Usar no componente**
```tsx
export default function MeuComponente() {
    const { 
        modalState, 
        hideModal, 
        showSuccess, 
        showError, 
        showWarning, 
        showInfo,
        showConfirmation 
    } = useStatusModal();

    // Seu código aqui...

    return (
        <View>
            {/* Seu conteúdo */}
            
            {/* Adicionar o modal no final */}
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
```

---

## 📝 Exemplos Práticos

### 🎉 **Modal de Sucesso**
```tsx
// Simples
showSuccess('Sucesso!', 'Operação realizada com sucesso!');

// Com ação personalizada
showSuccess('Pedido Criado!', 'Seu pedido foi criado com sucesso!', {
    primaryButtonText: 'Ver Pedidos',
    onPrimaryPress: () => {
        router.push('/pedidos');
        hideModal();
    }
});

// Com fechamento automático
showSuccess('Salvo!', 'Dados salvos automaticamente', {
    autoClose: true,
    autoCloseDelay: 2000 // 2 segundos
});
```

### ❌ **Modal de Erro**
```tsx
// Simples
showError('Erro!', 'Não foi possível realizar a operação.');

// Com ação personalizada
showError('Falha na Conexão', 'Verifique sua internet e tente novamente.', {
    primaryButtonText: 'Tentar Novamente',
    onPrimaryPress: () => {
        tentarNovamente();
        hideModal();
    }
});
```

### ⚠️ **Modal de Aviso**
```tsx
// Simples
showWarning('Atenção', 'Selecione pelo menos um item!');

// Com dois botões
showWarning('Dados não salvos', 'Deseja continuar sem salvar?', {
    showSecondaryButton: true,
    primaryButtonText: 'Continuar',
    secondaryButtonText: 'Cancelar',
    onPrimaryPress: () => {
        continuarSemSalvar();
        hideModal();
    }
});
```

### ℹ️ **Modal de Informação**
```tsx
showInfo('Informação', 'Esta funcionalidade estará disponível em breve.');
```

### 🤔 **Modal de Confirmação**
```tsx
showConfirmation(
    'Confirmar Exclusão',
    'Tem certeza que deseja excluir este item?',
    () => {
        // Função executada ao confirmar
        excluirItem();
    },
    () => {
        // Função executada ao cancelar (opcional)
        console.log('Cancelado');
    }
);
```

---

## 🎨 Personalizações Avançadas

### **Modal com configurações completas**
```tsx
const { showModal } = useStatusModal();

showModal({
    type: 'warning',
    title: 'Título Personalizado',
    message: 'Mensagem detalhada aqui...',
    primaryButtonText: 'Confirmar',
    secondaryButtonText: 'Cancelar',
    showSecondaryButton: true,
    autoClose: false,
    onPrimaryPress: () => {
        // Ação do botão principal
        hideModal();
    },
    onSecondaryPress: () => {
        // Ação do botão secundário
        hideModal();
    }
});
```

---

## 🔧 Métodos Disponíveis

| Método | Descrição | Exemplo |
|--------|-----------|---------|
| `showSuccess()` | Modal verde de sucesso | `showSuccess('Sucesso!', 'Tudo certo!')` |
| `showError()` | Modal vermelho de erro | `showError('Erro!', 'Algo deu errado')` |
| `showWarning()` | Modal laranja de aviso | `showWarning('Atenção!', 'Cuidado!')` |
| `showInfo()` | Modal azul informativo | `showInfo('Info', 'Informação importante')` |
| `showConfirmation()` | Modal de confirmação com 2 botões | `showConfirmation('Confirmar?', 'Deseja continuar?', onConfirm)` |
| `showModal()` | Modal totalmente customizado | `showModal({...configurações})` |
| `hideModal()` | Fecha o modal atual | `hideModal()` |

---

## 🎭 Tipos de Modal

### **success** 🎉
- **Cor**: Verde
- **Ícone**: ✅
- **Uso**: Operações bem-sucedidas
- **Auto-close**: Habilitado por padrão (3s)

### **error** ❌
- **Cor**: Vermelho  
- **Ícone**: ❌
- **Uso**: Erros e falhas
- **Auto-close**: Desabilitado

### **warning** ⚠️
- **Cor**: Laranja
- **Ícone**: ⚠️
- **Uso**: Avisos e confirmações
- **Botão secundário**: Habilitado por padrão

### **info** ℹ️
- **Cor**: Azul
- **Ícone**: ℹ️  
- **Uso**: Informações gerais

---

## 🚨 Substituições Realizadas

**Antes:**
```tsx
Alert.alert('Título', 'Mensagem', [
    { text: 'OK', onPress: () => console.log('OK') }
]);
```

**Depois:**
```tsx
showSuccess('Título', 'Mensagem', {
    onPrimaryPress: () => {
        console.log('OK');
        hideModal();
    }
});
```

---

## 💡 Dicas

1. **Sempre adicione o componente StatusModal** no final do seu JSX
2. **Use hideModal()** dentro das funções onPress quando necessário
3. **Abuse do autoClose** para mensagens rápidas de sucesso
4. **Use showConfirmation()** para ações destrutivas
5. **Personalize os textos** dos botões conforme necessário

---

## 🔥 Benefícios

✅ **Visual mais bonito** que os alerts nativos  
✅ **Animações suaves** de entrada e saída  
✅ **Totalmente customizável** com cores e ícones  
✅ **Responsivo** e adaptado ao design do app  
✅ **TypeScript completo** com autocompletar  
✅ **Reutilizável** em qualquer tela do app
