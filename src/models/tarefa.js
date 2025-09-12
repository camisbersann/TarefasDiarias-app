// Importa a função 'format' da biblioteca 'date-fns' para formatar datas
import { format } from 'date-fns';

// Declaração de uma classe chamada 'TarefaClass'
export default class TarefaClass {

     // Método construtor
    constructor(titulo, descricao, data, prioridade) {
        this.id = this.geraId()
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.prioridade = prioridade;
        this.status = "pendente";
    }

    // Método para gerar um ID aleatório
    geraId(){
        return Math.floor(Math.random()*1000);
    };

     // Método para retornar a data formatada da tarefa
    getData(){
        if(!this.data){
            return "Data não informada";
        }

        const data = new Date(this.data);

        if(isNaN(data.getTime())){
            return 'Data inválida';
        }
        return format(new Date(this.data), "dd/MM/yyyy");
    }

     // Método para marcar a tarefa como concluída
    concluirTafera(){
        this.status = "concluida";
    }

     // Método para reabrir a tarefa (voltar ao status pendente)
    reabrirTarefa(){
        this.status = "pendente";
    }
}