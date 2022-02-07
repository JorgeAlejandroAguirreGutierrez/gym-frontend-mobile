import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { LeerClienteComponent } from './cliente/leer-cliente/leer-cliente.component';
import { CrearEjercicioComponent } from './ejercicio/crear-ejercicio/crear-ejercicio.component';
import { LeerEjercicioComponent } from './ejercicio/leer-ejercicio/leer-ejercicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { InicioSlideComponent } from './inicio-slide/inicio-slide.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { CrearPlantillaPlanComponent } from './plan/crear-plantilla-plan/crear-plantilla-plan.component';
import { LeerMedidaComponent } from './plan/leer-medida/leer-medida.component';
import { LeerPlanComponent } from './plan/leer-plan/leer-plan.component';
import { LeerPlantillaPlanComponent } from './plan/leer-plantilla-plan/leer-plantilla-plan.component';

const routes: Routes = [
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'inicio-slide', component: InicioSlideComponent},
  { path: 'iniciar-sesion', component: InicioSesionComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'crear-cliente', component: CrearClienteComponent},
  { path: 'leer-cliente', component: LeerClienteComponent},
  { path: 'crear-ejercicio', component: CrearEjercicioComponent},
  { path: 'leer-ejercicio', component: LeerEjercicioComponent},
  { path: 'crear-plan', component: CrearPlanComponent},
  { path: 'leer-plan', component: LeerPlanComponent},
  { path: 'crear-plantilla-plan', component: CrearPlantillaPlanComponent},
  { path: 'leer-plantilla-plan', component: LeerPlantillaPlanComponent},
  { path: 'leer-medida', component: LeerMedidaComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
