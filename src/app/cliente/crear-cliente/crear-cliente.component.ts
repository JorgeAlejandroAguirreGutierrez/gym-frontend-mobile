import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { Objetivo } from 'src/app/modelos/objetivo';
import { Observacion } from 'src/app/modelos/observacion';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import * as util from '../../util';
import { Peso } from 'src/app/modelos/peso';
import { Sesion } from 'src/app/modelos/sesion';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;
  
  usuario: Usuario = new Usuario();
  observacion: string = ""
  objetivo: string = "";
  peso: number = null as any;
  sesion: Sesion=null as any;

  constructor(private usuarioService: UsuarioService, 
    private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
  }

  validarSesion() {
    this.sesion=this.sesionService.getSesion();
    this.sesionService.validar(this.sesion.id).subscribe(
      res => {
        this.sesion=res;
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_sesion_invalida){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
        if(err.error.codigo==constantes.error_codigo_modelo_no_existente){
          this.sesionService.cerrarSesion();
          this.navegarIndex();
        }
      }
    );
  }

  crearPeso() {
    let peso: Peso = new Peso();
    peso.valor = this.peso;
    this.usuario.pesos.push(peso);
    this.peso = 0;
  }

  crearObservacion() {
    let observacion: Observacion = new Observacion();
    observacion.descripcion = this.observacion;
    this.usuario.observaciones.push(observacion);
    this.observacion = "";
  }

  crearObjetivo() {
    let objetivo: Objetivo = new Objetivo();
    objetivo.descripcion = this.objetivo;
    this.usuario.objetivos.push(objetivo);
    this.objetivo = "";
  }

  nuevo(event: any) {
    if (event != null)
      event.preventDefault();
  }

  crear() {
    this.usuario.plan=null as any;
    this.usuarioService.crearCliente(this.usuario).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_crear_usuario, constantes.exito_swal);
        this.navegarLeerCliente();
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_crear_usuario, constantes.error_swal);
        }
      }
    );
  }

  eliminarPeso(i: number) {
    this.usuario.pesos.splice(i, 1);
  }

  eliminarObservacion(i: number) {
    this.usuario.observaciones.splice(i, 1);
  }

  eliminarObjetivo(i: number) {
    this.usuario.objetivos.splice(i, 1);
  }

  navegarCrearCliente() {
    this.router.navigate(['/crear-cliente']);
  }

  navegarLeerCliente() {
    this.router.navigate(['/leer-cliente']);
  }

  navegarIndex() {
    this.router.navigate(['/index']);
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }
}
