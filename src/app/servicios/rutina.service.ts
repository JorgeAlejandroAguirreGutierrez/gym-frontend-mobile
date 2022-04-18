import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { Rutina } from '../modelos/rutina';
import { SesionService } from './sesion.service';
import { Sesion } from '../modelos/sesion';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(private http: HttpClient, private sesionService: SesionService) { }

  sesion: Sesion= this.sesionService.getSesion();

  crear(rutinaEntrenamiento: Rutina): Observable<Rutina> {
    return this.http.post(this.sesion.endpoint + util.ruta + util.rutina, rutinaEntrenamiento, util.options).pipe(
      map(response => response as Rutina)
    );
  }

  consultar(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.sesion.endpoint + util.ruta + util.rutina, util.options).pipe(
      map(response => response as Rutina[])
    );
  }

  obtener(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(this.sesion.endpoint + util.ruta + util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina)
      );
  }

  actualizar(rutina: Rutina): Observable<Rutina> {
    return this.http.put(this.sesion.endpoint + util.ruta+util.rutina, rutina, util.options).pipe(
      map(response => response as Rutina)
    );
  }

  eliminar(id: number): Observable<Rutina> {
    return this.http.delete(this.sesion.endpoint + util.ruta+util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina)
    );
  }
}