import { Component, OnInit } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { SesionService } from '../servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Parametro } from '../modelos/parametro';
import { ParametroService } from '../servicios/parametro.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  app=environment.app;

  prefijoUrlImagenes = environment.prefijo_url_imagenes;
  fondoInicioSesion: Parametro[]=[new Parametro()];
  logo: Parametro[]=[new Parametro()];

  sesion: Sesion=new Sesion();

  constructor(private router: Router, private parametroService: ParametroService, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.consultarFondoInicioSesion();
    this.consultarLogo();
  }

  consultarFondoInicioSesion(){
    this.parametroService.consultarPorTipo(constantes.parametroFondoInicioSesion).subscribe(
      res => {
        this.fondoInicioSesion=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_inicio, constantes.error_swal)
      }
    );
  }
  consultarLogo(){
    this.parametroService.consultarPorTipo(constantes.parametroLogo2).subscribe(
      res => {
        this.logo=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_inicio, constantes.error_swal)
      }
    );
  }

  iniciarSesion() {
    this.sesionService.crear(this.sesion).subscribe(
      res => {
        this.sesion=res;
        this.sesionService.setSesion(this.sesion);
        Swal.fire(constantes.exito, constantes.exito_iniciar_sesion, constantes.exito_swal);
        if(this.sesion.usuario.perfil.descripcion==constantes.perfil_admin){
          this.navegarAdmin();
        }
        if(this.sesion.usuario.perfil.descripcion==constantes.perfil_cliente){
          this.navegarCliente();
        }
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_modelo_no_existente){
          Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_suscripcion_invalida){
          Swal.fire(constantes.error, constantes.error_suscripcion_invalida, constantes.error_swal);
        }
      }
    );
  }

  navegarAdmin() {
    this.router.navigate(['/leer-cliente']);
  }

  navegarCliente() {
    this.router.navigate(['/leer-plan']);
  }

  navegarFallido() {
    this.router.navigate(['/iniciar-sesion']);
  }

}
