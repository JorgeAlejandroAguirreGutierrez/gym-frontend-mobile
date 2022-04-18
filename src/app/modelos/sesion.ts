import { Usuario } from "./usuario";

export class Sesion {
    id: number;
    estado:boolean;
    fechaApertura: Date;
    fechaCierre: Date;
    usuario: Usuario;

    endpoint: string;

    constructor() { 
        this.id=0;
        this.estado=true;
        this.fechaApertura=new Date();
        this.fechaCierre=null as any;
        this.usuario=new Usuario();  
        this.endpoint="";
    }
}