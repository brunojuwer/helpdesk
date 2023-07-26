import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadosService } from 'src/app/services/chamados.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataService } from 'src/app/services/data.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    id:null,
    prioridade: "",
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl("", Validators.required);
  status: FormControl = new FormControl("", Validators.required);
  titulo: FormControl = new FormControl("", Validators.required);
  observacoes: FormControl = new FormControl("", Validators.required);
  tecnico: FormControl = new FormControl("", Validators.required);
  cliente: FormControl = new FormControl("", Validators.required);

  constructor(
    private chamadoService: ChamadosService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private dataService: DataService

  ){}

  ngOnInit(): void {
    this.chamado = this.dataService.getChamado();
    this.clienteService.findAll().subscribe(res => this.clientes = res);
    this.tecnicoService.findAll().subscribe(res => this.tecnicos = res);
  }

  validateFields():boolean {
    return this.prioridade.valid &&
           this.status.valid &&
           this.titulo.valid && 
           this.observacoes.valid &&
           this.tecnico.valid &&
           this.cliente.valid;
  }

  update(): void {
    this.chamadoService.update(this.chamado)
      .subscribe(() => {
        this.toastr.success("Chamado atualizado com sucesso", "Atualização de chamado");
        this.router.navigate(['chamados']);
      });
  }


  convertStatus(id: any){
    const obj = {
      "0": 'ABERTO',
      "1": "EM ANDAMENTO",
      "2": "ENCERRADO"
    }
    return obj[id]
  }

  convertPrioridade(id: any){
    const obj = {
      "0": 'BAIXA',
      "1": "MÉDIA",
      "2": "ALTA"
    }
    return obj[id];
  }
}
