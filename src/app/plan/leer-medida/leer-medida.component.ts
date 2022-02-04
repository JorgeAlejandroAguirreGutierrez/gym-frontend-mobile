import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sesion } from 'src/app/modelos/sesion';
import { Usuario } from 'src/app/modelos/usuario';
import { SesionService } from 'src/app/servicios/sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as constantes from '../../constantes';
import Swal from 'sweetalert2';
import * as util from '../../util';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-leer-medida',
  templateUrl: './leer-medida.component.html',
  styleUrls: ['./leer-medida.component.css']
})
export class LeerMedidaComponent implements OnInit {

  gimnasio=environment.gimnasio;
  ubicacion=environment.ubicacion;

  usuario: Usuario=new Usuario();
  sesion: Sesion=null as any;

  cerrarModal: string="";

  @ViewChild('modalPesos', { static: false }) private modalPesos: any;
  @ViewChild('modalObservaciones', { static: false }) private modalObservaciones: any;
  @ViewChild('modalObjetivos', { static: false }) private modalObjetivos: any;
  @ViewChild('modalSuscripciones', { static: false }) private modalSuscripciones: any;

  constructor(private usuarioService: UsuarioService, private sesionService: SesionService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    util.loadScripts();
    this.validarSesion();
  }

  validarSesion(){
    this.sesion=this.sesionService.getSesion();
    this.sesionService.validar(this.sesion.id).subscribe(
      res => {
        this.sesion=res;
        this.obtenerPorIdentificacion(this.sesion.usuario.identificacion);
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

  obtenerPorIdentificacion(identificacion: string){
    this.usuarioService.obtenerPorIdentificacion(identificacion).subscribe(
      res => {
        this.usuario=res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_usuario, constantes.error_swal)
      }
    );
  }

  pesosVer(){
    this.open(this.modalPesos);
  }

  observacionesVer(){
    this.open(this.modalObservaciones);
  }
  
  objetivosVer(){
    this.open(this.modalObjetivos);
  }

  suscripcionesVer(){
    this.open(this.modalSuscripciones);
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
