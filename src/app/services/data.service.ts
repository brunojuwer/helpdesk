import { Injectable } from '@angular/core';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private tecnico: Tecnico;

  getTecnico() {
    return this.tecnico;
  }

  setTecnico(tecnico: Tecnico) {
    this.tecnico = tecnico;
  }
}
