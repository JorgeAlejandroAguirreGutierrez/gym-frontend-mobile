import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import * as util from '../../util';
import { TipoMusculoService } from 'src/app/servicios/tipo-musculo.service';
import { PlantillaPlan } from 'src/app/modelos/plantilla-plan';
import { PlantillaPlanService } from 'src/app/servicios/plantilla-plan.service';
import { Sesion } from 'src/app/modelos/sesion';

@Component({
  selector: 'app-leer-plantilla-plan',
  templateUrl: './leer-plantilla-plan.component.html',
  styleUrls: ['./leer-plantilla-plan.component.css']
})
export class LeerPlantillaPlanComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;

  plantillasPlan: PlantillaPlan[]=[];
  nombre: string="";
  somatotipo: string="";

  sesion: Sesion=null as any;

  cerrarModal: string="";

  prefijoUrlEjercicios= environment.prefijo_url_ejercicios;

  constructor(private plantillaPlanService: PlantillaPlanService, private tipoMusculoService: TipoMusculoService,
    private sesionService: SesionService, private router: Router, private modalService: NgbModal) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
    this.consultarPlantillasPlan();
  }

  consultarPlantillasPlan(){
    this.plantillaPlanService.consultar().subscribe(
      res => {
        this.plantillasPlan = res;
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

  eliminar(i:number){
    this.plantillaPlanService.eliminar(this.plantillasPlan[i].id).subscribe(
      res => {
        Swal.fire(constantes.exito, constantes.exito_eliminar_plantilla_plan, constantes.exito_swal)
        this.consultarPlantillasPlan();
      },
      err => {
        if(err.error.codigo==constantes.error_codigo_datos_invalidos){
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if(err.error.codigo==constantes.error_codigo_generico){
          Swal.fire(constantes.error, constantes.error_eliminar_plantilla_plan, constantes.error_swal);
        }
      }
    );
  }

  buscar(){
    this.plantillaPlanService.buscar(this.nombre, this.somatotipo).subscribe(
      res => {
        this.plantillasPlan=res;
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
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
