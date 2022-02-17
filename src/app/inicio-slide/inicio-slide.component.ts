import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parametro } from '../modelos/parametro';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ParametroService } from '../servicios/parametro.service';
import { environment } from '../../environments/environment';
declare var $: any; // used to access jQuery

@Component({
  selector: 'app-inicio-slide',
  templateUrl: './inicio-slide.component.html',
  styleUrls: ['./inicio-slide.component.css']
})
export class InicioSlideComponent implements OnInit {

  @ViewChild('carousel') _carousel!: ElementRef;
  bandera=false;

  prefijoUrlImagenes = environment.prefijo_url_imagenes;

  inicioSlide: Parametro[]=[new Parametro(), new Parametro(), new Parametro(), new Parametro()];

  conceptoSlide: Parametro[]=[new Parametro(), new Parametro(), new Parametro(), new Parametro()];
  tituloSlide: String[]=[new String(), new String(), new String(), new String()];
  descripcionSlide: String[]=[new String(), new String(), new String(), new String()];

  constructor(private router: Router, private parametroService: ParametroService) { }

  ngAfterViewInit() {
    const carouselElem = this._carousel?.nativeElement;
    const carousel = $(carouselElem).carousel();
  }

  ngOnInit(): void {
    this.consultarInicioSlide();
    this.consultarConceptoSlide();
  }

  consultarInicioSlide(){
    this.parametroService.consultarPorTipo(constantes.parametroInicioSlide).subscribe(
      res => {
        this.inicioSlide=res;
        this.bandera=true;
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_inicio_slide, constantes.error_swal)
      }
    );
  }
  consultarConceptoSlide(){
    this.parametroService.consultarPorTipo(constantes.parametroConceptoSlide).subscribe(
      res => {
        this.conceptoSlide=res;
        console.log(this.conceptoSlide);
        for (let i=0; i<this.conceptoSlide.length; i++){
          let concepto=this.conceptoSlide[i].valor.split("_");
          this.tituloSlide[i]=concepto[0];
          this.descripcionSlide[i]=concepto[1];
        }
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_concepto_slide, constantes.error_swal)
      }
    );
  }

  ingresar(){
    this.router.navigateByUrl('/iniciar-sesion');
  }

}
