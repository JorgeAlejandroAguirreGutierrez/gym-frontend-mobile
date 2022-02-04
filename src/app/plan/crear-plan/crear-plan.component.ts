import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ejercicio } from 'src/app/modelos/ejercicio';
import { Rutina } from 'src/app/modelos/rutina';
import { Usuario } from 'src/app/modelos/usuario';
import { EjercicioService } from 'src/app/servicios/ejercicio.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import * as constantes from '../../constantes';
import { environment } from '../../../environments/environment';
import * as util from '../../util';
import { Parametro } from 'src/app/modelos/parametro';
import { ParametroService } from 'src/app/servicios/parametro.service';
import { TipoMusculo } from 'src/app/modelos/tipo-musculo';
import { TipoMusculoService } from 'src/app/servicios/tipo-musculo.service';
import { Dia } from 'src/app/modelos/dia';
import { Plan } from 'src/app/modelos/plan';
import { PlantillaPlan } from 'src/app/modelos/plantilla-plan';
import { PlantillaPlanService } from 'src/app/servicios/plantilla-plan.service';
import { RutinaService } from 'src/app/servicios/rutina.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {

  gimnasio = environment.gimnasio;
  ubicacion = environment.ubicacion;

  plantillaPlanCrear: PlantillaPlan = new PlantillaPlan();
  plantillasPlan: PlantillaPlan[] = [];
  plantillaPlanAsignar: PlantillaPlan = null as any;

  identificacion: string = "";
  usuario: Usuario = new Usuario();
  cerrarModal: string = "";
  diaCrear: Dia = new Dia();
  rutinaCrear: Rutina = new Rutina();
  rutinaActualizar: Rutina = new Rutina();
  seleccionPE: number = -1;
  seleccionRE: number = -1;

  tiposMusculos: TipoMusculo[] = [];
  ejercicios: Ejercicio[] = [];
  medidasPesos: Parametro[] = [];
  medidasTiempos: Parametro[] = [];

  prefijoUrlEjercicios = environment.prefijo_url_ejercicios;

  tipoMusculoFuncional = constantes.parametroTipoMusculoFuncional;
  vacio = constantes.parametroVacio;

  campoDetalle: boolean=false;
  campoRepeticiones: boolean = false;
  campoSeries: boolean = false;
  campoValorPeso: boolean = false;
  campoMedidaPeso: boolean = false;
  campoValorTiempo: boolean = false;
  campoMedidaTiempo: boolean = false;

  @ViewChild('modalCrearRutina', { static: false }) private modalCrearRutina: any;
  @ViewChild('modalActualizarRutina', { static: false }) private modalActualizarRutina: any;
  @ViewChild('modalLeerEjercicio', { static: false }) private modalLeerEjercicio: any;
  @ViewChild('modalCrearPlantillaPlan', { static: false }) private modalCrearPlantillaPlan: any;

  constructor(private sesionService: SesionService, private usuarioService: UsuarioService,
    private ejercicioService: EjercicioService, private parametroService: ParametroService,
    private rutinaService: RutinaService,
    private tipoMusculoService: TipoMusculoService, private plantillaPlanService: PlantillaPlanService,
    private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    util.loadScripts();
    this.identificacion = this.route.snapshot.queryParamMap.get('identificacion') || null as any;
    if (this.identificacion == null) {
      this.navegarIndex();
    }
    this.obtenerPorIdentificacion();
    this.consultarTiposMusculos();
    this.consultarMedidasPesos();
    this.consultarMedidasTiempos();
    this.consultarPlantillasPlan();
  }

  obtenerPorIdentificacion() {
    this.usuarioService.obtenerPorIdentificacion(this.identificacion).subscribe(
      res => {
        this.usuario = res;
        if (this.usuario.plan == null) {
          this.usuario.plan = new Plan();
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_usuario, constantes.error_swal)
      }
    );
  }

  consultarPlantillasPlan() {
    this.plantillaPlanService.consultar().subscribe(
      res => {
        this.plantillasPlan = res;
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_generico) {
          Swal.fire(constantes.error, constantes.error_consultar_plantillas_plan, constantes.error_swal);
        }
      }
    );
  }

  asignarPlantillaPlan() {
    if (this.plantillaPlanAsignar != null) {
      this.convertirParaAsignar();
      this.usuario.plan.dias = this.plantillaPlanAsignar.plan.dias;
      this.usuarioService.actualizar(this.usuario).subscribe(
        res => {
          this.usuario = res;
          this.diaCrear = new Dia();
          this.desactivarAcordeon();
          this.usuario.plan.dias[this.usuario.plan.dias.length - 1].show = "show";
        },
        err => {
          if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
            Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
          }
          if (err.error.codigo == constantes.error_codigo_generico) {
            Swal.fire(constantes.error, constantes.error_asignar_plan, constantes.error_swal);
          }
        }
      );
    }
  }

  convertirParaAsignar() {
    for (let i = 0; i < this.plantillaPlanAsignar.plan.dias.length; i++) {
      this.plantillaPlanAsignar.plan.dias[i].id = 0;
      for (let j = 0; j < this.plantillaPlanAsignar.plan.dias[i].rutinas.length; j++) {
        this.plantillaPlanAsignar.plan.dias[i].rutinas[j].id = 0;
      }
    }
  }

  crearPlantillaPlan() {
    this.convertirParaGuardar();
    this.plantillaPlanService.crear(this.plantillaPlanCrear).subscribe(
      res => {
        this.plantillaPlanCrear = new PlantillaPlan();
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_crear_plantilla_plan, constantes.exito_swal);
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
      }
    );
  }

  convertirParaGuardar() {
    this.plantillaPlanCrear.plan.dias = this.getCopy(this.usuario.plan.dias);
    for (let i = 0; i < this.plantillaPlanCrear.plan.dias.length; i++) {
      this.plantillaPlanCrear.plan.dias[i].id = 0;
      for (let j = 0; j < this.plantillaPlanCrear.plan.dias[i].rutinas.length; j++) {
        this.plantillaPlanCrear.plan.dias[i].rutinas[j].id = 0;
      }
    }
  }

  abrirModalCrearRutina(i: number) {
    this.seleccionPE = i;
    this.open(this.modalCrearRutina);
  }

  abrirModalActualizarRutina(i: number, j: number) {
    this.seleccionPE = i;
    this.seleccionRE = j;
    let rutinaId = this.usuario.plan.dias[this.seleccionPE].rutinas[this.seleccionRE].id;
    this.rutinaService.obtener(rutinaId).subscribe(
      res => {
        this.rutinaActualizar = res;
        this.cargarEjerciciosActualizarRutina();
        this.open(this.modalActualizarRutina);
      },
      err => {
        Swal.fire(constantes.error, constantes.error_obtener_rutina, constantes.error_swal)
      }
    );
  }


  abrirModalLeerEjercicio(i: number, j: number) {
    this.seleccionPE = i;
    this.seleccionRE = j;
    this.open(this.modalLeerEjercicio);
  }

  abrirModalCrearPlantillaPlan() {
    this.open(this.modalCrearPlantillaPlan);
  }

  crearPlan() {
    if (this.usuario.plan.dias.length == 7) {
      Swal.fire(constantes.error, constantes.error_maximo_plan, constantes.error_swal)
      return;
    }
    let numero: number = this.usuario.plan.dias.length + 1;
    this.diaCrear.numero = numero;
    this.diaCrear.nombre = util.dia.get("DIA" + numero)!;
    this.usuario.plan.dias.push(this.diaCrear);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario = res;
        this.diaCrear = new Dia();
        this.desactivarAcordeon();
        this.usuario.plan.dias[this.usuario.plan.dias.length - 1].show = "show";
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if (err.error.codigo == constantes.error_codigo_generico) {
          Swal.fire(constantes.error, constantes.error_crear_plan, constantes.error_swal);
        }
      }
    );
  }

  crearRutina() {
    this.usuario.plan.dias[this.seleccionPE].rutinas.push({ ... this.rutinaCrear })
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario = res;
        this.rutinaCrear = new Rutina();
        this.desactivarAcordeon();
        this.usuario.plan.dias[this.seleccionPE].show = "show";
        this.modalService.dismissAll();
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if (err.error.codigo == constantes.error_codigo_generico) {
          Swal.fire(constantes.error, constantes.error_actualizar_rutina, constantes.error_swal);
        }
      }
    );
  }

  actualizarRutina() {
    this.usuario.plan.dias[this.seleccionPE].rutinas[this.seleccionRE] = ({ ... this.rutinaActualizar })
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario = res;
        this.rutinaActualizar = new Rutina();
        this.desactivarAcordeon();
        this.usuario.plan.dias[this.seleccionPE].show = "show";
        this.modalService.dismissAll();
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if (err.error.codigo == constantes.error_codigo_generico) {
          Swal.fire(constantes.error, constantes.error_actualizar_usuario, constantes.error_swal);
        }

      }
    );
  }

  eliminarRutina(i: number, j: number) {
    this.seleccionPE = i;
    this.seleccionRE = j;
    this.usuario.plan.dias[this.seleccionPE].rutinas.splice(this.seleccionRE, 1);
    this.usuarioService.actualizar(this.usuario).subscribe(
      res => {
        this.usuario = res;
        this.desactivarAcordeon();
        this.usuario.plan.dias[this.seleccionPE].show = "show";
        this.modalService.dismissAll();
        Swal.fire(constantes.exito, constantes.exito_eliminar_rutina, constantes.exito_swal)
      },
      err => {
        if (err.error.codigo == constantes.error_codigo_datos_invalidos) {
          Swal.fire(constantes.error, constantes.error_datos_invalidos, constantes.error_swal);
        }
        if (err.error.codigo == constantes.error_codigo_generico) {
          Swal.fire(constantes.error, constantes.error_eliminar_rutina, constantes.error_swal)
        }
      }
    );
  }

  consultarTiposMusculos() {
    this.tipoMusculoService.consultar().subscribe(
      res => {
        this.tiposMusculos = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_musculos, constantes.error_swal)
      }
    );
  }

  cargarEjerciciosCrearRutina() {
    this.ejercicios = [];
    if (this.rutinaCrear.ejercicio.tipoMusculo != null) {
      this.rutinaCrear.ejercicio.id=0;
      this.rutinaCrear.ejercicio.descripcion="";
      this.rutinaCrear.ejercicio.detalle="";
      this.rutinaCrear.ejercicio.imagen="";
      this.rutinaCrear.repeticiones = null as any;
      this.rutinaCrear.series = null as any;
      this.rutinaCrear.valorPeso = null as any;
      this.rutinaCrear.medidaPeso = "";
      this.rutinaCrear.valorTiempo = null as any;
      this.rutinaCrear.medidaTiempo = "";
      this.rutinaCrear.ejercicio.detalle = "";
      this.cargarCampos(this.rutinaCrear.ejercicio.tipoMusculo.descripcion);
      let tipoMusculoId = this.rutinaCrear.ejercicio.tipoMusculo.id.toString();
      this.consultarEjerciciosPorTipoMusculo(tipoMusculoId);
    }
  }

  cargarEjerciciosActualizarRutinaChange() {
    this.ejercicios = [];
    if (this.rutinaActualizar.ejercicio.tipoMusculo != null) {
      this.rutinaActualizar.ejercicio.id=0;
      this.rutinaActualizar.ejercicio.descripcion="";
      this.rutinaActualizar.ejercicio.detalle="";
      this.rutinaActualizar.ejercicio.imagen="";
      this.rutinaActualizar.repeticiones = null as any;
      this.rutinaActualizar.series = null as any;
      this.rutinaActualizar.valorPeso = null as any;
      this.rutinaActualizar.medidaPeso = "";
      this.rutinaActualizar.valorTiempo = null as any;
      this.rutinaActualizar.medidaTiempo = "";
      this.cargarCampos(this.rutinaActualizar.ejercicio.tipoMusculo.descripcion);
      let tipoMusculoId = this.rutinaActualizar.ejercicio.tipoMusculo.id.toString();
      this.consultarEjerciciosPorTipoMusculo(tipoMusculoId);
    }
  }

  cargarEjerciciosActualizarRutina() {
    this.ejercicios = [];
    if (this.rutinaActualizar.ejercicio.tipoMusculo != null) {
      this.cargarCampos(this.rutinaActualizar.ejercicio.tipoMusculo.descripcion);
      let tipoMusculoId = this.rutinaActualizar.ejercicio.tipoMusculo.id.toString();
      this.consultarEjerciciosPorTipoMusculo(tipoMusculoId);
    }
  }

  consultarEjerciciosPorTipoMusculo(tipoMusculoId: string) {
    this.ejercicioService.consultarPorTipoMusculo(tipoMusculoId).subscribe(
      res => {
        this.ejercicios = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_ejercicios, constantes.error_swal)
      }
    );
  }

  consultarMedidasPesos() {
    this.parametroService.consultarPorTipo(constantes.parametroMedidaPeso).subscribe(
      res => {
        this.medidasPesos = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_medidas_pesos, constantes.error_swal)
      }
    );
  }

  consultarMedidasTiempos() {
    this.parametroService.consultarPorTipo(constantes.parametroMedidaTiempo).subscribe(
      res => {
        this.medidasTiempos = res;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_medidas_pesos, constantes.error_swal)
      }
    );
  }

  private cargarCampos(tipoMusculo: string) {
    this.campoRepeticiones = false;
    this.campoSeries = false;
    this.campoValorPeso = false;
    this.campoMedidaPeso = false;
    this.campoValorTiempo = false;
    this.campoMedidaTiempo = false;
    let descripcion = tipoMusculo;
    if (descripcion == constantes.biceps || descripcion == constantes.triceps
      || descripcion == constantes.espalda || descripcion == constantes.pecho
      || descripcion == constantes.pierna || descripcion == constantes.abdomen
      || descripcion == constantes.hombro || descripcion == constantes.antebrazo
      || descripcion == constantes.aductores || descripcion == constantes.abductores
      || descripcion == constantes.gluteo || descripcion == constantes.pantorrillas) {
      this.campoDetalle=false;
      this.campoRepeticiones = true;
      this.campoSeries = true;
      this.campoValorPeso = true;
      this.campoMedidaPeso = true;
      this.campoValorTiempo = false;
      this.campoMedidaTiempo = false;
    }

    if (descripcion == constantes.funcional) {
      this.campoDetalle=false;
      this.campoRepeticiones = true;
      this.campoSeries = true;
      this.campoValorPeso = false;
      this.campoMedidaPeso = false;
      this.campoValorTiempo = true;
      this.campoMedidaTiempo = true;
    }

    if (descripcion == constantes.cardio) {
      this.campoDetalle=false;
      this.campoRepeticiones = false;
      this.campoSeries = false;
      this.campoValorPeso = false;
      this.campoMedidaPeso = false;
      this.campoValorTiempo = true;
      this.campoMedidaTiempo = true;
    }

    if (descripcion == constantes.hitboxFuncional) {
      this.campoDetalle=true;
      this.campoRepeticiones = true;
      this.campoSeries = true;
      this.campoValorPeso = false;
      this.campoMedidaPeso = false;
      this.campoValorTiempo = true;
      this.campoMedidaTiempo = true; 
    }
  }

  getCopy(obj: any) {
    return (JSON.parse(JSON.stringify(obj)));
  }

  compareFn(a: any, b: any) {
    return a && b && a.id == b.id;
  }

  desactivarAcordeon() {
    for (let i = 0; i < this.usuario.plan.dias.length; i++) {
      this.usuario.plan.dias[i].show = "";
    }
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
