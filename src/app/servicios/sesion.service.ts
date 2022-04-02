import { Injectable } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(sesion: Sesion): Observable<Sesion> {
    return this.http.post(environment.empresas.get(sesion.empresa)! + util.ruta + util.sesion, sesion, util.options).pipe(
      map(response => response as Sesion)
    );
  }

  validar(sesion: Sesion): Observable<Sesion> {
    return this.http.post<Sesion>(environment.empresas.get(sesion.empresa)! + util.ruta + util.sesion+util.validar, sesion, util.options).pipe(
      map(response => response as Sesion)
      );
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