import { AppStateWithIngreso } from './../ingreso-egreso.reducer';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {


  ingresosEgresos: IngresoEgreso[] = []
  ingresosEgresosSub!: Subscription
  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosEgresosSub = this.store.select('ingresoEgreso')
      .subscribe(({ items }) => this.ingresosEgresos = items)
  }
  ngOnDestroy() {
    this.ingresosEgresosSub.unsubscribe()
  }
  borrar(uid: any) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid.uid)
      .then(() => Swal.fire('Borrado', 'item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }
}
