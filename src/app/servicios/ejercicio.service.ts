import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Ejercicio } from '../modelos/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post(environment.host + util.ruta + util.ejercicio, ejercicio, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(environment.host + util.ruta + util.ejercicio, util.options).pipe(
      map(response => response as Ejercicio[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorTipoMusculo(tipoMusculoId: string): Observable<Ejercicio[]> {
    let params = new HttpParams().set("tipoMusculoId", tipoMusculoId);
    return this.http.get(environment.host+util.ruta+util.ejercicio+util.consultarPorTipoMusculo, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Ejercicio[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Ejercicio[]> {
    return await this.http.get<Ejercicio[]>(environment.host + util.ruta + util.ejercicio, util.options).pipe(
      map(response => response as Ejercicio[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(ejercicio_id: number): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(environment.host + util.ruta + util.ejercicio + '/' + ejercicio_id, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(ejercicio_id: number): Promise<Ejercicio> {
    return await this.http.get<Ejercicio>(environment.host + util.ruta + util.ejercicio + '/' + ejercicio_id, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.put(environment.host+util.ruta+util.ejercicio, ejercicio, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(ejercicio_id: number): Observable<Ejercicio> {
    return this.http.delete(environment.host+util.ruta+util.ejercicio + '/' + ejercicio_id, util.options).pipe(
      map(response => response as Ejercicio),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(ejercicio: Ejercicio): Observable<Ejercicio[]> {
    return this.http.put(environment.host+util.ruta+util.ejercicio+util.buscar, ejercicio, util.options).pipe(
      map(response => response as Ejercicio[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorDescripcion(descripcion: string): Observable<Ejercicio[]> {
    let params = new HttpParams().set("descripcion", descripcion);
    return this.http.get(environment.host+util.ruta+util.ejercicio+util.consultarPorDescripcion, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Ejercicio[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  crearImagen(imagen: File, id: number): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(environment.host + util.ruta + util.ejercicio + '/imagen' + '/' + id, formData, util.optionsImagen).pipe(
      map(response => response as any),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}