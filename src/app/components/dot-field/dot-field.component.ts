import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'dot-field',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './dot-field.component.html',
  styleUrls: ['./dot-field.component.scss']
})
export class DotFieldComponent {

}
