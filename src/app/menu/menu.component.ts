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
  logo: Parametro[]=[new Parametro()];
  sesion: Sesion=null as any;
  
  constructor(private router: Router, private parametroService: ParametroService, private sesionService: SesionService) { }

  ngOnInit(): void {
    util.loadScripts();
    this.consultarLogo();
    //this.validarSesion();
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

  consultarLogo(){
    this.parametroService.consultarPorTipo(constantes.parametroLogo1).subscribe(
      res => {
        this.logo=res;
        console.log(this.logo);
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_inicio, constantes.error_swal)
      }
    );
  }

  navegarIndex() {
    this.router.navigateByUrl('/index');
  }

  cerrarSesion(event: any) {
    if (event != null)
      event.preventDefault();
    this.sesionService.cerrarSesion();
    this.navegarIndex();
  }

}