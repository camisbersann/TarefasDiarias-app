import React, { useContext, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';

export default function MinhasTarefas({ navigation }) {
  const { tarefas, removeTarefa, toggleConcluida, setTarefaParaEditar } = useContext(TaskContext);

  const [filtroPrioridade, setFiltroPrioridade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const tarefasConcluidas = tarefas.filter(t => t.status === 'concluída').length;

  const tarefasFiltradas = useMemo (() => {
    return tarefas.filter(t => {
      const filtraPrioridade = filtroPrioridade ?  t.prioridade == filtroPrioridade: true;
      const filtraStatus = filtroStatus ? t.status == filtroStatus : true;
      return filtraPrioridade && filtraStatus;
    });
  }, [tarefas, filtroPrioridade, filtroStatus]);

  const renderItem = ({ item }) => {
    const isConcluida = item.status === 'concluída';

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.info}>Data: {format(new Date(item.data), 'dd/MM/yyyy')}</Text>
          <Text style={styles.info}>Prioridade: {item.prioridade}</Text>
        </View>

        <View style={styles.actions}>
          {/* Concluir */}
          <TouchableOpacity onPress={() => toggleConcluida(item.id)}>
           <FontAwesome name="check-circle" size={30} color={isConcluida ? 'green' : 'gray'} />
          </TouchableOpacity>

          {/* Editar */}
          <TouchableOpacity
            onPress={() => {
              setTarefaParaEditar(item); // coloca no estado para edição
              navigation.navigate('AddTarefa', { editar: true });
            }}
          >
            <FontAwesome name="edit" size={30} color="#3065AC" />
          </TouchableOpacity>

          {/* Excluir */}
          <TouchableOpacity onPress={() => removeTarefa(item.id)}>
           <FontAwesome name="trash" size={30} color="#CF0E0E" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Contador */}
      <Text style={styles.contador}>
        {tarefasConcluidas} / {tarefas.length} tarefas concluídas
      </Text>

      <View style={styles.filtrosContainer}>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filtroPrioridade}
          onValueChange={setFiltroPrioridade}
          style={styles.picker}
        >
          <Picker.Item label="Todas prioridades" value="" />
          <Picker.Item label="Baixa" value="Baixa" />
          <Picker.Item label="Média" value="Média" />
          <Picker.Item label="Alta" value="Alta" />
        </Picker>
        </View>

        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filtroStatus}
          onValueChange={setFiltroStatus}
          style={styles.picker}
        >
          <Picker.Item label="Todos status" value="" />
          <Picker.Item label="Concluída" value="concluída" />
          <Picker.Item label="Pendente" value="pendente" />
        </Picker>
        </View>
        </View>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa cadastrada</Text>}
      />

      {/* Botão adicionar nova tarefa */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTarefa')}
      >
        <Text style={styles.addButtonText}>Adicionar Nova Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f5f5f5' 
  },
  contador: { 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginTop: 10
  },
  cardContent: { 
    flex: 1, 
    marginRight: 8 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  descricao: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 4 
  },
  info: { 
    fontSize: 12, 
    color: '#888' 
  },
  actions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15 
  },
  empty: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#555' 
  },
  addButton: {
    backgroundColor: "#779ECB", 
    padding: 12, 
    borderRadius: 14, 
    marginTop: 20, 
    alignItems: "center", 
    marginBottom: 30
  },
  addButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  contador: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 15
  },
  picker: {
   height: 60,
   color: "#000"
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    overflow: 'hidden',
    height: 45, 
    justifyContent: 'center',
   
  },
});
