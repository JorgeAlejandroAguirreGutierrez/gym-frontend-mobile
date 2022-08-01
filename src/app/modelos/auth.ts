import { Empresa } from "./empresa";

export class Auth {
    id: number;
    identificacion: string;
    contrasena: string; 
    empresa: Empresa;
    //terminoCondicion: boolean;
    activo: boolean;

    constructor(){
        this.id=0;
        this.identificacion="";
        this.contrasena="";
        this.empresa=new Empresa();
        //this.terminoCondicion=false;
        this.activo=true;
    }
}