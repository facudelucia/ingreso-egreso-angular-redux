import { StoreModule } from '@ngrx/store';
import { DashboardRoutesModule } from './../dashboard/dashboard-routes.module';
import { SharedModule } from './../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenIngresoPipe } from './../pipes/orden-ingreso.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
