import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config'
import { Observable, catchError } from 'rxjs';
import { Tecnico } from '../models/tecnico';
import { ErrorHandler } from '../config/httpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  create(tecnico: Tecnico):Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }
}
