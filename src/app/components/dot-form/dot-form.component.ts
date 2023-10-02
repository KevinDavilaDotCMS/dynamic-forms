import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotField } from 'src/app/interfaces/dot-field.interface';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { DotForm } from 'src/app/interfaces/dot-form.interface';
import { DotFieldComponent } from "../dot-field/dot-field.component";

@Component({
  selector: 'dot-form',
  standalone: true,
  templateUrl: './dot-form.component.html',
  styleUrls: ['./dot-form.component.scss'],
  providers: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  imports: [CommonModule, ReactiveFormsModule, DotFieldComponent]
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

    this.formData.forEach(({ row }) => {
      row.columns.forEach((column) => {
        column.fields.forEach(field => {
          //as DotField to cover the map on service.
          const fieldControl = this.initializeFormControl(field as DotField);
          this.form.addControl(field.variable, fieldControl)
        })
      })
    })
  }

  initializeFormControl(field: DotField) {
    const validators = []
    if (field.required) validators.push(Validators.required);
    if (field.regexCheck) validators.push(Validators.pattern(field.regexCheck));
    return this.fb.control(null, { validators })
  }
}
