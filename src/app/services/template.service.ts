import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORM_RESPONSE } from '../constants/form.response';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private readonly http = inject(HttpClient);

  getFormData() {
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
            return { fields };
          })
          // return columns;
          return { row: { columns: columns } }
        })
        return mappedData;
      })
    )
  }

  data = [
    {
      type: '',
      hint: '',
      label: '',
      required: '',
      regexCheck: ''
    }
  ]
}
