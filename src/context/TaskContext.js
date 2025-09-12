import { createContext, useState } from 'react';
import TarefaList from '../models/tarefaList';

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [tarefasList] = useState(new TarefaList());
    const [setAtualizar] = useState(0);

    const atualizar = () => {
        setAtualizar(setAtualizar + 1);
    }

    const addTarefa = (titulo, descricao, data, prioridade) => {
        tarefasList.addTarefa(titulo, descricao, data, prioridade);
        atualizar();
    }

    const removeTarefa = (id) => {
        tarefasList.removeTarefa(id);
        atualizar();
    }

    const editTarefa = (id, dados) => {
        tarefasList.updateTarefa(id, dados.titulo, dados.descricao, dados.data, dados.prioridade);
        atualizar();
    }

    const toggleStatus = (id) => {
        tarefasList.toggleStatus(id);
        atualizar();
    }

    return (
        <TaskContext.Provider value={{addTarefa, removeTarefa, editTarefa, toggleStatus, tarefasList}}>
            {children}
        </TaskContext.Provider>
    )

}