import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EntryDetailsService, SectionTypes, sum, multiply, pi } from '../../services/entry-section.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-meta-selector',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaFormComponent implements OnInit {
  form: FormGroup;

  constructor(private sectionItemService: EntryDetailsService) {
  }

  ngOnInit() {

    // create form and validation
    this.form = new FormGroup({
      id: new FormControl({ value: '1234', disabled: true }),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      description: new FormControl(),
      referenceId: new FormControl()
    });

    // bind on change to update section service
    this.form.valueChanges.subscribe(
      (data) => {
        this.sectionItemService.updateSectionState(SectionTypes.Metadata, this.form.dirty, this.form.valid);
      });
  }

  onSubmit(metaData) {
    console.log(metaData);
  }
}
