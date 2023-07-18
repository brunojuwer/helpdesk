import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { DataService } from 'src/app/services/data.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent {
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
    private dataService: DataService,
    private router: Router
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

  delete() {
    this.service.delete(this.cliente).subscribe(() => this.toastr.success("Removido com sucesso", "Remoção"))
    this.router.navigate(['/clientes'])
  }

  hasPerfil(perfil: string): boolean {
      return this.cliente.perfis.includes(perfil);
  }
}
