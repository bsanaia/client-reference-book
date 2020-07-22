import {Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ClientService} from './services/client.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteClientComponent} from './components/delete-client/delete-client.component';
import {Store} from '@ngrx/store';
import * as ClientActions from './store/client.actions';
import {slideInAnimation} from './animations/client-animations';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [slideInAnimation]
})
export class ClientComponent implements OnInit, OnDestroy {
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator', {static: true}) paginator: any;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'gender', 'mobile', 'idNumber', 'actions'];
  filterVal = '';
  clients: any;

  // paginator index
  pageIndex = 0;

  constructor(private clientService: ClientService, private dialog: MatDialog, private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ClientActions.GetClients());
    this.store.select('client')
      .pipe(
        map(res => {
          const clients = [];
          res.clients.forEach(client => {
            clients.push(client);
          });
          return clients;
        })
      )
      .subscribe(clients => {
        this.dataSource = new MatTableDataSource(clients);
        this.dataSource.paginator = this.paginator.paginator;
        this.clients = clients;
        this.dataSource.sort = this.sort;
        this.applyFilterPredicate();
        const sortingData = localStorage.getItem('sorting');
        if (sortingData) {
          const sorting: { active: string, direction: string } = JSON.parse(sortingData);
          this.dataSource.sort.active = sorting.active;
          this.dataSource.sort.direction = sorting.direction;
        }
        this.filterVal = localStorage.getItem('filterValue');
        if (this.filterVal) {
          this.dataSource.filter = this.filterVal.trim().toLowerCase();
        }
        const pageIndex = localStorage.getItem('pageIndex');
        if (pageIndex) {
          this.pageIndex = +pageIndex;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    localStorage.setItem('filterValue', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterPredicate() {
    this.dataSource.filterPredicate = (data: {
      name: string,
      lastName: string,
      gender: string,
      mobile: string,
      idNumber: string
    }, filter: string) => {
      const f = filter.trim().toLowerCase();
      return data.name.includes(f)
        || data.lastName.includes(f)
        || data.gender.includes(f)
        || data.mobile.includes(f)
        || data.idNumber.includes(f);
    };
  }

  onSortChange(ev) {
    localStorage.setItem('sorting', JSON.stringify(ev));
  }

  deleteClient(id) {
    this.dialog.open(DeleteClientComponent, {data: id});
  }

  onPageChange(ev) {
    this.pageIndex = ev;
    localStorage.setItem('pageIndex', `${this.pageIndex}`);
  }


  ngOnDestroy(): void {
    localStorage.removeItem('sorting');
  }

}
