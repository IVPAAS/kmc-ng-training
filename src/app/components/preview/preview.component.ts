import { Component, OnInit, OnDestroy } from '@angular/core';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { EntryDetailsService } from '../../services/entry-details.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-preview-selector',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnDestroy, OnInit {
  metaDetailsSubscription: Subscription;
  entry: KalturaMediaEntry;

  constructor(private detailsService: EntryDetailsService) {
  }

  ngOnInit() {

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
  }

   ngOnDestroy() {
    this.metaDetailsSubscription.unsubscribe();
  }
}
