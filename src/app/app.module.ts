import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DateShortPipe } from './pipes/date-short-pipe';

import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LeerClienteComponent } from './cliente/leer-cliente/leer-cliente.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LeerEjercicioComponent } from './ejercicio/leer-ejercicio/leer-ejercicio.component';
import { CrearEjercicioComponent } from './ejercicio/crear-ejercicio/crear-ejercicio.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { LeerPlanComponent } from './plan/leer-plan/leer-plan.component';
import { LeerMedidaComponent } from './plan/leer-medida/leer-medida.component';
import { CrearPlantillaPlanComponent } from './plan/crear-plantilla-plan/crear-plantilla-plan.component';
import { LeerPlantillaPlanComponent } from './plan/leer-plantilla-plan/leer-plantilla-plan.component';


import { InicioComponent } from './inicio/inicio.component';
import { InicioSlideComponent } from './inicio-slide/inicio-slide.component';
import { MenuComponent } from './menu/menu.component';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    DateShortPipe,
    CrearClienteComponent,
    LeerClienteComponent,
    InicioSesionComponent,
    PageNotFoundComponent,
    LeerEjercicioComponent,
    CrearEjercicioComponent,
    CrearPlanComponent,
    LeerPlanComponent,
    LeerMedidaComponent,
    CrearPlantillaPlanComponent,
    LeerPlantillaPlanComponent,
    InicioComponent,
    InicioSlideComponent,
    MenuComponent,
    MenuClienteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
