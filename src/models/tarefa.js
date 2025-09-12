import { format } from 'date-fns';

export default class TarefaClass {
    constructor(titulo, descricao, data, prioridade) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.prioridade = prioridade;
        this.status = "pendente";
    }

    geraId(){
        return Math.floor(Math.random()*1000);
    };

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

    concluirTafera(){
        this.status = "concluida";
    }

    reabrirTarefa(){
        this.status = "pendente";
    }
}