# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

# Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para facilitar o desenvolvimento e a manutenção. Aqui está uma visão geral:

```
App-ChefBox/
├── app/                # Rotas baseadas em arquivos (Expo Router).
│   ├── _layout.tsx     # Layout principal para as rotas.
│   ├── index.tsx       # Página inicial.
│   └── example-page.tsx # Página de exemplo.
│
├── components/         # Componentes reutilizáveis da aplicação.
│   └── ui/             # Componentes visuais estilizados.
│
├── constants/          # Constantes globais, como cores e temas.
│
├── hooks/              # Hooks personalizados para lógica reutilizável.
│
├── lib/                # Funções auxiliares e configurações de API.
│
├── assets/             # Arquivos estáticos, como imagens e fontes.
│
├── utils/              # Funções utilitárias e helpers.
│
├── README.md           # Documentação do projeto.
├── package.json        # Dependências e scripts do projeto.
└── tsconfig.json       # Configuração do TypeScript.
```

## Justificativa das Bibliotecas Instaladas

### Gerenciamento de Estado e Formulários
- **[React Hook Form](https://react-hook-form.com/):** Para lidar com formulários de maneira eficiente e leve.
- **[Yup](https://github.com/jquense/yup):** Para validação de esquemas de dados em formulários.

### Estilização
- **[Styled Components](https://styled-components.com/):** Para criar componentes estilizados com CSS-in-JS, permitindo maior flexibilidade e reutilização.

### Chamadas de API
- **[Axios](https://axios-http.com/):** Para realizar requisições HTTP de forma simples e eficiente.

### Internacionalização
- **[i18next](https://www.i18next.com/):** Para suporte a múltiplos idiomas.
- **[react-intl](https://formatjs.io/docs/react-intl/):** Outra opção para internacionalização e formatação de mensagens.

### Animações
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/):** Para criar animações avançadas e fluidas.

### Funcionalidades do Expo
- **[Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/):** Para armazenar dados sensíveis, como tokens.
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/):** Para selecionar imagens da galeria ou câmera.
- **[Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/):** Para implementar notificações push.
- **[Expo File System](https://docs.expo.dev/versions/latest/sdk/filesystem/):** Para manipulação de arquivos no dispositivo.

### Testes
- **[Jest](https://jestjs.io/):** Para testes unitários.
- **[React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/):** Para testes de componentes React Native.

## Links Úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do Expo Router](https://expo.github.io/router/docs)
- [Documentação do React Native](https://reactnative.dev/docs/getting-started)
- [Guia do Styled Components](https://styled-components.com/docs)
- [Guia do Axios](https://axios-http.com/docs/intro)
- [Guia do React Hook Form](https://react-hook-form.com/get-started)
- [Guia do Yup](https://github.com/jquense/yup)
- [Guia do React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Guia do Jest](https://jestjs.io/docs/getting-started)
- [Guia do React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# ChefBox-App
