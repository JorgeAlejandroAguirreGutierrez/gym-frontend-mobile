import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    LeerPlantillaPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
