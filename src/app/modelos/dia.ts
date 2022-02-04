import { Rutina } from "./rutina";

export class Dia {
    id: number;
    numero: number;
    nombre: string;
    rutinas: Rutina[];
    show: string;

    constructor(){
        this.id=0;
        this.numero=0;
        this.nombre="";
        this.rutinas=[];
        this.show="show";
    }
}