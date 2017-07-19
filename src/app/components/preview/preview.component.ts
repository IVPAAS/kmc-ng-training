import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntryDetailsService } from '../../services/entry-details.service';
import { Subscription } from 'rxjs';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';

@Component({
  selector: 'k-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  subscription: Subscription;
  entry: KalturaMediaEntry;

  constructor(private metadataService: EntryDetailsService) { }

  ngOnInit() {
    this.subscription = this.metadataService.entry$.subscribe(
      (x) => {
        this.entry = x.entry
      }
    );
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}