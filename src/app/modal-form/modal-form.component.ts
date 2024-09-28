import { Component, EventEmitter, Input, Output,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCategorieService, Categorie } from '../../services/new-categorie.service';

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
    console.log('userId dans modal-form 1 test', this.userId);
    this.categoryForm.patchValue({ userId: this.userId }); // Mettre à jour userId dans le formulaire
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].isFirstChange()) {
      console.log('userId changé:', this.userId);
      this.categoryForm.patchValue({ userId: this.userId }); // Mettre à jour userId dans le formulaire lors des changements
    }
  }

  onSubmit(): void {
    console.log('userId dans modal-form', this.categoryForm.value, this.userId);
    if (this.categoryForm.valid) {
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
