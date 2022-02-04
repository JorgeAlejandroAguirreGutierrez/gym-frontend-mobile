import { Injectable } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import * as constantes from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(sesion: Sesion): Observable<Sesion> {
    return this.http.post(environment.host + util.ruta + util.sesion, sesion, util.options).pipe(
      map(response => response as Sesion),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  validar(id: number): Observable<Sesion> {
    return this.http.get<Sesion>(environment.host + util.ruta + util.sesion+util.validar + '/' + id, util.options).pipe(
      map(response => response as Sesion),
      catchError(err => {
        return throwError(err);
      }));
  }

  setSesion(sesion: Sesion) {
    sessionStorage.setItem('sesion', JSON.stringify(sesion));

  }

  getSesion(): Sesion {
    return JSON.parse(sessionStorage.getItem('sesion') || null as any);
  }

  cerrarSesion(){
    sessionStorage.removeItem('sesion');
  }
}