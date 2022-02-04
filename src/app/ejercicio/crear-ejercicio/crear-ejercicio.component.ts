import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { Parametro } from 'src/app/modelos/parametro';
import { Sesion } from 'src/app/modelos/sesion';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import * as util from '../../util';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-crear-ejercicio',
  templateUrl: './crear-ejercicio.component.html',
  styleUrls: ['./crear-ejercicio.component.css']
})
export class CrearEjercicioComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;
  
  ejercicio: Ejercicio = new Ejercicio();
  imagen: any = null;
  musculos: Parametro[] = [];
  sesion: Sesion=null as any;


  constructor(private ejercicioService: EjercicioService, private parametroService: ParametroService,
    private sesionService: SesionService, private router: Router) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarMusculos();
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

  nuevo(event: any) {
    if (event != null)
      event.preventDefault();
    this.ejercicio = new Ejercicio();
  }

  consultarMusculos() {
    this.parametroService.consultarPorTipo(constantes.parametroMusculo).subscribe(
      res => {
        this.musculos = res
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_musculos, constantes.error_swal)
      }
    );
  }

  crear() {
    this.ejercicioService.crear(this.ejercicio).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_crear_ejercicio, constantes.exito_swal);
        if (this.imagen != null)
          this.crearImagen(res.id);
        this.nuevo(null);
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_crear_ejercicio, constantes.error_swal);
        }
      }
    );
  }

  cargarImagen(event: any) {
    let imagenes: FileList = event.target.files;
    this.imagen = imagenes.item(0);
  }

  crearImagen(id: number) {
    this.ejercicioService.crearImagen(this.imagen, id).subscribe(
      res => {

      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
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
