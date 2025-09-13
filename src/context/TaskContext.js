import React, { createContext, useState } from "react";
import TarefaClass from "../models/tarefa";

//Cria o contexto global para tarefas
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tarefas, setTarefas] = useState([]); // // Lista de tarefas
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null); //Tarefa selecionada para edição

  // Adiciona uma nova tarefa
  const addTarefa = (titulo, descricao, data, prioridade) => {
    const nova = new TarefaClass(titulo, descricao, data, prioridade);
    setTarefas([...tarefas, nova]);
  };

    // Edita uma tarefa existente
  const editTarefa = (id, titulo, descricao, data, prioridade) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, titulo, descricao, data, prioridade } : t
      )
    );
  };

  // Remove uma tarefa
  const removeTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

   // Alterna o status entre "pendente" e "concluída"
  const toggleConcluida = (id) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "concluída" ? "pendente" : "concluída" }
          : t
      )
    );
  };

  // Disponibiliza estados e funções para os componentes filhos
  return (
    <TaskContext.Provider
      value={{
        tarefas,
        addTarefa,
        editTarefa,
        removeTarefa,
        toggleConcluida,
        tarefaParaEditar,
        setTarefaParaEditar,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
