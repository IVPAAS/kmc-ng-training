import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetadataService } from '../../services/metadata.service';
import { Subscription } from 'rxjs';
import { KalturaBaseEntry } from 'kaltura-typescript-client/types/KalturaBaseEntry';

@Component({
  selector: 'k-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  subscription: Subscription;
  baseEntry: KalturaBaseEntry;

  constructor(private metadataService: MetadataService) { }

  ngOnInit() {
    this.subscription = this.metadataService.entry$.subscribe(
      (x) => {
        this.baseEntry = x.objectMetadata
      }
    );
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}