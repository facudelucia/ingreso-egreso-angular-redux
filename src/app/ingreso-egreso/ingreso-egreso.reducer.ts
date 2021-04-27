import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { createReducer, on } from '@ngrx/store'

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
    ingresoEgreso: State
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }: any) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state: any, action: any) {
    return _ingresoEgresoReducer(state, action);
}