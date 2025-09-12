import React, { createContext, useState } from "react";
import TarefaClass from "../models/tarefa";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tarefas, setTarefas] = useState([]); // array vazio
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);

  const addTarefa = (titulo, descricao, data, prioridade) => {
    const nova = new TarefaClass(titulo, descricao, data, prioridade);
    setTarefas([...tarefas, nova]);
  };

  const editTarefa = (id, titulo, descricao, data, prioridade) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, titulo, descricao, data, prioridade } : t
      )
    );
  };

  const removeTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  const toggleConcluida = (id) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "concluída" ? "pendente" : "concluída" }
          : t
      )
    );
  };

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
