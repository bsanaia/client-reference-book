import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userId: string,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    console.log(this.userId);
  }

  deleteClient() {
    this.clientService.deleteClient(this.userId).subscribe();

  }

}
