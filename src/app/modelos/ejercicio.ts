import { TipoMusculo } from "./tipo-musculo";

export class Ejercicio {
    id: number;
    descripcion: string;
    detalle: string;
    imagen: string="";
    tipoMusculo: TipoMusculo;

    constructor(){
        this.id=0;
        this.descripcion="";
        this.detalle="";
        this.imagen="";
        this.tipoMusculo=new TipoMusculo();
    }
}