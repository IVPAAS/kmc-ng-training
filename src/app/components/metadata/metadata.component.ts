import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'k-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetaDataComponent implements OnInit, OnDestroy {
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
      console.log('Form changes', data);
      this.isValid = this.metadataForm.valid;
      this.isDirty  = this.metadataForm.dirty;
    }); 
  }

  ngOnDestroy()  {
    this.metadataForm.value.unsubscribe();    
  }

  onSubmit(metaDate) {
    console.log(metaDate);
  }
}