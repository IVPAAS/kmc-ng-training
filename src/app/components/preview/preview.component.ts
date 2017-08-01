import { Component, OnInit, Input } from '@angular/core';
import { EntryDetailsService } from '../../services/entry-details.service';
import { ISubscription } from 'rxjs/Subscription';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';

@Component({
  selector: 'k-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() iframeSrc: string;
  subscription: ISubscription;
  entry: KalturaMediaEntry;

  constructor(private entryDetailsService: EntryDetailsService) { }

  ngOnInit() {
    this.subscription = this.entryDetailsService.data$.subscribe(
      (x) => {
        this.entry = x.entry
      }
    );
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}