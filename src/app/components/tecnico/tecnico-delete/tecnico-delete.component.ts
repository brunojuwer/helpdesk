import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { DataService } from 'src/app/services/data.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent {
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
    private dataService: DataService,
    private router: Router
  ){}

  ngOnInit(): void {
    const tecnicoData: Tecnico = this.dataService.getTecnico();
    this.tecnico.id = tecnicoData.id;
    this.tecnico.nome = tecnicoData.nome;
    this.tecnico.cpf = tecnicoData.cpf;
    this.tecnico.email = tecnicoData.email;
    this.tecnico.senha = tecnicoData.senha;
    this.tecnico.perfis = tecnicoData.perfis;
  }

  delete() {
    this.service.delete(this.tecnico).subscribe(() => this.toastr.success("Removido com sucesso", "Remoção"))
    this.router.navigate(['/tecnicos'])
  }

  hasPerfil(perfil: string): boolean {
      return this.tecnico.perfis.includes(perfil);
  }
}
