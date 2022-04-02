import { Component, OnInit } from '@angular/core';
import { Parametro } from '../modelos/parametro';
import { environment } from '../../environments/environment';
import { SesionService } from '../servicios/sesion.service';
import * as constantes from '../constantes';
import * as util from '../util';
import { Sesion } from '../modelos/sesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {

  app=environment.app;

  prefijoUrlImagenes = environment.prefijoUrlImagenes;
  fondoInicioSesion: Parametro[]=[new Parametro()];
  logo=constantes.logo1;
  sesion: Sesion=null as any;
  
  constructor(private router: Router, private sesionService: SesionService) { }

  ngOnInit(): void {
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

  navegarVerPlanEntrenamiento(){
    this.router.navigateByUrl('/leer-plan');
  }
  navegarVerMedidas(){
    this.router.navigateByUrl('/leer-medida');
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
