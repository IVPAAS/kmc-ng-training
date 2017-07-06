import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-meta-selector',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaFormComponent {
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
  }

  onSubmit(metaData) {
    console.log(metaData);
  }

}
