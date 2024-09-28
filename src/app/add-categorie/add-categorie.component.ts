import { CategorieService } from 'src/services/categorie.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NewCategorieService, Categorie } from 'src/services/new-categorie.service';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  @ViewChild(ModalFormComponent) modalFormComponent!: ModalFormComponent;
  tabCategories: Categorie[] = [];
  userId: number = 2; 
  constructor(
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.categorieService.getCategoriesByIdUser(this.userId).subscribe(categories => {
      this.tabCategories = categories;
    });
  }

  openAddCategoryModal(): void {
    console.log('Setting userId in modal:', this.userId);
    this.modalFormComponent.userId = this.userId; 

    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  onCategoryAdded(newCategory: Categorie): void {
    this.tabCategories.push(newCategory);
  }

  getIconColorFilter(color: string): string {
    return `drop-shadow(0 0 0 ${color})`;
  }
}