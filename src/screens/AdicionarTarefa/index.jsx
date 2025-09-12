import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TaskContext } from "../../context/TaskContext";
import { format, isBefore, startOfDay } from "date-fns";


export default function AddTarefa({ navigation }) {
  const { addTarefa, editTarefa, tarefaParaEditar, setTarefaParaEditar } = useContext(TaskContext);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(null); // agora é um Date
  const [prioridade, setPrioridade] = useState("Média");
  const [mensagem, setMensagem] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Preenche o formulário se for edição
  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo);
      setDescricao(tarefaParaEditar.descricao);
      setData(new Date(tarefaParaEditar.data));
      setPrioridade(tarefaParaEditar.prioridade);

      navigation.setOptions({title: "Editar Tarefa"});
    } else {
      navigation.setOptions({title: "Adicionar Tarefa"});
    }
  }, [tarefaParaEditar]);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // fecha no Android
    if (selectedDate) {
      const hoje = startOfDay(new Date());
      const dataSelecionada = startOfDay(selectedDate);

      if (isBefore(dataSelecionada, hoje)) {
        setMensagem("Não é possível criar tarefa em data passada!");
        setTimeout(() => setMensagem(""), 3000);
        return;
      }

      setData(dataSelecionada); // salva Date corretamente
      setMensagem("");
    }
  };

  const handleSubmit = () => {
    if (!titulo || !data) {
      setMensagem("Todos os campos são obrigatórios!");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    const dataFormatada = format(data, "yyyy-MM-dd");

    if (tarefaParaEditar) {
      editTarefa(tarefaParaEditar.id, titulo, descricao, dataFormatada, prioridade);
      setMensagem("Tarefa editada com sucesso!");
      setTarefaParaEditar(null);
    } else {
      addTarefa(titulo, descricao, dataFormatada, prioridade);
      setMensagem("Tarefa adicionada com sucesso!");
    }

    setTimeout(() => setMensagem(""), 3000);

    if (!tarefaParaEditar) {
      setTitulo("");
      setDescricao("");
      setData(null);
      setPrioridade("Média");
    }

    navigation.navigate("MinhasTarefas");
  };

  const handleCancel = () => {
    setTarefaParaEditar(null); 
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

      <Text style={styles.label}>Descrição*</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Data *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{data ? format(data, "dd/MM/yyyy") : "Selecione a data"}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "calendar"}
          onChange={handleDateChange}
          minimumDate={new Date()} // não permite datas passadas
        />
      )}

      <Text style={styles.label}>Prioridade*</Text>
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
          {tarefaParaEditar ? "Salvar Alterações" : "Adicionar Tarefa"}
        </Text>
      </TouchableOpacity>

      {tarefaParaEditar && (
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancelar Edição</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#f4f4f4" 
  },
  label: {
    fontWeight: "bold", 
    marginTop: 25, 
  },
  input: { 
    borderWidth: 1.5, 
    borderColor: "#779ECB", 
    borderRadius: 14, 
    padding: 12, 
    marginTop: 10 
  },
  button: { 
    backgroundColor: "#779ECB", 
    padding: 12, 
    borderRadius: 14, 
    marginTop: 20, 
    alignItems: "center", 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  mensagem: { 
    color: "#CF0E0E", 
    marginTop: 10, 
    textAlign: "center", 
    fontSize: 15 }
});
