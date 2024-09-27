import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCategorieService, Categorie } from '../../services/new-categorie.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Output() categoryAdded = new EventEmitter<Categorie>();
  categoryForm: FormGroup;
  selectedColor: string = '#000000'; 
  svgIcons: { name: string, path: string }[];

  constructor(
    private fb: FormBuilder,
    private categorieService: NewCategorieService
  ) {
    this.svgIcons = this.categorieService.getSvgIcons();
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required], // Default color
      icon: ['', Validators.required]
    });
  }

  getIconColor(): string {
    return this.categoryForm.get('color')?.value || '#000000';
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const newCategory: Categorie = this.categoryForm.value;
      this.categorieService.AddNewCategorie(newCategory).subscribe(
        () => {
          this.categoryAdded.emit(newCategory);
          this.closeModal();
        },
        error => {
          console.error(error);
          alert('An error occurred while adding the category.');
        }
      );
    }
  }

  closeModal(): void {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}