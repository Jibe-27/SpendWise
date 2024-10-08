
import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { NewCategorieService } from '../modal-form/new-categorie.service';
import { AuthService } from '../authentication/authentication.service';
import { User ,GeneralCategory,Categorie} from '../shared/model.shared';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  @ViewChild(ModalFormComponent) modalFormComponent!: ModalFormComponent;
  tabCategories : GeneralCategory[]=[]
  Usercategories:Categorie[] = [];
  user! :User
  userId!: number
  constructor(
    private categorieService: NewCategorieService,
    private authservice:  AuthService
  ) {}

  ngOnInit(): void {    
    const user = this.authservice.getUser();
    if (user) {
      this.user = user;
      this.userId=user.id
      
    } else {      
      console.error('User is null');
    }
    this.categorieService.getCategoriesByIdUser(this.userId).subscribe(categories => {
      this.Usercategories = categories;
    });
    this.categorieService.GetAllCategories().subscribe(
      (categories: GeneralCategory[]) => {
        this.tabCategories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  openAddCategoryModal(): void {    
    this.modalFormComponent.userId = this.userId; 
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  onCategoryAdded(newCategory: Categorie): void {
    this.Usercategories.push(newCategory);
  }

  getIconColorFilter(color: string): string {
    return `drop-shadow(0 0 0 ${color})`;
  }
}