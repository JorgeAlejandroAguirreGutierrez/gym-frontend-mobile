import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { TipoMusculo } from '../modelos/tipo-musculo';

@Injectable({
  providedIn: 'root'
})
export class TipoMusculoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(tipoMusculo: TipoMusculo): Observable<TipoMusculo> {
    return this.http.post(environment.host + util.ruta + util.tipomusculo, tipoMusculo, util.options).pipe(
      map(response => response as TipoMusculo),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<TipoMusculo[]> {
    return this.http.get<TipoMusculo[]>(environment.host + util.ruta + util.tipomusculo, util.options).pipe(
      map(response => response as TipoMusculo[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<TipoMusculo[]> {
    return await this.http.get<TipoMusculo[]>(environment.host + util.ruta + util.tipomusculo, util.options).pipe(
      map(response => response as TipoMusculo[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<TipoMusculo> {
    return this.http.get<TipoMusculo>(environment.host + util.ruta + util.tipomusculo + '/' + id, util.options).pipe(
      map(response => response as TipoMusculo),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<TipoMusculo> {
    return await this.http.get<TipoMusculo>(environment.host + util.ruta + util.tipomusculo + '/' + id, util.options).pipe(
      map(response => response as TipoMusculo),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(tipoMusculo: TipoMusculo): Observable<TipoMusculo> {
    return this.http.put(environment.host + util.ruta + util.tipomusculo, tipoMusculo, util.options).pipe(
      map(response => response as TipoMusculo),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<TipoMusculo> {
    return this.http.delete(environment.host + util.ruta + util.tipomusculo + '/' + id, util.options).pipe(
      map(response => response as TipoMusculo),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  buscar(tipoMusculo: TipoMusculo): Observable<TipoMusculo[]> {
    return this.http.put(environment.host+util.ruta+util.tipomusculo+util.buscar, tipoMusculo, util.options).pipe(
      map(response => response as TipoMusculo[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}