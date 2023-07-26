import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_ELEMENT_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo','tecnico', 'cliente', 'dataAbertura', 'status', 'prioridade', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private service: ChamadosService,
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.getAllChamados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllChamados() {
    this.service.findAll().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Chamado>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  returnStatus(status: any): string {
    const obj = {
      '0': 'ABERTO',
      '1': 'EM ANDAMENTO',
      '2': 'ENCERRADO'
    }
    return obj[status];
  }

  returnPrioridade(pri: any): string {
    const obj = {
      '0': 'BAIXA',
      '1': 'MÉDIA',
      '2': 'ALTA',
    }
    return obj[pri];
  }

  sortByStatus(status: any) {
    let list: Chamado[] = [];

    this.ELEMENT_DATA.forEach(item => {
      if(item.status == status) {
        list.push(item)
      }
    })

    this.FILTERED_ELEMENT_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }


  addChamadoUpdate(id: number){
    const chamado: Chamado = this.ELEMENT_DATA.find((item) => item.id === id );
    this.dataService.setChamado(chamado);
  }


}
