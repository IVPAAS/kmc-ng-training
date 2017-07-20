import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntrySectionsService, EntryDetailsSection } from '../../services/entry-section.service';
import { EntryDetailsService } from '../../services/entry-details.service';
import { Subscription } from 'rxjs';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';


@Component({
  selector: 'app-main-entry-selector',
  templateUrl: './main-entry.component.html',
  styleUrls: ['./main-entry.component.scss']
})
export class MainEntryComponent implements OnDestroy, OnInit {
  subscriptionFormDirty: Subscription;
  metaDetailsSubscription: Subscription;
  entry: KalturaMediaEntry;
  saveButtonDisabled: Boolean = true;

  constructor(private sectionItemService: EntrySectionsService,
    private detailsService: EntryDetailsService) {
  }

  ngOnInit() {

    // get entry TODO: should be received from routing
    this.detailsService.get('1_cgfsc7bt');

    // subscribe to entry data
    this.metaDetailsSubscription = this.detailsService.objectMetaData$.subscribe(
      (value) => {
        if (value.entry !== null) {
          this.entry = value.entry;
        }
      },
      (e) => {
        console.log(`received error: ${e}`);
      }
    );

    // subscribe to form dirty event to enable/disable save button
    this.subscriptionFormDirty = this.sectionItemService.sections$.subscribe(
      (value) => {
        if (value.sections.find(x => x.isDirty) === undefined) {
          // disable button
          this.saveButtonDisabled = true;
        } else {
          // enable button
          this.saveButtonDisabled = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscriptionFormDirty.unsubscribe();
    this.metaDetailsSubscription.unsubscribe();
  }
}
