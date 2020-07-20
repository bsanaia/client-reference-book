import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.css']
})
export class PhotoUploaderComponent implements OnInit {

  @Output() photoUploaded: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photoUploaded.emit({name: file.name, base64Img: reader.result});
    };
  }

}
