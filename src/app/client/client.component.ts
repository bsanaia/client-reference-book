import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ClientService} from './services/client.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteClientComponent} from './components/delete-client/delete-client.component';
import {Store} from '@ngrx/store';
import * as ClientActions from './store/client.actions';
import {slideInAnimation} from './animations/client-animations';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [slideInAnimation]
})
export class ClientComponent implements OnInit, OnDestroy {
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'gender', 'mobile', 'idNumber', 'actions'];


  constructor(private clientService: ClientService, private dialog: MatDialog, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ClientActions.GetClients());
    this.store.select('client').subscribe(clients => {
        this.dataSource = new MatTableDataSource(clients.clients);
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

  deleteClient(id) {
    this.dialog.open(DeleteClientComponent, {data: id});
  }

  ngOnDestroy(): void {
    localStorage.removeItem('sorting');
  }

}
