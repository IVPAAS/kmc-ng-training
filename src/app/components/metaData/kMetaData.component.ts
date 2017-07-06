import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kMetaData',
  templateUrl: './kMetaData.component.html',
  styleUrls: ['./kMetaData.component.scss']
})
export class kMetaDataComponent {
  form;

  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl(),
        description: new FormControl(),
        referenceID: new FormControl()
      });
  }

  onSubmit(metaDate) {
    console.log(metaDate);
  }
}