import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { TipoMusculo } from 'src/app/modelos/tipo-musculo';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { TipoMusculoService } from 'src/app/servicios/tipo-musculo.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import { Sesion } from 'src/app/modelos/sesion';
import * as util from '../../util';

@Component({
  selector: 'app-leer-ejercicio',
  templateUrl: './leer-ejercicio.component.html',
  styleUrls: ['./leer-ejercicio.component.css']
})
export class LeerEjercicioComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;

  ejercicios: Ejercicio[]=[];
  descripcion: string="";
  ejercicioActualizar: Ejercicio=new Ejercicio();

  sesion: Sesion=null as any;

  ejercicioLeer: Ejercicio=null as any;

  tiposMusculo: TipoMusculo[]=[];

  cerrarModal: string="";

  prefijoUrlEjercicios= environment.prefijo_url_ejercicios;

  @ViewChild('modalEjercicioActualizar', { static: false }) private modalEjercicioActualizar: any;

  @ViewChild('modalLeerEjercicio', { static: false }) private modalLeerEjercicio: any;

  constructor(private ejercicioService: EjercicioService, private tipoMusculoService: TipoMusculoService,
    private sesionService: SesionService, private router: Router, private modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarEjercicios();
    this.consultarTiposMuculo();
  }

  consultarTiposMuculo(){
    this.tipoMusculoService.consultar().subscribe(
      res => {
        this.tiposMusculo = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_musculos, constantes.error_swal)
      }
    );
  }

  consultarEjercicios(){
    this.ejercicioService.consultar().subscribe(
      res => {
        this.ejercicios = res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  validarSesion(){
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

  editar(i: number){
    this.ejercicioActualizar={ ... this.ejercicios[i]};
    this.open(this.modalEjercicioActualizar);
  }

  actualizar(){
    this.ejercicioService.actualizar(this.ejercicioActualizar).subscribe(
      res => {
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_actualizar_ejercicio, constantes.exito_swal)
        this.consultarEjercicios();
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal);
        } 
      }
    );
  }

  eliminar(i:number){
    this.ejercicioService.eliminar(this.ejercicios[i].id).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_eliminar_ejercicio, constantes.exito_swal)
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_eliminar_ejercicio, constantes.error_swal);
        }
      }
    );
  }

  consultarPorDescripcion(){
    this.ejercicioService.consultarPorDescripcion(this.descripcion).subscribe(
      res => {
        this.ejercicios=res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  abrirModalLeerEjercicio(i:number){
    this.ejercicioLeer=this.ejercicios[i];
    this.open(this.modalLeerEjercicio);
  }

  compareFn(a:any, b:any) {
    return a && b && a.id == b.id;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.cerrarModal = `Closed with: ${result}`;
    }, (reason) => {
      this.cerrarModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  navegarExitoso() {
    this.router.navigate(['/leer-ejercicio']);
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
