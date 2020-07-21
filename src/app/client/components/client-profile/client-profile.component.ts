import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ClientFormBuilderService} from '../../forms/client-form-builder.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-300px)'}),
        animate('200ms', style({opacity: 1, transform: 'none'}))
      ])
    ])
  ]
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
      this.clientForm.setValue(userData.client.payload);
      console.log(this.clientForm);
    });
  }

}
