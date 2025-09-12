import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTarefa from "../screens/AdicionarTarefa";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AddTarefa" component={AddTarefa} />
        </Stack.Navigator>
    )
}

export default StackRoutes;