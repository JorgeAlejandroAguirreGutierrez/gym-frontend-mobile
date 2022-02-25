import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { Ejercicio } from '../modelos/ejercicio';
import { SesionService } from './sesion.service';
import { Sesion } from '../modelos/sesion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  
  constructor(private http: HttpClient, private router: Router, private sesionService: SesionService) { }

  sesion: Sesion= this.sesionService.getSesion();

  crear(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.ejercicio, ejercicio, util.options).pipe(
      map(response => response as Ejercicio)
    );
  }

  consultar(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.ejercicio, util.options).pipe(
      map(response => response as Ejercicio[])
    );
  }

  consultarPorTipoMusculo(tipoMusculoId: string): Observable<Ejercicio[]> {
    let params = new HttpParams().set("tipoMusculoId", tipoMusculoId);
    return this.http.get(environment.empresas.get(this.sesion.empresa)! + util.ruta+util.ejercicio+util.consultarPorTipoMusculo, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Ejercicio[])
    );
  }

  obtener(ejercicio_id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.ejercicio + '/' + ejercicio_id, util.options).pipe(
      map(response => response as Ejercicio));
  }

  actualizar(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.put(environment.empresas.get(this.sesion.empresa)! + util.ruta+util.ejercicio, ejercicio, util.options).pipe(
      map(response => response as Ejercicio)
    );
  }

  eliminar(ejercicio_id: number): Observable<Ejercicio> {
    return this.http.delete(environment.empresas.get(this.sesion.empresa)! + util.ruta+util.ejercicio + '/' + ejercicio_id, util.options).pipe(
      map(response => response as Ejercicio)
    );
  }

  buscar(ejercicio: Ejercicio): Observable<Ejercicio[]> {
    return this.http.put(environment.empresas.get(this.sesion.empresa)! + util.ruta+util.ejercicio+util.buscar, ejercicio, util.options).pipe(
      map(response => response as Ejercicio[])
    );
  }

  consultarPorDescripcion(descripcion: string): Observable<Ejercicio[]> {
    let params = new HttpParams().set("descripcion", descripcion);
    return this.http.get(environment.empresas.get(this.sesion.empresa)! + util.ruta+util.ejercicio+util.consultarPorDescripcion, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Ejercicio[])
    );
  }

  crearImagen(imagen: File, id: number): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(environment.empresas.get(this.sesion.empresa)! + util.ruta + util.ejercicio + '/imagen' + '/' + id, formData, util.optionsImagen).pipe(
      map(response => response as any)
    );
  }
}