import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() length: any;
  @Input() pageSize: any;
  @Input() pageSizeOptions: any;

  constructor() {
  }

  ngOnInit() {
  }


}
