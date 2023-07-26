import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }


  constructor(
    private service: ChamadosService,
    private routerUtil: ActivatedRoute
  ){}

  
  ngOnInit(): void {
    this.chamado.id = parseFloat(this.routerUtil.snapshot.paramMap.get("id"));
    this.service.findById(this.chamado.id).subscribe(res => this.chamado = res);
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
