import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'k-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetaDataComponent implements OnInit {
  metadataForm: FormGroup;
  isValid: boolean;
  isDirty: boolean;

  ngOnInit() {
    this.metadataForm = new FormGroup(
      {
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl(),
        referenceID: new FormControl()
      });

    this.metadataForm.valueChanges.subscribe(data => {      
      this.isDirty = this.metadataForm.dirty;
    });

    this.metadataForm.statusChanges.subscribe(data => {      
      this.isValid = this.metadataForm.valid;
    });
  }

  onSubmit(metaDate) {
    console.log(metaDate);
  }
}