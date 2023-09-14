import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DotField } from 'src/app/interfaces/dot-form.interface';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'dot-field',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './dot-field.component.html',
  styleUrls: ['./dot-field.component.scss'],
  providers: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DotFieldComponent {
  @Input() field!: DotField;
}
