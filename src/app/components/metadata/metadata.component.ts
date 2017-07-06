import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'k-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetaDataComponent {
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