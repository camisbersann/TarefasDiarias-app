import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { TaskContext } from "../../context/TaskContext";
import { Picker } from "@react-native-picker/picker";

export default function AddTarefa() {
    const {addTarefa} = useContext(TaskContext);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensgem, setTipoMensagem] = useState("");

    const clearInputs = () => {
        setTitulo("");
        setDescricao("");
        setData("");
        setPrioridade("");
    }

    const handleAddTask = () => {
        if(!titulo || !descricao || !data || !prioridade){
            setMensagem("Preencha todos os campos");
            setTipoMensagem("erro");
            return;
    }
    addTarefa(titulo, descricao, data, prioridade);
    setMensagem("Tarefa adicionada com sucesso");
    setTipoMensagem("sucesso");
    clearInputs();

}
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Adicionar Tarefa</Text>
            <TextInput
            style={styles.input}
            placeholder="Titulo"
            value={titulo}
            onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite a descrição"
            value={descricao}
            onChangeText={setDescricao}
            />

            <Text style={styles.label}>Data</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite a data"
            value={data}
            onChangeText={setData}
            />

            <Text style={styles.label}>Prioridade</Text>
            <Picker selectedValue ={prioridade} onValueChange={(itemValue)=> setPrioridade(itemValue)} style={styles.input}>
                <Picker.Item label="Baixa" value="baixa" />
                <Picker.Item label="Média" value="media" />
                <Picker.Item label="Alta" value="alta" />
            </Picker>
          
          <TouchableOpacity onPress={handleAddTask}>
            <Text>Adicionar Tarefa</Text>
          </TouchableOpacity>

          {mensagem? (
            <Text style={tipoMensgem == 'erro' ? styles.erro : styles.sucesso}>{mensagem}</Text>
          ): null}
        </View>
    )

    
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, padding: 8, marginBottom: 10 },
    label: { fontWeight: 'bold', marginBottom: 4 },
    erro: { color: 'red', marginTop: 8 },
    sucesso: { color: 'green', marginTop: 8 }
});
