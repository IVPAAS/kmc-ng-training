import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-meta-selector',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl({ value: '1234', disabled: true }),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      description: new FormControl('description'),
      referenceId: new FormControl('reference id')
    });

    // bind on change
    this.form.valueChanges.subscribe(data => {
      console.log('is dirty: ' + this.form.dirty);
      console.log('is valid: ' + this.form.valid);
    });
  }



  onSubmit(metaData) {
    console.log(metaData);
  }
}
