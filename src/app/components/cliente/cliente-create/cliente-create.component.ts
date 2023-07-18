import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent {

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
    private toastr: ToastrService
  ){}

  validFields() {
    return this.nome.valid && this.cpf.valid 
            && this.email.valid && this.senha.valid;
  }

  create() {
    this.service.create(this.cliente).subscribe(res => this.toastr.success('Cliente cadastrado com sucesso', 'Cadastro'));
  }

  addPerfil(perfil: any) {
    if(!this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.push(perfil);
    } else {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }
  }
}

