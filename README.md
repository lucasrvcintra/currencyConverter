# CurrencyConverter 🪙

> Aplicativo móvel conversor de moedas com cotações em tempo real e navegação integrada, desenvolvido com React Native, Expo e TypeScript.

---

## 📱 Sobre o Projeto

O **CurrencyConverter** é um aplicativo mobile para consulta de cotações e conversão entre moedas mundiais em tempo real, integrado à [ExchangeRate-API](https://www.exchangerate-api.com/). O usuário pode explorar uma lista completa com mais de 160 moedas, gerenciar suas moedas favoritas com persistência local e realizar simulações de conversão precisas com suporte aos temas claro (*Light*) e escuro (*Dark*).

O projeto foi desenvolvido para atender aos requisitos práticos da disciplina de **Desenvolvimento Mobile** da **UniAcademia**, combinando navegação por menu lateral (**Drawer**) e abas inferiores (**Bottom Tabs**) através do **Expo Router** (*File-Based Routing*).

---

## ✨ Funcionalidades

- 🌐 **Catálogo Global de Moedas**: Consulta em tempo real de mais de 160 moedas suportadas pela ExchangeRate-API com barra de pesquisa instantânea por código (ex: `BRL`, `USD`, `EUR`) ou nome.
- ⭐ **Moedas Favoritas**: Gestão de moedas preferidas com persistência local em disco via `AsyncStorage`, permitindo acesso rápido e início de conversão com um toque.
- 🔄 **Calculadora de Conversão**:
  - Seleção de Moeda Origem e Moeda Destino via modal de pesquisa.
  - Botão de inversão rápida de moedas (*Swap*).
  - Cálculo instantâneo consumindo o endpoint oficial da API.
  - Exibição de valor de origem, valor convertido em destaque e taxa de conversão utilizada, com opção para fechar/limpar.
- 🧭 **Navegação Integrada (File-Based Routing)**:
  - **Drawer Navigation** na raiz para acesso a **Início**, **Moedas** e **Sobre**.
  - **Bottom Tabs Navigation** no fluxo de Moedas para alternar entre as abas **Moedas**, **Favoritas** e **Converter**.
- ℹ️ **Tela Sobre**: Informações acadêmicas da instituição (UniAcademia), do aluno (Lucas Cintra), disciplina e stack utilizada, com botão de retorno às moedas.
- 🌓 **Temas Claro e Escuro**: Adaptação dinâmica e automática ao tema do sistema operacional, com componentes reutilizáveis `ThemedView` e `ThemedText`.
- 📱 **Áreas Seguras**: Uso de `SafeAreaProvider` e `SafeAreaView` para garantir compatibilidade com recortes de tela (notch, dynamic island) e barras do sistema.

---

## 🛠️ Tecnologias e Ferramentas

- **[React Native](https://reactnative.dev/)** (v0.88.1) - Framework para desenvolvimento mobile multiplataforma.
- **[Expo](https://expo.dev/)** (SDK 58) - Plataforma e ferramentas de desenvolvimento do aplicativo.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Navegação baseada em arquivos (Drawer e Bottom Tabs).
- **[TypeScript](https://www.typescriptlang.org/)** (v6.0) - Tipagem estática de dados e componentes.
- **[React](https://react.dev/)** (v19.3.0) - Construção da interface com componentes reativos.
- **[ExchangeRate-API](https://www.exchangerate-api.com/)** - API de dados cambiais e cotações em tempo real.
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Armazenamento assíncrono para persistência de moedas favoritas.
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** e **[Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Suporte a gestos e animações fluidas do Drawer.
- **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)** - Tratamento das áreas seguras da tela.
- **[Expo Vector Icons](https://icons.expo.fyi/)** - Ícones Ionicons no Drawer, abas e ações.

---

## 📁 Estrutura do Projeto

```text
currencyConverter/
├── assets/
│   ├── expo.icon/              # Ícone do app para iOS
│   └── images/                 # Ícones adaptativos e splash screen
├── src/
│   ├── app/                    # Rotas e telas do Expo Router
│   │   ├── _layout.tsx         # Drawer raiz, tema e provedores globais
│   │   ├── index.tsx           # Tela Início com apresentação do app
│   │   ├── about.tsx           # Tela Sobre com dados acadêmicos
│   │   └── moedas/
│   │       ├── _layout.tsx     # Bottom Tabs (Moedas, Favoritas, Converter)
│   │       ├── index.tsx       # Aba Moedas (Listagem da API)
│   │       ├── favorites.tsx   # Aba Favoritas (Persistidas no AsyncStorage)
│   │       └── convert.tsx     # Aba Converter (Calculadora de câmbio)
│   ├── components/
│   │   ├── ConversionResultCard.tsx # Cartão de exibição do resultado
│   │   ├── CurrencyCard.tsx    # Cartão de item de moeda com favorito
│   │   ├── CurrencyPickerModal.tsx  # Modal de seleção e busca de moeda
│   │   ├── EmptyState.tsx      # Estado ilustrado para listas vazias
│   │   ├── ThemedText.tsx      # Componente de texto dinâmico
│   │   └── ThemedView.tsx      # Contêiner dinâmico com suporte a tema
│   ├── context/
│   │   └── FavoritesContext.tsx # Contexto e gerenciamento de favoritas
│   ├── services/
│   │   └── currencyApi.ts      # Integração direta com a ExchangeRate-API
│   └── types/
│       └── currency.ts         # Tipos e contratos de resposta da API
├── .env                        # Chave da API (EXPO_PUBLIC_EXCHANGERATE_API_KEY)
├── .env.example                # Exemplo de configuração de variáveis
├── app.json                    # Configurações do Expo
├── eslint.config.js            # Configuração do ESLint
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) em versão LTS compatível com o Expo SDK 58 e gerenciador de pacotes **npm**.
- Chave de acesso gratuita da [ExchangeRate-API](https://www.exchangerate-api.com/).
- Para testar no celular físico, **Expo Go compatível com o SDK 58** ou uma compilação de desenvolvimento instalada.
- Alternativamente, emulador Android configurado ou simulador iOS (disponível no macOS com Xcode).

### Passo a Passo

1. **Acesse o diretório do projeto:**

   ```bash
   cd currencyConverter
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto (ou copie a partir de `.env.example`) e informe a sua chave gratuita:

   ```bash
   cp .env.example .env
   ```

   Edite o `.env` e defina:
   ```env
   EXPO_PUBLIC_EXCHANGERATE_API_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npx expo start
   ```

5. **Abra o app:**

   - **No celular físico**: Escaneie o código QR exibido no terminal pelo Expo Go compatível.
   - **No emulador Android**: Pressione `a` no terminal.
   - **No simulador iOS**: Pressione `i` no terminal.
   - **No navegador web**: Pressione `w` no terminal.

---

## 📋 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run start` ou `npx expo start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Inicia o servidor e abre o app no Android |
| `npm run ios` | Inicia o servidor e abre o app no simulador iOS |
| `npm run web` | Inicia a aplicação no navegador web |
| `npm run lint` | Executa a verificação de código com ESLint / Expo Lint |
| `npx tsc --noEmit` | Executa a checagem estática de tipos do TypeScript |

---

Feito por [Lucas Cintra](https://github.com/lucasrvcintra).
