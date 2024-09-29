import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser && currentUser.id) {
      this.authService
        .getUserById(currentUser.id.toString())
        .subscribe((user) => {
          this.userEmail = user.email;
        });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
