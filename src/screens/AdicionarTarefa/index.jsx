import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TaskContext } from "../../context/TaskContext";

export default function AddTarefa({ navigation, route }) {
  const { addTarefa, editTarefa, tarefaParaEditar, setTarefaParaEditar } = useContext(TaskContext);

  // estados do formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [mensagem, setMensagem] = useState("");

  // Preenche o formulário se for edição
  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo);
      setDescricao(tarefaParaEditar.descricao);
      setData(tarefaParaEditar.data);
      setPrioridade(tarefaParaEditar.prioridade);
    }
  }, [tarefaParaEditar]);

  const handleSubmit = () => {
    if (!titulo || !data) {
      setMensagem("Título e Data são obrigatórios!");
      return;
    }

    if (tarefaParaEditar) {
      editTarefa(tarefaParaEditar.id, titulo, descricao, data, prioridade);
      setMensagem("Tarefa editada com sucesso!");
      setTarefaParaEditar(null); // limpa o estado
    } else {
      addTarefa(titulo, descricao, data, prioridade);
      setMensagem("Tarefa adicionada com sucesso!");
    }

    // limpa formulário se for adicionar nova tarefa
    if (!tarefaParaEditar) {
      setTitulo("");
      setDescricao("");
      setData("");
      setPrioridade("Média");
    }

    // opcional: voltar para MinhasTarefas
    navigation.navigate("MinhasTarefas");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
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

      <Text style={styles.label}>Data *</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={data}
        onChangeText={setData}
      />

      <Text style={styles.label}>Prioridade</Text>
      <Picker
        selectedValue={prioridade}
        onValueChange={(itemValue) => setPrioridade(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Baixa" value="Baixa" />
        <Picker.Item label="Média" value="Média" />
        <Picker.Item label="Alta" value="Alta" />
      </Picker>

      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {tarefaParaEditar ? "Editar Tarefa" : "Adicionar Tarefa"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MinhasTarefas")}>
  <Text>Ir para MinhasTarefas</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  label: { fontWeight: "bold", marginTop: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginTop: 4 },
  button: { backgroundColor: "#007bff", padding: 14, borderRadius: 8, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  mensagem: { color: "green", marginTop: 10, textAlign: "center" }
});
