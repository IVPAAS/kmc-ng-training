import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrySectionsService } from '../../services/entry-sections.service';
import { SectionTypes } from '../../services/entry-sections.service';
import { EntryDetailsService } from '../../services/entry-details.service';
import { Subscription } from 'rxjs';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';

@Component({
  selector: 'k-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetaDataComponent implements OnInit , OnDestroy{
  metadataForm: FormGroup;
  isValid: boolean;
  isDirty: boolean;
  entryId: string;
  subscription: Subscription;
  entry: KalturaMediaEntry;

  constructor(private entrySectionsService: EntrySectionsService,
    private metadataService: EntryDetailsService) { }

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

    this.metadataForm.valueChanges.subscribe(data => {
      this.isValid = this.metadataForm.valid;
    });

    this.metadataForm.statusChanges.subscribe(data => {
      this.entrySectionsService.updateSectionState(SectionTypes.Metadata, this.metadataForm.dirty, this.metadataForm.valid);
    });

    this.subscription = this.metadataService.entry$.subscribe(
      (x) => {
        this.entry = x.entry
      }
    );
    
    this.metadataService.getMetadata("");

  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(metaDate) {
    console.log(metaDate);
  }
}