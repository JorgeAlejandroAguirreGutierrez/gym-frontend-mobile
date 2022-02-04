import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Rutina } from '../modelos/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(rutinaEntrenamiento: Rutina): Observable<Rutina> {
    return this.http.post(environment.host + util.ruta + util.rutina, rutinaEntrenamiento, util.options).pipe(
      map(response => response as Rutina),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(environment.host + util.ruta + util.rutina, util.options).pipe(
      map(response => response as Rutina[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Rutina[]> {
    return await this.http.get<Rutina[]>(environment.host + util.ruta + util.rutina, util.options).pipe(
      map(response => response as Rutina[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(environment.host + util.ruta + util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina),
      catchError(err => {
        return throwError(err);
      }));
  }

  actualizar(rutina: Rutina): Observable<Rutina> {
    return this.http.put(environment.host+util.ruta+util.rutina, rutina, util.options).pipe(
      map(response => response as Rutina),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Rutina> {
    return this.http.delete(environment.host+util.ruta+util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}