import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/model.shared';
import { NotificationService } from '../shared/notification/notification.service';
import { AuthService } from './authentication.service';
import { Router } from '@angular/router';
import { PasswordValidator } from './password-validator';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isSignIn = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: User = {
        id: 0,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        name: this.form.controls['name']?.value ?? '',
        budget: this.form.controls['budget']?.value ?? 0,
      };

      if (!this.isSignIn) {
        this.authService.login(user).subscribe({
          next: () => {
            this.notificationService.success('AUTH.LOGIN_SUCCESS');
            this.router.navigate(['/']);
          },
          error: () => {
            this.notificationService.error('AUTH.LOGIN_FAILED');
          },
        });
      } else {
        this.authService.register(user).subscribe({
          next: () => {
            this.notificationService.success('AUTH.REGISTER_SUCCESS');
            this.router.navigate(['/']);
          },
          error: () => {
            this.notificationService.error('AUTH.REGISTER_FAILED');
          },
        });
      }
    } else {
      if (this.isSignIn) {
        this.notificationService.error('AUTH.REGISTER_FAILED');
      } else {
        this.notificationService.error('AUTH.LOGIN_FAILED');
      }
    }
  }

  switchToForm() {
    this.isSignIn = !this.isSignIn;
    this.setupForm();
  }
  hasPasswordErrors(): boolean {
    const control = this.form.get('password');
    return control?.touched && control?.invalid ? true : false;
  }

  private setupForm(): void {
    if (this.isSignIn) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          PasswordValidator.strongPassword(),
        ]),
        name: new FormControl('', Validators.required),
        budget: new FormControl(0, [Validators.required, Validators.min(0)]),
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          PasswordValidator.strongPassword(),
        ]),
      });
    }
  }
}
