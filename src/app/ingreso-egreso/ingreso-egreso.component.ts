import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select('ui')
      .subscribe( ui => this.loading = ui.isLoading );

    this.form = new FormGroup({
      description: new FormControl( '', Validators.required ),
      monto: new FormControl( 0, Validators.min(0))

    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction() );

    const ingresoEgreso = new IngresoEgreso( {...this.form.value, tipo: this.tipo } );
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire({
          title: 'Creado!',
          text: ingresoEgreso.description,
          type: 'success',
          confirmButtonText: 'Cool'
        });
      })
      .catch( error => {
        this.store.dispatch( new DesactivarLoadingAction() );
        Swal.fire({
          title: 'Error al crear el registro!',
          text: error.message,
          type: 'error',
          confirmButtonText: 'Cool'
        });
      });

    this.form.reset({
      monto: 0
    });
  }

}
