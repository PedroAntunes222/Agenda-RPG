import Atributo from "./atributo";

class Tarefa{
    constructor(id, xp, titulo, descricao, data, hora, status, atributos){
        this.id = id;
        this.xp = xp;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.hora = hora;
        this.status = status;
        this.atributos = atributos.map(item=>new Atributo(item.id, item.nome, item.nivel, item.xp));
    }
}
export default Tarefa;