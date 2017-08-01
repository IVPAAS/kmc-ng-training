import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(private entryDetailsService: EntryDetailsService, private _router: Router) { }

  ngOnInit() {
    this._subscriptions.push(this.entryDetailsService.data$.subscribe(
      (data) => {
        this.entry = data.entry;
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
