import { Objetivo } from "./objetivo";
import { Observacion } from "./observacion";
import { Perfil } from "./perfil";
import { Peso } from "./peso";
import { Plan } from "./plan";
import { Suscripcion } from "./suscripcion";

export class Usuario {
    id: number;
    nombre: string;
    identificacion: string;
    contrasena: string; 
    estatura: number;
    edad: number;
    activo: boolean;
    imagen: string;
    perfil: Perfil;
    pesos: Peso[];
    suscripciones: Suscripcion[];
    objetivos: Objetivo[];
    observaciones: Observacion[];
    plan: Plan;

    constructor(){
        this.id=0;
        this.nombre="";
        this.identificacion="";
        this.contrasena="";
        this.estatura=null as any;
        this.edad=null as any;
        this.activo=true;
        this.imagen="";
        this.perfil=new Perfil();
        this.pesos=[];
        this.suscripciones=[];
        this.objetivos=[];
        this.observaciones=[];
        this.plan=new Plan();
    }
}