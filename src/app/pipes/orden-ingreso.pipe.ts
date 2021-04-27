import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1
      } else {
        return 1
      }
    })
  }

}
