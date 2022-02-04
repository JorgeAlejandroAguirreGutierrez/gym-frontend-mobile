import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { SesionService } from 'src/app/servicios/sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import * as util from '../../util';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sesion } from 'src/app/modelos/sesion';

@Component({
  selector: 'app-leer-plan',
  templateUrl: './leer-plan.component.html',
  styleUrls: ['./leer-plan.component.css']
})
export class LeerPlanComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;

  sesion: Sesion= null as any;
  usuario: Usuario=new Usuario();
  prefijoUrlEjercicios= environment.prefijo_url_ejercicios;
  seleccionPE: number=-1;
  seleccionRE: number=-1;

  tipoMusculoFuncional=constantes.parametroTipoMusculoFuncional;
  
  cerrarModal: string = "";
  @ViewChild('modalLeerEjercicio', { static: false }) private modalLeerEjercicio: any;

  constructor(private sesionService: SesionService, private usuarioService: UsuarioService, private route: ActivatedRoute,
    private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    util.loadScripts();
    this.sesion=this.sesionService.getSesion();
    if(this.sesion==null || this.sesion.usuario.perfil.descripcion!=constantes.perfil_cliente){
      this.navegarIndex();
    }
    this.obtenerPorIdentificacion();
  }

  obtenerPorIdentificacion(){
    this.usuarioService.obtenerPorIdentificacion(this.sesion.usuario.identificacion).subscribe(
      res => {
        this.usuario=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_usuario, constantes.error_swal)
      }
    );
  }

  abrirModalLeerEjercicio(i:number, j:number){
    this.seleccionPE=i;
    this.seleccionRE=j;
    this.open(this.modalLeerEjercicio);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
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
