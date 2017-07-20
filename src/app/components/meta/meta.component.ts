import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EntrySectionsService, SectionTypes } from '../../services/entry-section.service';
import { EntryDetailsService } from '../../services/entry-details.service';
import { LoginService } from '../../services/login.service';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';

@Component({
  selector: 'app-meta-selector',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaFormComponent implements OnDestroy, OnInit {
  form: FormGroup;
  metaDetails: Subscription;
  entry: KalturaMediaEntry;

  constructor(private sectionItemService: EntrySectionsService,
    private detailsService: EntryDetailsService,
    private loginService: LoginService) {
  }

  ngOnInit() {

    // create form and validation
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
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

    // subscribe to entry data
    this.metaDetails = this.detailsService.objectMetaData$.subscribe(
      (value) => {
        if (value.entry !== null) {
          this.entry = value.entry;
          this.updateMetaFormData();
        }
      },
      (e) => {
        console.log(`received error: ${e}`);
      }
    );
  }

  // update form data according to service result
  updateMetaFormData() {
    this.form.patchValue({
      id: this.entry.id,
      name: this.entry.name,
      description: this.entry.description,
      referenceId: this.entry.referenceId
    });
  }

  onSubmit(metaData) {
    console.log(metaData);
  }

  ngOnDestroy() {
    this.metaDetails.unsubscribe();
  }
}
