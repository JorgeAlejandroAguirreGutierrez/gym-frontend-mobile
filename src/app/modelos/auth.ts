export class Auth {
    id: number;
    identificacion: string;
    contrasena: string; 
    empresa: string;
    activo: boolean;

    constructor(){
        this.id=0;
        this.identificacion="";
        this.contrasena="";
        this.empresa="";
        this.activo=true;
    }
}