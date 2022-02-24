import { Component, OnInit } from '@angular/core';
import { Parametro } from '../modelos/parametro';
import { environment } from '../../environments/environment';
import { ParametroService } from '../servicios/parametro.service';
import { SesionService } from '../servicios/sesion.service';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import * as util from '../util';
import { Sesion } from '../modelos/sesion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  app=environment.app;

  prefijoUrlImagenes = environment.prefijo_url_imagenes;
  fondoInicioSesion: Parametro[]=[new Parametro()];
  logo=constantes.logo1;
  sesion: Sesion=null as any;
  
  constructor(private router: Router, private sesionService: SesionService) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
  }

  validarSesion() {
    this.sesion=this.sesionService.getSesion();
    this.sesionService.validar(this.sesion).subscribe(
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

  navegarIndex() {
    this.router.navigateByUrl('/inicio');
  }

  navegarCrearCliente(){
    this.router.navigateByUrl('/crear-cliente');
  }
  navegarVerClientes(){
    this.router.navigateByUrl('/leer-cliente');
  }

  navegarCrearEjercicio(){
    this.router.navigateByUrl('/crear-ejercicio');
  }

  navegarVerEjercicios(){
    this.router.navigateByUrl('/leer-ejercicio');
  }

  navegarCrearPlantilla(){
    this.router.navigateByUrl('/crear-plantilla-plan');
  }

  navegarVerPlantillas(){
    this.router.navigateByUrl('/leer-plantilla-plan');
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

  menu(){
    if(this.sesion.usuario.perfil.descripcion==constantes.perfil_admin){
      this.router.navigateByUrl('/menu');
    }
    if(this.sesion.usuario.perfil.descripcion==constantes.perfil_cliente){
      this.router.navigateByUrl('/menu-cliente');
    }
  }

}
