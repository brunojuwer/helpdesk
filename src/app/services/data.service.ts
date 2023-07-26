import { Injectable } from '@angular/core';
import { Tecnico } from '../models/tecnico';
import { Cliente } from '../models/cliente';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private tecnico: Tecnico;
  private cliente: Cliente;
  private chamado: Chamado;

  getTecnico() {
    return this.tecnico;
  }

  setTecnico(tecnico: Tecnico) {
    this.tecnico = tecnico;
  }

  getCliente() {
    return this.cliente;
  }

  setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  getChamado() {
    return this.chamado;
  }

  setChamado(chamado: Chamado) {
    this.chamado = chamado;
  }
}
