import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { PlantillaPlan } from '../modelos/plantilla-plan';

@Injectable({
  providedIn: 'root'
})
export class PlantillaPlanService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(plantillaPlan: PlantillaPlan): Observable<PlantillaPlan> {
    return this.http.post(environment.host + util.ruta + util.plantillaplan, plantillaPlan, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

  consultar(): Observable<PlantillaPlan[]> {
    return this.http.get<PlantillaPlan[]>(environment.host + util.ruta + util.plantillaplan, util.options).pipe(
      map(response => response as PlantillaPlan[])
    );
  }

  buscar(nombre: string, somatotipo:string): Observable<PlantillaPlan[]> {
    let params = new HttpParams().set("nombre", nombre)
    .set("somatotipo", somatotipo);
    return this.http.get(environment.host+util.ruta+util.plantillaplan+util.buscar, {params: params, headers: util.options.headers}).pipe(
      map(response => response as PlantillaPlan[])
    );
  }

  obtener(plantillaPlanId: number): Observable<PlantillaPlan> {
    return this.http.get<PlantillaPlan>(environment.host + util.ruta + util.plantillaplan + '/' + plantillaPlanId, util.options).pipe(
      map(response => response as PlantillaPlan)
      );
  }

  actualizar(plantillaPlan: PlantillaPlan): Observable<PlantillaPlan> {
    return this.http.put(environment.host+util.ruta+util.plantillaplan, plantillaPlan, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

  eliminar(plantillaPlanId: number): Observable<PlantillaPlan> {
    return this.http.delete(environment.host+util.ruta+util.plantillaplan + '/' + plantillaPlanId, util.options).pipe(
      map(response => response as PlantillaPlan)
    );
  }

}