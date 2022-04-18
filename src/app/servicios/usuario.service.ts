import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { Sesion } from '../modelos/sesion';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private sesionService: SesionService) { }

  sesion: Sesion= this.sesionService.getSesion();

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.sesion.endpoint + util.ruta + util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  consultar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.sesion.endpoint + util.ruta + util.usuario, util.options).pipe(
      map(response => response as Usuario[])
    );
  }

  obtener(cliente_id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.sesion.endpoint + util.ruta + util.usuario + '/' + cliente_id, util.options).pipe(
      map(response => response as Usuario)
      );
  }

  actualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put(this.sesion.endpoint + util.ruta + util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  eliminar(usuario_id: number): Observable<Usuario> {
    return this.http.delete(this.sesion.endpoint + util.ruta + util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  consultarClientesPorNombreIdentificacion(usuario: string): Observable<Usuario[]> {
    let params = new HttpParams().set("usuario", usuario);
    return this.http.get(this.sesion.endpoint + util.ruta + util.usuario + util.consultarClientesPorNombreIdentificacion, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Usuario[])
    );
  }

  consultarClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.sesion.endpoint + util.ruta + util.usuario +util.consultarClientes, util.options).pipe(
      map(response => response as Usuario[])
    );
  }

  consultarAdmins(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.sesion.endpoint + util.ruta + util.usuario +util.consultarAdmins, util.options).pipe(
      map(response => response as Usuario[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerPorIdentificacion(identificacion: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.sesion.endpoint + util.ruta + util.usuario+util.obtenerPorIdentificacion + '/' + identificacion, util.options).pipe(
      map(response => response as Usuario)
      );
  }

  crearCliente(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.sesion.endpoint + util.ruta + util.usuario + util.crearCliente, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  crearAdmin(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.sesion.endpoint + util.ruta + util.usuario + util.crearAdmin, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

}