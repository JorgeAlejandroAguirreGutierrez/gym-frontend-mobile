import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ParametroService } from '../servicios/parametro.service';
import * as constantes from '../constantes';
import { environment } from 'src/environments/environment';
import { Parametro } from '../modelos/parametro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  host=environment.host;
  prefijoUrlImagenes = environment.prefijoUrlImagenes;
  inicio: Parametro[]=[new Parametro()];
  bandera=false; 

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
