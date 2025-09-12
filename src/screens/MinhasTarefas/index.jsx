import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TaskContext } from '../../context/TaskContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MinhasTarefas({ navigation }) {
  const { tarefas, removeTarefa, toggleConcluida, setTarefaParaEditar } = useContext(TaskContext);

  const tarefasConcluidas = tarefas.filter(t => t.status === 'concluída').length;

  const renderItem = ({ item }) => {
    const isConcluida = item.status === 'concluída';

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.info}>Data: {item.data}</Text>
          <Text style={styles.info}>Prioridade: {item.prioridade}</Text>
        </View>

        <View style={styles.actions}>
          {/* Concluir */}
          <TouchableOpacity onPress={() => toggleConcluida(item.id)}>
            <Icon
              name="check-circle"
              size={24}
              color={isConcluida ? 'green' : 'gray'}
            />
          </TouchableOpacity>

          {/* Editar */}
          <TouchableOpacity
            onPress={() => {
              setTarefaParaEditar(item); // coloca no estado para edição
              navigation.navigate('AddTarefa', { editar: true });
            }}
          >
            <Icon name="edit" size={24} color="blue" />
          </TouchableOpacity>

          {/* Excluir */}
          <TouchableOpacity onPress={() => removeTarefa(item.id)}>
            <Icon name="delete" size={24} color="red" />
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

      <FlatList
        data={tarefas}
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
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  contador: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2
  },
  cardContent: { flex: 1, marginRight: 8 },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  descricao: { fontSize: 14, color: '#555', marginBottom: 4 },
  info: { fontSize: 12, color: '#888' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  empty: { textAlign: 'center', marginTop: 50, color: '#555' },
  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
