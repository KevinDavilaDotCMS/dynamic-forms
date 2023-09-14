import { Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotRow } from 'src/app/interfaces/dot-form.interface';
import { DotFieldComponent } from "../dot-field/dot-field.component";
import { ControlContainer, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dot-row',
  standalone: true,
  templateUrl: './dot-row.component.html',
  styleUrls: ['./dot-row.component.scss'],
  imports: [CommonModule, DotFieldComponent, ReactiveFormsModule],
  providers: [
    { provide: ControlContainer, useExisting: FormGroupDirective }

  ]
})
export class DotRowComponent {
  @Input() row!: DotRow
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  private readonly controlContainer = inject(ControlContainer);

  get rowForm() {
    return ((this.controlContainer as FormGroupDirective).form).get('row' + this.row.id) as FormGroup
  }

}
