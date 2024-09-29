import { Component, EventEmitter, Input, Output,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCategorieService } from './new-categorie.service';
import { User,GeneralCategory, Categorie } from 'src/app/shared/model.shared';


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Input() userId!: number; 
  @Output() categoryAdded = new EventEmitter<Categorie>();
  categoryForm: FormGroup;
  selectedColor: string = '#000000'; 

  constructor(
    private fb: FormBuilder,
    private categorieService: NewCategorieService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required], 
      icon: ['', Validators.required],
      userId: [null, Validators.required] 
    });
  }
  ngOnInit(): void {
    
    this.categoryForm.patchValue({ userId: this.userId }); 
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].isFirstChange()) {
      
      this.categoryForm.patchValue({ userId: this.userId });
    }
  }

 
  onSubmit(): void {
    
    if (this.categoryForm.valid) {    
      let iconValue = this.categoryForm.get('icon')?.value;
      iconValue = iconValue?.trim();
      iconValue = iconValue?.toLowerCase().replace(/\s+/g, '-');
      iconValue = `pi pi-${iconValue}`;
      this.categoryForm.patchValue({ icon: iconValue }); 

      const newCategory: Categorie = { ...this.categoryForm.value };
      this.categorieService.AddNewCategorie(newCategory).subscribe(
        () => {
          this.categoryAdded.emit(newCategory);
          this.closeModal();
        },
        error => {
          console.error(error);
          alert('Une erreur est survenue lors de l\'ajout de la catégorie.');
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
  getIconColor(): string {
    return this.categoryForm.get('color')?.value || '#000000';
  }
}