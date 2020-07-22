import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() length: any;
  @Input() pageSize: any;
  @Input() pageSizeOptions: any;
  @Input() pageIndex = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() pageChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  pageChanged(ev) {
    this.pageChangedEvent.emit(ev.pageIndex);
  }

}
