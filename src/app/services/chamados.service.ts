import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Chamado } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';
import { ErrorHandler } from '../config/httpErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {

  constructor (
    private http: HttpClient,
    private errorHandler: ErrorHandler
  ) {}

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  create(chamado: Chamado):Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  update(chamado: Chamado):Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }

  delete(chamado: Chamado):Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`)
      .pipe(catchError(err => this.errorHandler.handler(err)));
  }
}
