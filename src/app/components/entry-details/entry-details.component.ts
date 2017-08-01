import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { EntryDetailsService } from '../../services/entry-details.service';

@Component({
  selector: 'k-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
  providers: [EntryDetailsService],
})
export class EntryDetailsComponent implements OnInit, OnDestroy {
  entry : KalturaMediaEntry = null;
  private _subscriptions : ISubscription[] = [];

  constructor(private entryDetailsService: EntryDetailsService) { }

  ngOnInit() {
    this._subscriptions.push(this.entryDetailsService.data$.subscribe(
      (data) => {
        this.entry = data.entry;
      }
    ));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription =>
    {
      subscription.unsubscribe();
    });
  }
}
