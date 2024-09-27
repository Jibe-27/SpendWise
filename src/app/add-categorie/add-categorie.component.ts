import { CategorieService } from 'src/services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { NewCategorieService, Categorie } from 'src/services/new-categorie.service';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  tabCategories: Categorie[] = [];

  constructor(
    private categorieService: NewCategorieService,
    private getAllcat: CategorieService
  ) {}

  ngOnInit(): void {
    this.getAllcat.GetAllCategories().subscribe(categories => {
      this.tabCategories = categories;
    });
  }

  openAddCategoryModal(): void {
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