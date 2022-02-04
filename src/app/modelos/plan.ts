import { Dia } from "./dia";
import { Rutina } from "./rutina";

export class Plan {
    id: number;
    dias: Dia[];

    constructor(){
        this.id=0;
        this.dias=[];
    }
}