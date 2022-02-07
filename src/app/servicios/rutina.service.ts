import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
      map(response => response as Rutina)
    );
  }

  consultar(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(environment.host + util.ruta + util.rutina, util.options).pipe(
      map(response => response as Rutina[])
    );
  }

  obtener(id: number): Observable<Rutina> {
    return this.http.get<Rutina>(environment.host + util.ruta + util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina)
      );
  }

  actualizar(rutina: Rutina): Observable<Rutina> {
    return this.http.put(environment.host+util.ruta+util.rutina, rutina, util.options).pipe(
      map(response => response as Rutina)
    );
  }

  eliminar(id: number): Observable<Rutina> {
    return this.http.delete(environment.host+util.ruta+util.rutina + '/' + id, util.options).pipe(
      map(response => response as Rutina)
    );
  }
}