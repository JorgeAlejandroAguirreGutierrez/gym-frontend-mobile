import { TipoMusculo } from "./tipo-musculo";

export class Ejercicio {
    id: number;
    nombre: string;
    nombrePersonalizado: string;
    detalle: string;
    imagen: string="";
    tipoMusculo: TipoMusculo;

    constructor(){
        this.id=0;
        this.nombre="";
        this.nombrePersonalizado="";
        this.detalle="";
        this.imagen="";
        this.tipoMusculo=new TipoMusculo();
    }
}