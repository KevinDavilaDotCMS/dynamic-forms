import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotField } from 'src/app/interfaces/field.interface';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { DotRowComponent } from '../dot-row/dot-row.component';
import { DotForm } from 'src/app/interfaces/dot-form.interface';

@Component({
  selector: 'dot-form',
  standalone: true,
  imports: [CommonModule, DotRowComponent, ReactiveFormsModule],
  templateUrl: './dot-form.component.html',
  styleUrls: ['./dot-form.component.scss'],
  providers: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DotFormComponent {

  @Input() formData: DotForm[] = [];

  // @Input() fieldset: DotField[] = [];
  form!: FormGroup;

  private fb = inject(FormBuilder);
  ngOnInit() {
    console.log(this.formData)
    if (this.formData) {
      this.initializeForm();
      console.log(this.form.value)
    }
  }

  initializeForm() {
    this.form = this.fb.group({});

    this.formData.forEach(({ row }, rowIndex) => {
      const rowGroup = this.fb.group({});


      row.columns.forEach((column, columnIndex) => {
        const columnGroup = this.fb.group({});
        column.fields.forEach(field => {
          //as DotField to cover the map on service.
          const fieldControl = this.initializeFormControl(field as DotField);
          columnGroup.addControl(field.type, fieldControl)
          rowGroup.addControl('column' + column.id, columnGroup)
        })
        this.form.addControl('row' + row.id, rowGroup)
      })
    })
  }

  initializeFormControl(field: DotField) {
    const validators = []
    if (field.required) validators.push(Validators.required);
    if (field.regexCheck) validators.push(Validators.pattern(field.regexCheck));
    // console.log("Validators: ", validators)
    return this.fb.control(null, { validators })
  }
}
