import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { DataService } from 'src/app/services/data.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit{
  nome: FormControl = new FormControl("", Validators.minLength(1))
  cpf: FormControl = new FormControl("", Validators.required)
  email: FormControl = new FormControl("", Validators.email)
  senha: FormControl = new FormControl("", Validators.minLength(3))

  cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  constructor (
    private service: ClienteService,
    private toastr: ToastrService,
    private dataService: DataService
  ){}

  ngOnInit(): void {
    const clienteData: Cliente = this.dataService.getCliente();
    this.cliente.id = clienteData.id;
    this.cliente.nome = clienteData.nome;
    this.cliente.cpf = clienteData.cpf;
    this.cliente.email = clienteData.email;
    this.cliente.senha = clienteData.senha;
    this.cliente.perfis = clienteData.perfis;
  }

  validFields() {
    return this.nome.valid && this.cpf.valid
            && this.email.valid && this.senha.valid;
  }

  update() {
    const clienteToSave:Cliente = {...this.cliente};
    clienteToSave.perfis = this.transformPerfis(this.cliente.perfis)
    this.service.update(clienteToSave).subscribe(res => this.toastr.success('Atualizado com sucesso', 'Atualização'));
  }

  addPerfil(perfil: any) {
    if(!this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.push(perfil);
    } else {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }
  }

  hasPerfil(perfil: string): boolean {
      return this.cliente.perfis.includes(perfil);
  }

  transformPerfis(perfis: string[]){
    const perfisObj = {
      'ADMIN': 0,
      'CLIENTE': 1,
      'cliente': 2
    }

    return perfis.map(perfil => perfisObj[perfil]);
  }
}
