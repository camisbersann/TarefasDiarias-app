import "react-native-gesture-handler";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddTarefa from "./src/screens/AdicionarTarefa";
import MinhasTarefas from "./src/screens/MinhasTarefas";
import { TaskProvider } from "./src/context/TaskContext";

const Stack = createNativeStackNavigator();

// Tela de boas-vindas direto aqui
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo!</Text>
      <Text style={styles.subtitle}>✨Organize suas tarefas de forma prática e conquiste mais produtividade no seu dia a dia!</Text>
      <Image source={require("./assets/icon-list.png")} style={styles.logo}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddTarefa")}
      >
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MinhasTarefas")}
      >
        <Text style={styles.buttonText}>Minhas Tarefas</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="AddTarefa"
            component={AddTarefa}
            options={{ title: "Adicionar Tarefa",
            headerStyle:{
              backgroundColor: "#F2F0EF",
            },
            headerTitleStyle:{
              fontSize: 20,
            },
            headerTitleAlign:"center"
          }} 
          />
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MinhasTarefas"
            component={MinhasTarefas}
            options={{ title: "Ver minhas tarefas",
            headerStyle:{
              backgroundColor: "#F2F0EF",
            },
            headerTitleStyle:{
              fontSize: 20,
            },
            headerTitleAlign:"center"
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F0EF",
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#779ECB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginVertical: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
