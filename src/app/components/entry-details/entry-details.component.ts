import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { ISubscription } from 'rxjs/Subscription';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { EntryDetailsService } from '../../services/entry-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'k-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
  providers: [EntryDetailsService],
})
export class EntryDetailsComponent implements OnInit, OnDestroy {
  entry : KalturaMediaEntry = null;
  private _subscriptions : ISubscription[] = [];

  constructor(private entryDetailsService: EntryDetailsService, private _router: Router,  private _kalturaClient: KalturaClient) { }

  ngOnInit() {
    this._subscriptions.push(this.entryDetailsService.data$.subscribe(
      (data) => {
        if (data.entry) {
          this.entry = data.entry;
        }
      }
    ));
  }

  public backToList() : void{
    this._router.navigate(['entries']);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription =>
    {
      subscription.unsubscribe();
    });
  }
}
