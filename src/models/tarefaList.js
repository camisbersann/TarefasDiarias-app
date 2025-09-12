// Declaração de uma classe chamada 'TarefaList'
export default class TarefaList{
    constructor(){
        this.tarefas = []; //Array que vai armazenar os objetos de tarefas
    }

     // Adiciona uma nova tarefa à lista
    addTarefa(tarefa){
        this.tarefas.push(tarefa);
    }

     // Retorna a tarefa pelo ID
    getTarefaById(id){
        return this.tarefas.find(tarefa => tarefa.id == id);
    }

     // Retorna a tarefa pelo status
    getTarefaByStatus(status){
        return this.tarefas.filter(tarefa => tarefa.status == status);
    }

     // Remove a tarefa pelo ID
    removeTarefa(id){
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id != id);
    }

     // Retorna todos os objetos de tarefas
    getAll(){
        return this.tarefas;
    }

   // Alterna o status da tarefa entre "pendente" e "concluída"
    toggleStatus(id){
        const tarefa = this.getTarefaById(id);
        if(tarefa){
            tarefa.status = tarefa.status == "pendente" ? "concluida" : "pendente";
        }
    }
    

    // Atualiza a tarefa com os novos dados
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