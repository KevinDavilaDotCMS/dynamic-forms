import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TemplateService } from './services/template.service';
import { tap } from 'rxjs/operators';
import { DotFormComponent } from "./components/dot-form/dot-form.component";
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, DropdownModule, FormsModule, DotFormComponent]
})
export class AppComponent {

  private readonly templateService = inject(TemplateService);
  formData$ = this.templateService.getFormData()
  // .pipe(tap(console.log))

}
