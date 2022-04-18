export class Empresa {
    id: number;
    nombre: string;
    endpoint: string; 
    activo: boolean;

    constructor(){
        this.id=0;
        this.nombre="";
        this.endpoint="";
        this.activo=true;
    }
}