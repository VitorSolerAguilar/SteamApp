# 1. Título do Projeto
### SteamApp

---

# 2. Proposta e Escopo
O aplicativo tem como objetivo funcionar como um explorador mobile do ecossistema da Steam. Ele permite que os usuários acompanhem facilmente quais são os jogos mais populares e jogados no momento. 

O público-alvo são gamers e entusiastas de computadores que desejam consultar informações sobre jogos em alta de forma rápida pelo smartphone, além de oferecer a possibilidade de salvar os títulos de maior interesse em uma lista de desejos personalizada para consultas futuras.

---

# 3. Funcionalidades Principais
* **Catálogo em Tempo Real:** Listagem dinâmica dos 30 jogos com o maior pico de jogadores simultâneos no momento.
* **Busca e Filtros Avançados (useReducer):** Capacidade de buscar jogos específicos pelo seu identificador (AppID) e ordenar o catálogo dinamicamente entre o maior e o menor pico de jogadores.
* **Detalhes Aprofundados:** Tela dedicada para cada jogo exibindo capa, sinopse, gêneros e desenvolvedores.
* **Wishlist Global (Context API):** Sistema de "Lista de Desejos" que permite ao usuário favoritar e desfavoritar jogos. O estado é compartilhado globalmente, permitindo acesso através de uma tela dedicada de Favoritos.
* **Navegação Fluida (Stack Navigation):** Transições contínuas entre a lista principal, a tela de detalhes e a Wishlist, com passagem de parâmetros rigorosa via rotas.

---

# 4. API Utilizada
O projeto consome dados reais através de endpoints públicos fornecidos pela própria Valve:
* **Steam Charts API (Lista de jogos em alta):** [https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/](https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/)
* **Steam Storefront API (Detalhes específicos do jogo):** [https://store.steampowered.com/api/appdetails](https://store.steampowered.com/api/appdetails)

---

# 5. Instruções de Execução

Para rodar este projeto localmente na sua máquina, certifique-se de ter o ambiente Node.js configurado. Siga o passo a passo rigorosamente abaixo:

**Passo 1: Clonar o repositório e acessar a pasta do projeto**
```bash
git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd SteamApp
```

**Passo 2: Instalar as dependências**
Execute os comandos abaixo no terminal, um por um, para garantir que todas as bibliotecas de navegação e consumo de API sejam instaladas corretamente:

```bash
# 1. Instalar as dependências base do projeto
npm i

# 2. Instalar o core do React Navigation e o Stack Navigator
npm install @react-navigation/native @react-navigation/stack

# 3. Instalar as dependências nativas de tela e área segura do Expo
npm install react-native-screens react-native-safe-area-context

# 4. Instalar o gerenciador de gestos (dependência obrigatória do Stack)
npm install react-native-gesture-handler

# 5. Instalar o Axios para lidar com as requisições HTTP da API
npm install axios
```

**Passo 3: Executar o aplicativo** Inicie o servidor do Metro Bundler através do script padrão do projeto: 

```bash 
npm run start
```

**Passo 4: Visualizar o App**

- **Via Emulador Android:** Com o servidor rodando no terminal, pressione a tecla `a` para abrir automaticamente no emulador.
    
- **Via Dispositivo Físico:** Baixe o aplicativo **Expo Go** na loja de aplicativos do seu celular e escaneie o QR Code exibido no terminal.
