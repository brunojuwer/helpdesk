import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config'
import { Observable, catchError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ErrorHandler } from '../config/httpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor (
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  create(cliente: Cliente):Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  update(cliente: Cliente):Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  delete(cliente: Cliente):Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }
}
