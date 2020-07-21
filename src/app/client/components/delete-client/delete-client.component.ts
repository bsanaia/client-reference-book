import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientService} from '../../services/client.service';
import {Store} from '@ngrx/store';
import * as ClientActions from '../../store/client.actions';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userId: string,
              private dialogRef: MatDialogRef<DeleteClientComponent>,
              private clientService: ClientService,
              private store: Store<any>) {
  }

  ngOnInit(): void {
    console.log(this.userId);
  }

  deleteClient() {
    this.store.dispatch(new ClientActions.DeleteClient(+this.userId));
    this.dialogRef.close();
    // this.clientService.deleteClient(this.userId).subscribe();
  }

}
