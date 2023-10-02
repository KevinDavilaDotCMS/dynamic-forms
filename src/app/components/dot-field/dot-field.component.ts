import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { DotField } from 'src/app/interfaces/dot-form.interface';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { HostFieldData } from 'src/app/interfaces/dot-field.interface';
import { TemplateService } from 'src/app/services/template.service';


@Component({
  selector: 'dot-field',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './dot-field.component.html',
  styleUrls: ['./dot-field.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    }
  ]
})
export class DotFieldComponent {
  @Input() field!: DotField;

  private controlContainer = inject(ControlContainer);
  private templateService = inject(TemplateService);
  options: HostFieldData[] = []

  get form() {
    return (this.controlContainer as FormGroupDirective).form
  }

  ngOnInit() {
    if (this.field.type === 'Host-Folder' && this.field.url) {
      this.templateService.getDropdownData(this.field.url).subscribe(res => {
        console.log(res)
        this.options = res
      })
    }
  }
}
