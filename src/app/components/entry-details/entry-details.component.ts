import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntrySectionsService } from '../../services/entry-sections.service';
import { Subscription } from 'rxjs';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { EntryDetailsService } from '../../services/entry-details.service';

@Component({
  selector: 'k-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
  providers: [EntrySectionsService],
})
export class EntryDetailsComponent implements OnInit, OnDestroy {
  mainForm: FormGroup;
  isValid: boolean;
  entrySectionsServiceSubscription: Subscription;
  entry: KalturaMediaEntry;
  metadataServiceSubscription: Subscription;


  constructor(private entrySectionsService: EntrySectionsService,
    private metadataService: EntryDetailsService) { }

  ngOnInit() {
    this.mainForm = new FormGroup({});

    this.entrySectionsServiceSubscription = this.entrySectionsService._isDataValid$.subscribe(
      (x) => {
        this.isValid = x.isValid;
      }
    );

    this.metadataServiceSubscription = this.metadataService.entry$.subscribe(
      (x) => {
        this.entry = x.entry
      }
    );
  }

  ngOnDestroy() {
    this.entrySectionsServiceSubscription.unsubscribe();
    this.metadataServiceSubscription.unsubscribe();
  }
}
