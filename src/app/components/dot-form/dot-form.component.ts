import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotField } from 'src/app/interfaces/field.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dot-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dot-form.component.html',
  styleUrls: ['./dot-form.component.scss']
})
export class DotFormComponent {
  @Input() fieldset: DotField[] = [];
  form!: FormGroup;

  private fb = inject(FormBuilder);
  ngOnInit() {
    console.log(this.fieldset)
    if (this.fieldset) {
      this.initializeForm();
      console.log("--------------------------")
      console.log("form: ", this.form.value)
      console.log("--------------------------")
    }
  }

  initializeForm() {
    this.form = this.fb.group({});

    this.fieldset.forEach(field => {
      this.form.addControl(field.type, this.initializeFormControl(field));
    })
  }

  initializeFormControl(field: DotField) {
    const validators = []
    if (field.required) validators.push(Validators.required);
    if (field.regexCheck) validators.push(Validators.pattern(field.regexCheck));
    console.log("Validators: ",validators)
    return this.fb.control(null, { validators })
  }
}
