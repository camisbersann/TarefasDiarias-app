import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Importa as rotas em stack (pilha) definidas em outro arquivo
import StackRoutes from "./stack.routes";

//Envolve todas as rotas
export default function Routes() {
    return (
        <NavigationContainer>
            <StackRoutes />
            <StatusBar style="auto" />
        </NavigationContainer>
    )
}
