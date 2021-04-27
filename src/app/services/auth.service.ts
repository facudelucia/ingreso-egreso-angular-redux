import { AppState } from './../app.reducer';
import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { map } from "rxjs/operators"
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions'
import { Subscription } from 'rxjs';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription
  private _user!: Usuario | null
  get user() {
    return this._user
  }
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser)
            this._user = user
            this.store.dispatch(authActions.setUser({ user }))
          })
      } else {
        this._user = null
        this.userSubscription?.unsubscribe()
        this.store.dispatch(authActions.unSetUser())
        this.store.dispatch(ingresosEgresosActions.unSetItems())
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }: any) => {
        const newUser = new Usuario(user.uid, nombre, user.email)
        return this.firestore.doc(`${user.uid}/usuario`)
          .set({ ...newUser })
      })
  }
  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.auth.signOut()
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    )
  }
}