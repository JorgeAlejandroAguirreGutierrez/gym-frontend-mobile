import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.host + util.ruta + util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  consultar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.host + util.ruta + util.usuario, util.options).pipe(
      map(response => response as Usuario[])
    );
  }

  obtener(cliente_id: number): Observable<Usuario> {
    return this.http.get<Usuario>(environment.host + util.ruta + util.usuario + '/' + cliente_id, util.options).pipe(
      map(response => response as Usuario)
      );
  }

  actualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put(environment.host+util.ruta+util.usuario, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  eliminar(usuario_id: number): Observable<Usuario> {
    return this.http.delete(environment.host+util.ruta+util.usuario + '/' + usuario_id, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  consultarClientesPorNombreIdentificacion(nombre: string, identificacion: string): Observable<Usuario[]> {
    let params = new HttpParams().set("nombre", nombre)
                                 .set("identificacion", identificacion);
    return this.http.get(environment.host+util.ruta+util.usuario+util.consultarClientesPorNombreIdentificacion, {params: params, headers: util.options.headers}).pipe(
      map(response => response as Usuario[])
    );
  }

  consultarClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.host + util.ruta + util.usuario +util.consultarClientes, util.options).pipe(
      map(response => response as Usuario[])
    );
  }

  consultarAdmins(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.host + util.ruta + util.usuario +util.consultarAdmins, util.options).pipe(
      map(response => response as Usuario[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  obtenerPorIdentificacion(identificacion: string): Observable<Usuario> {
    return this.http.get<Usuario>(environment.host + util.ruta + util.usuario+util.obtenerPorIdentificacion + '/' + identificacion, util.options).pipe(
      map(response => response as Usuario)
      );
  }

  crearCliente(usuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.host + util.ruta + util.usuario + util.crearCliente, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

  crearAdmin(usuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.host + util.ruta + util.usuario + util.crearAdmin, usuario, util.options).pipe(
      map(response => response as Usuario)
    );
  }

}