import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask'; 
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()]
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(
    private service: TecnicoService, 
    private router: Router,
    private serviceData: DataService
  ) {}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Tecnico>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  addTecnicoUpdate(id: any) {
    const tecnico: Tecnico = this.ELEMENT_DATA
      .find(tec => tec.id === id);
    this.serviceData.setTecnico(tecnico);
  }
}