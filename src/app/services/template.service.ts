import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FORM_RESPONSE } from '../constants/form.response';
import { DotForm } from '../interfaces/dot-form.interface';
import { HostFieldData } from '../interfaces/dot-field.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  getFormData(): Observable<DotForm[]> {
    return of({ data: FORM_RESPONSE }).pipe(
      map(formOrignalData => {
        const mappedData = formOrignalData.data.map(item => {
          const row = item.row;
          const columns = row.columns.map(column => {
            const fields = column.fields.map(field => ({
              id: field.id,
              type: field.fieldType,
              hint: field.hint,
              label: field.name,
              required: field.required,
              regexCheck: field.regexCheck,
              url: field.url,
              variable: field.variable
            }))
            return { id: column.columnDivider.id, fields };
          })
          return { row: { id: row.divider.id, columns: columns } }
        })
        return mappedData as unknown as DotForm[];
      })
    )
  }


  getDropdownData(url: string): Observable<HostFieldData[]> {
    console.log("URL: ", url)
    const fake = url === "1" ? [
      {
        "identiter": "1",
        "name": "uno.demo"
      },
      {
        "identiter": "2",
        "name": "dos.demo"
      }
    ]
      : [
        {
          "identiter": "1",
          "name": "tres.demo"
        },
        {
          "identiter": "2",
          "name": "cuatro.demo"
        }
      ]
    return of(fake)
  }
}
