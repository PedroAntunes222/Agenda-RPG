import Atributo from "./atributo";

class Tarefa{
    constructor(id, xp, titulo, descricao, repeticao, data, hora, status, atributo, item, magia){
        this.id = id;
        this.xp = xp;
        this.titulo = titulo;
        this.descricao = descricao;
        this.repeticao = repeticao;
        this.data = data;
        this.hora = hora;
        this.status = status;
        this.atributo = atributo;
        this.item = item;
        this.magia = magia;
    }
}
export default Tarefa;