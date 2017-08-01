import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { EntryDetailsService } from '../../services/entry-details.service';
import { ISubscription } from 'rxjs/Subscription';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { EntryDetailsSections } from '../../services/entry-section-types';

@Component({
  selector: 'k-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetaDataComponent implements OnInit , OnDestroy{
  metadataForm: FormGroup;
  private _subscriptions : ISubscription[] = [];
  entry: KalturaMediaEntry;

  constructor(private _fb : FormBuilder,
    private entryDetailsService: EntryDetailsService) {
      this.metadataForm = this._fb.group(
          {
              name: ['', Validators.required],
              description: [null],
              referenceID: [null]
          });

  }

  ngOnInit() {

    this._subscriptions.push(this.metadataForm.statusChanges.subscribe(data => {
      this.entryDetailsService.updateSectionState(EntryDetailsSections.Metadata, this.metadataForm.dirty, this.metadataForm.valid);
    }));

    this._subscriptions.push(this.entryDetailsService.data$.subscribe(
      (data) => {
          if (data && data.entry) {
              this.metadataForm.reset(data.entry);
          }
      }
    ));
  }

   ngOnDestroy() {
       this._subscriptions.forEach(subscription =>
       {
           subscription.unsubscribe();
       });
  }

  onSubmit(metaDate) {

  }
}