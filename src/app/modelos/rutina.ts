import { Ejercicio } from "./ejercicio";

export class Rutina {
    id: number;
    repeticiones: number;
    series: number;
    valorPeso: number;
    medidaPeso: string;
    valorTiempo: number;
    medidaTiempo: string;
    ejercicio: Ejercicio;

    constructor(){
        this.id=0;
        this.repeticiones=null as any;
        this.series=null as any;
        this.valorPeso=null as any;
        this.medidaPeso="";
        this.valorTiempo=null as any;
        this.medidaTiempo="";
        this.ejercicio=new Ejercicio();
    }
}