# Tarefas Diárias App

O Tarefas Diárias App é um aplicativo mobile desenvolvido em React Native com Expo para gerenciar tarefas do dia a dia.
Permite adicionar, editar, excluir e marcar tarefas como concluídas, além de filtrar por prioridade e status.

## Tecnologias
- React Native (mobile multiplataforma)
- Expo (facilita execução em dispositivos e emuladores)
- React Navigation (navegação entre telas)
- Date-fns (manipulação de datas)
- React Native Picker (seleção de prioridade)
- React Native DateTimePicker (seleção de datas)
- FontAwesome / Vector Icons (ícones no app)

## Instalações
1. Clone do projeto:\
   `git clone https://github.com/camisbersann/TarefasDiarias-app.git`
   
2. Instale as dependências:\
`npm install`

3. Instale dependências adicionais:\
   `npx expo install react-dom react-native-web @expo/metro-runtime`\
   `npx expo install react-native-screens react-native-safe-area-context`\
   `npx expo install @react-native-community/datetimepicker`\
  `npm install @react-navigation/native`\
  `npm install @react-navigation/native-stack`\
  `npm install react-native-gesture-handler`\
  `npm install @react-native-picker/picker`\
  `npm install react-native-vector-icons`\
  `npm install date-fns`

## Executando o App:
No smartphone, basta instalar o aplicativo "Expo Go" e escanear o QR code do Expo para abrir o app.\

No terminal do projeto:\
`npm run start`

## Melhorias
*1. Autenticação do usuário*
   - Cadastro/login com email e senha
     
*2. Armazenamento*
   - Integrar banco de dados
     
*3. Categorias*
   - Categorizar tarefas (ex: Trabalho, Estudos, Pessoal)
     
*4. Notificações*
   - Lembretes de tarefas próximas ou vencidas
     
*5. Prioridade Visual*
   - Destacar tarefas de alta prioridade com cores ou ícones diferentes
     
*6. Resumo Diário*
   - Tela que mostre as estastícas: tarefas concluídas, pendentes e próximas

