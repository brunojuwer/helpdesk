import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { DataService } from 'src/app/services/data.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit{
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
    private toastr: ToastrService,
    private dataService: DataService
  ){}

  ngOnInit(): void {
    const tecnicoData: Tecnico = this.dataService.getTecnico();
    this.tecnico.nome = tecnicoData.nome;
    this.tecnico.cpf = tecnicoData.cpf;
    this.tecnico.email = tecnicoData.email;
    this.tecnico.senha = tecnicoData.senha;
    this.tecnico.perfis = tecnicoData.perfis;
    console.log(this.tecnico)
  }

  validFields() {
    return this.nome.valid && this.cpf.valid
            && this.email.valid && this.senha.valid;
  }

  update() {
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
