import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }
  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid
    delete ingresoEgreso.uid
    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
  }
  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => {
            const data: any = doc.payload.doc.data()
            return {
              uid: doc.payload.doc.id,
              ...data
            }
          })
        })
      )
  }
  borrarIngresoEgreso(uid: string) {
    const uidUser = this.authService.user?.uid
    return this.firestore.doc(`${uidUser}/ingresos-egresos/items/${uid}`).delete()
  }
}
