import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ClientService} from './services/client.service';
import {ClientModel} from './models/client.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'Name', 'LastName', 'Gender', 'Mobile', 'IDNumber', 'actions'];


  constructor(private clientService: ClientService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients: ClientModel[]) => {
      console.log(clients);
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.sort = this.sort;
      const sortingData = localStorage.getItem('sorting');
      if (sortingData) {
        const sorting: {active: string, direction: string} = JSON.parse(sortingData);
        this.dataSource.sort.active = sorting.active;
        this.dataSource.sort.direction = sorting.direction;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSortChange(ev) {
    localStorage.setItem('sorting', JSON.stringify(ev));
  }

  ngOnDestroy(): void {
    localStorage.removeItem('sorting');
  }

}
