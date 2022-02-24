import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Auth } from '../modelos/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerPorIdentificacionContrasena(identificacion: string, contrasena: string): Observable<Auth> {
    let params = new HttpParams().set("identificacion", identificacion)
                                 .set("contrasena", contrasena);
    return this.http.get<Auth>(environment.host + util.ruta + util.auth + util.obtenerPorIdentificacionContrasena, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Auth)
      );
  }
}