import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';


export const SET_ITEMS = '[IngresoEgreso] Set Itemes';
export const UNSET_ITEMS = '[IngresoEgreso] Unset Itemes';


export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor( public items: IngresoEgreso[] ) {}
}

export class UnsetItemsAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsAction | UnsetItemsAction;
