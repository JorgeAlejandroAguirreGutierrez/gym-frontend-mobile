import { Component, OnInit } from '@angular/core';
import { Sesion } from '../modelos/sesion';
import { SesionService } from '../servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../servicios/auth.service';
import { Auth } from '../modelos/auth';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  app=environment.app;

  prefijoUrlImagenes = environment.prefijo_url_imagenes;
  fondoInicioSesion=constantes.fondoInicioSesion;
  logo=constantes.logo2;

  bandera=false;
  sesion: Sesion=new Sesion();

  constructor(private router: Router, private sesionService: SesionService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    this.bandera=true;
    this.authService.obtenerPorIdentificacionContrasena(this.sesion.usuario.identificacion,this.sesion.usuario.contrasena ).subscribe(
      res => {
        let auth: Auth=res;
        this.sesion.empresa=auth.empresa;
        this.sesionService.setSesion(this.sesion);
        this.sesionService.crear(this.sesion).subscribe(
          res => {
            this.bandera=false;
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
              this.sesionService.cerrarSesion();
              Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal);
            }
            if(err.error.codigo==constantes.error_codigo_suscripcion_invalida){
              this.sesionService.cerrarSesion();
              Swal.fire(constantes.error, constantes.error_suscripcion_invalida, constantes.error_swal);
            }
          }
        );
      },
      err => {
        console.log(err);
        if(err.error.codigo==constantes.error_codigo_modelo_no_existente){
          Swal.fire(constantes.error, constantes.error_iniciar_sesion, constantes.error_swal);
        }
      }
    );
  }

  navegarAdmin() {
    this.router.navigate(['/menu']);
  }

  navegarCliente() {
    this.router.navigate(['/menu-cliente']);
  }

  navegarFallido() {
    this.router.navigate(['/iniciar-sesion']);
  }

}
