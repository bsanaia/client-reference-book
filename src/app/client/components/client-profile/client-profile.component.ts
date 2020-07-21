import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ClientFormBuilderService} from '../../forms/client-form-builder.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  clientForm: FormGroup;
  userId: number;

  constructor(private activatedRoute: ActivatedRoute, private clientFormBuilder: ClientFormBuilderService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((userData: any) => {
      this.userId = userData.client.id;
      delete userData.client.id;
      this.clientForm = this.clientFormBuilder.buildForm();
      this.clientForm.setValue(userData.client);
      console.log(this.clientForm);
    });
  }

}
