import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTarefa from "../screens/AdicionarTarefa";
import MinhasTarefas from "../screens/MinhasTarefas";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddTarefa" component={AddTarefa} />
            <Stack.Screen name="MinhasTarefas" component={MinhasTarefas} />
        </Stack.Navigator>
    )
}

export default StackRoutes;