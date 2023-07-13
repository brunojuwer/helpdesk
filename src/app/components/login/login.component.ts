import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;

  credentials: Credentials = {
    email: '',
    senha: ''
  }

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(3)])
      }
    );
    
  }

  onLogin() {
    this.auth.authenticate(this.credentials)
      .subscribe(response => {
        this.auth.successFullLogin(
          response.headers.get('Authorization').replace("Bearer ", "")
          )
          this.router.navigate([''])
      });
  }

  validateFields(): boolean {
    return this.loginForm.get('email').valid && this.loginForm.get('password').valid;
  }
}

