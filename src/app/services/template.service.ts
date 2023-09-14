import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORM_RESPONSE } from '../constants/form.response';
import { DotForm } from '../interfaces/dot-form.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private readonly http = inject(HttpClient);

  getFormData(): Observable<DotForm[]> {
    return of({ data: FORM_RESPONSE }).pipe(
      // map(res => res.data),
      map(formOrignalData => {
        const mappedData = formOrignalData.data.map(item => {
          const row = item.row;
          const columns = row.columns.map(column => {
            const fields = column.fields.map(field => ({
              type: field.fieldType,
              hint: field.hint,
              label: field.name,
              required: field.required,
              regexCheck: field.regexCheck
            }))
            return { id: column.columnDivider.id, fields };
          })
          // return columns;
          return { row: { id: row.divider.id, columns: columns } }
        })
        return mappedData as unknown as DotForm[];
      })
    )
  }

  // data = [
  //   {
  //     type: '',
  //     hint: '',
  //     label: '',
  //     required: '',
  //     regexCheck: ''
  //   }
  // ]
}
