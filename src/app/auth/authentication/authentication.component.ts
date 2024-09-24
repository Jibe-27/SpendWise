import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  isSignIn = false;
  form: FormGroup= new FormGroup({});
  constructor() { 
  }
  ngOnInit(): void {
    this.setupForm();
  }
  onSubmit():void {
    if (this.form.valid) { 

    } else {
      
    }
  }
  switchToForm() {
    this.isSignIn = !this.isSignIn;
    this.setupForm();
  }
  private setupForm():void {
    if (this.isSignIn) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        name: new FormControl('', Validators.required)
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }
  }
}
