export default class TarefaList{
    constructor(){
        this.tarefas = [];
    }

    addTarefa(tarefa){
        this.tarefas.push(tarefa);
    }

    getTarefaById(id){
        return this.tarefas.find(tarefa => tarefa.id == id);
    }

    getTarefaByStatus(status){
        return this.tarefas.filter(tarefa => tarefa.status == status);
    }

    removeTarefa(id){
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id != id);
    }

    getAll(){
        return this.tarefas;
    }

    toggleStatus(id){
        const tarefa = this.getTarefaById(id);
        if(tarefa){
            tarefa.status = tarefa.status == "pendente" ? "concluida" : "pendente";
        }
    }

    updateTarefa(id, titulo, descricao, data, prioridade){
        const tarefa = this.getTarefaById(id);

        if(tarefa){
            tarefa.titulo = titulo;
            tarefa.descricao = descricao;
            tarefa.data = data;
            tarefa.prioridade = prioridade;
        }
        return tarefa;
    }
}