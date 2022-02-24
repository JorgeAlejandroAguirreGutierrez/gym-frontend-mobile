import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { PlantillaPlan } from '../modelos/plantilla-plan';
import { Sesion } from '../modelos/sesion';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PlantillaPlanService {

  constructor(private http: HttpClient, private router: Router, private sesionService: SesionService) { }

  sesion: Sesion= this.sesionService.getSesion();

  crear(plantillaPlan: PlantillaPlan): Observable<PlantillaPlan> {
    return this.http.post(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan, plantillaPlan, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

  consultar(): Observable<PlantillaPlan[]> {
    return this.http.get<PlantillaPlan[]>(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan, util.options).pipe(
      map(response => response as PlantillaPlan[])
    );
  }

  buscar(nombre: string, somatotipo:string): Observable<PlantillaPlan[]> {
    let params = new HttpParams().set("nombre", nombre)
    .set("somatotipo", somatotipo);
    return this.http.get(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan + util.buscar, {params: params, headers: util.options.headers}).pipe(
      map(response => response as PlantillaPlan[])
    );
  }

  obtener(plantillaPlanId: number): Observable<PlantillaPlan> {
    return this.http.get<PlantillaPlan>(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan + '/' + plantillaPlanId, util.options).pipe(
      map(response => response as PlantillaPlan)
      );
  }

  actualizar(plantillaPlan: PlantillaPlan): Observable<PlantillaPlan> {
    return this.http.put(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan, plantillaPlan, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

  eliminar(plantillaPlanId: number): Observable<PlantillaPlan> {
    return this.http.delete(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.plantillaplan + '/' + plantillaPlanId, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

}