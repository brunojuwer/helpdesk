import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
})
export class TecnicoCreateComponent {

  nome: FormControl = new FormControl("", Validators.minLength(1))
  cpf: FormControl = new FormControl("", Validators.required)
  email: FormControl = new FormControl("", Validators.email)
  senha: FormControl = new FormControl("", Validators.minLength(3))

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: []
  }

  constructor (
    private service: TecnicoService,
    private toastr: ToastrService
  ){}

  validFields() {
    return this.nome.valid && this.cpf.valid 
            && this.email.valid && this.senha.valid;
  }

  create() {
    this.tecnico.nome = this.nome.value;
    this.service.create(this.tecnico).subscribe(res => this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro'));
  }

  addPerfil(perfil: any) {
    if(!this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.push(perfil);
    } else {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }
  }
}

