import { Injectable } from '@angular/core';
import { Tecnico } from '../models/tecnico';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private tecnico: Tecnico;
  private cliente: Cliente;

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
}
