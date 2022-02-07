import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from "rxjs";
import { delay, map,  tap } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { ParametroService } from '../servicios/parametro.service';
import * as constantes from '../constantes';
import Swal from 'sweetalert2';
import { Parametro } from '../modelos/parametro';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  prefijoUrlImagenes = environment.prefijo_url_imagenes;
  bandera=false;

  inicio: Parametro[]=[new Parametro()];

  constructor(private router: Router, private parametroService: ParametroService) { }

  ngOnInit(): void {
    this.consultarInicio();
  }

  consultarInicio(){
    this.parametroService.consultarPorTipo(constantes.parametroInicio).subscribe(
      res => {
        this.inicio=res;
        this.bandera=true;
        of(1).pipe(
        delay(5000))
        .subscribe(
          () => {
            this.navegarSlide();
          }
        );
      },
      err => {
        Swal.fire(constantes.error, constantes.error_consultar_inicio, constantes.error_swal)
      }
    );
  }

  navegarSlide() {
    this.router.navigateByUrl('/inicio-slide');
  }

}
