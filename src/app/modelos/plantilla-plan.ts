import { Plan } from "./plan";

export class PlantillaPlan {
    id: number;
    nombre: string;
    somatotipo:string;
    plan: Plan;

    constructor(){
        this.id=0;
        this.nombre="";
        this.somatotipo="";
        this.plan=new Plan();
        
    }
}