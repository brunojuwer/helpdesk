import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Credentials } from '../models/credentials';
import { ErrorHandler } from '../config/httpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, 
    private toastr: ToastrService,
    private errorHandler: ErrorHandler
  ) { }

  authenticate(credenciais: Credentials) {
      return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
        observe: 'response',
        responseType: 'text'
      }).pipe(catchError(err => this.errorHandler.handler(err)))

  }

  successFullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if(token) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.setItem('token', null)
    this.toastr.info("Usuário deslogado com sucesso", "Logout", {timeOut: 6000})
  }
}
