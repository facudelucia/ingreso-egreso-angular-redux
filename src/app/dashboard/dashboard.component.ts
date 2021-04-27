import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {


  userSubs!: Subscription
  ingresosSubs!: Subscription
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }: any) => {
        this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresosFB: any) => {
            this.store.dispatch(ingresosEgresosActions.setItems({ items: ingresosEgresosFB }))
          })
      })
  }
  ngOnDestroy() {
    this.ingresosSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
  }
}
