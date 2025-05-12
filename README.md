# Aplicativo de Controle de Gastos - M1

Um aplicativo mobile criado com React Native e Expo para controle de gastos pessoais.

## Como iniciar o projeto

### Pré-requisitos
- Node.js
- npm ou yarn
- Expo CLI
- Dispositivo físico com Expo Go ou emulador

### Passos para executar

1. **Clone o repositório**
   ```
   git clone https://github.com/Gustaavolp/expense-tracker-mobile-app.git
   cd expense-tracker-mobile-app
   ```

2. **Instale as dependências**
   ```
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Renomeie o arquivo `.env.example` para `.env`
   - Adicione suas credenciais do Firebase

4. **Inicie o aplicativo**
   ```
   npm start
   ```

5. **Acesse o aplicativo**
   - Escaneie o QR Code com o app Expo Go (Android) ou a câmera (iOS)
   - Ou pressione `a` para abrir no emulador Android ou `i` para iOS

## Estrutura do Projeto

```
expense-tracker/
├── assets/           # Recursos estáticos (imagens, ícones)
├── components/       # Componentes reutilizáveis
├── navigation/       # Navegação da aplicação
├── screens/          # Telas do aplicativo
├── App.js            # Componente raiz
├── firebase.js       # Configuração do Firebase
├── metro.config.js   # Configuração do Metro bundler
└── package.json      # Dependências
```

### Principais arquivos

- **screens/**
  - `HomeScreen.js` - Tela principal com lista de despesas
  - `AddExpenseScreen.js` - Formulário para adicionar despesa
  - `EditExpenseScreen.js` - Edição/exclusão de despesa
  - `LoginScreen.js` - Tela de login
  - `RegisterScreen.js` - Cadastro de usuário
  - `ForgotPasswordScreen.js` - Recuperação de senha

- **components/**
  - `Buttons.js` - Botões reutilizáveis
  - `CustomInputs.js` - Campos de entrada customizados
  - `ExpenseComponents.js` - Componentes para exibição de despesas
  - `Layout.js` - Componentes de layout

- **navigation/**
  - `AppNavigator.js` - Navegação para usuários autenticados
  - `AuthNavigator.js` - Navegação para autenticação

## Sobre o metro.config.js

O arquivo `metro.config.js` contém configurações para o Metro Bundler, que é o empacotador de JavaScript usado pelo React Native. Neste projeto, ele tem duas funções principais:

1. **Suporte ao Firebase com Expo SDK 53**:
   - Adiciona suporte para arquivos `.cjs` (CommonJS)
   - Necessário para integração adequada do Firebase

2. **Resolução de conflitos de pacotes**:
   - Desabilita o comportamento estrito de resolução de "exports"
   - Evita erros com dependências como Firebase e React-Native-WebView

Esta configuração é essencial para resolver problemas de compatibilidade entre o Firebase e o Expo SDK 53, que de outra forma causariam erros durante a execução do aplicativo.
