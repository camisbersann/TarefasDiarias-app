import { createContext, useState } from 'react'; // Importa createContext e useState do React
import TarefaList from '../models/tarefaList'; // Importa a classe TarefaList que gerencia a lista de tarefas

// Cria o contexto que será compartilhado entre componentes
export const TaskContext = createContext();

// Componente provedor do contexto (Provider)
export const TaskProvider = ({children}) => {
    const [tarefasList] = useState(new TarefaList()); // Cria o estado para a lista de tarefas, usando a classe TarefaList
    const [atualizarConatdor, setAtualizar] = useState(0);   // Cria um estado para forçar atualização do componente

    const atualizar = () => setAtualizar(prev => prev + 1);  // Função para atualizar o estado e forçar re-render

    // Função para adicionar uma tarefa
    const addTarefa = (titulo, descricao, data, prioridade) => {
        tarefasList.addTarefa(titulo, descricao, data, prioridade);
        atualizar();
    }

     // Função para remover uma tarefa pelo ID
    const removeTarefa = (id) => {
        tarefasList.removeTarefa(id);
        atualizar();
    }

     // Função para editar uma tarefa existente
    const editTarefa = (id, dados) => {
        tarefasList.updateTarefa(id, dados.titulo, dados.descricao, dados.data, dados.prioridade);
        atualizar();
    }

     // Função para alternar o status de uma tarefa
    const toggleStatus = (id) => {
        tarefasList.toggleStatus(id);
        atualizar();
    }

    // O Provider disponibiliza funções e a lista de tarefas para todos os componentes filhos
    return (
        <TaskContext.Provider value={{addTarefa, removeTarefa, editTarefa, toggleStatus, tarefasList}}>
            {children}
        </TaskContext.Provider>
    )

}