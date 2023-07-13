import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:"root"
})
export class ErrorHandler {

  constructor(private toastr: ToastrService) {}


  handler(error: HttpErrorResponse) {
    
    if(error.status === 400) {
      if(error.error.errors) {
        error.error.errors.forEach(element => {
          this.toastr.error(element.message, "Erro");
        })
      } else {
        this.toastr.error(error.error.message, "Erro");
      }
    }
    
    if (error.status === 403) {
      this.toastr.error('Verifique suas credenciais', 'Falha de login');
      return throwError(() => new Error('Falha nas credenciais'));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}