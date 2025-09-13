import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTarefa from "../screens/AdicionarTarefa";
import MinhasTarefas from "../screens/MinhasTarefas";

// Cria a instância da stack de navegação
const Stack = createNativeStackNavigator();

// Componente que define as rotas
const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddTarefa" component={AddTarefa} />
            <Stack.Screen name="MinhasTarefas" component={MinhasTarefas} />
        </Stack.Navigator>
    )
}

// Exporta o componente para ser usado no NavigationContainer
export default StackRoutes;