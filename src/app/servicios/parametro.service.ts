import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Parametro } from '../modelos/parametro';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(parametro: Parametro): Observable<Parametro> {
    return this.http.post(environment.host + util.ruta + util.parametro, parametro, util.options).pipe(
      map(response => response as Parametro),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Parametro[]> {
    return this.http.get<Parametro[]>(environment.host + util.ruta + util.parametro, util.options).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<Parametro[]> {
    return await this.http.get<Parametro[]>(environment.host + util.ruta + util.parametro, util.options).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Parametro> {
    return this.http.get<Parametro>(environment.host + util.ruta + util.parametro + '/' + id, util.options).pipe(
      map(response => response as Parametro),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Parametro> {
    return await this.http.get<Parametro>(environment.host + util.ruta + util.parametro + '/' + id, util.options).pipe(
      map(response => response as Parametro),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(parametro: Parametro): Observable<Parametro> {
    return this.http.put(environment.host + util.ruta + util.parametro, parametro, util.options).pipe(
      map(response => response as Parametro),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Parametro> {
    return this.http.delete(environment.host + util.ruta + util.parametro + '/' + id, util.options).pipe(
      map(response => response as Parametro),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(parametro: Parametro): Observable<Parametro[]> {
    return this.http.put(environment.host+util.ruta+util.parametro+util.buscar, parametro, util.options).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorTipo(tipo: string): Observable<Parametro[]> {
    let params = new HttpParams().set("tipo", tipo);
    return this.http.get<Parametro[]>(environment.host + util.ruta + util.parametro+util.consultarPorTipo, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultarPorTipoAsync(tipo: string): Promise<Parametro[]> {
    return this.consultarPorTipo(tipo).toPromise();
  }

  consultarPorTituloTipo(titulo: string, tipo: string): Observable<Parametro[]> {
    let params = new HttpParams().set("titulo", titulo).set("tipo", tipo);
    return this.http.get<Parametro[]>(environment.host + util.ruta + util.parametro+util.consultarPorTituloTipo, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  /*obtenerImagen(nombre: string): Observable<Parametro[]> {
    let params = new HttpParams().set("nombre", nombre);
    return this.http.request<Parametro[]>(environment.host + util.ruta + util.parametro+util.consultarPorTituloTipo, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Parametro[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }*/
}