import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { ParametroService } from '../servicios/parametro.service';
import * as constantes from '../constantes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  prefijoUrlImagenes = environment.prefijo_url_imagenes;
  inicio=constantes.inicio; 

  constructor(private router: Router, private parametroService: ParametroService) { }

  ngOnInit(): void {
    this.consultarInicio();
  }

  consultarInicio(){
    of(1).pipe(
    delay(5000))
    .subscribe(
      () => {
        this.navegarSlide();
      }
    );
  }

  navegarSlide() {
    this.router.navigateByUrl('/inicio-slide');
  }

}
