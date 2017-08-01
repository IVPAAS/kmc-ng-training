import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { EntriesService } from '../../services/entries.service';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { Router } from '@angular/router';

@Component({
  selector: 'k-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
  providers: [EntriesService],
})
export class EntriesListComponent implements OnInit, OnDestroy {
  private _subscriptions : ISubscription[] = [];
  public _blockerMessage : AreaBlockerMessage;
  public entries : KalturaMediaEntry[];
  public totalEntriesCount : number;
  public showLoading : boolean = false;

  constructor(public _entriesService: EntriesService, private _router: Router) { }

  ngOnInit() {
    this._subscriptions.push(this._entriesService.entries$.subscribe(
        data =>
        {
          this.entries = data.items;
          this.totalEntriesCount = data.totalCount;
        })
    );

    this._subscriptions.push(this._entriesService.state$.subscribe(
        state =>
        {
          this.showLoading = state.loading;

          if (state.errorMessage)
          {
             this._blockerMessage = new AreaBlockerMessage({
               message : state.errorMessage,
               buttons : [ {
                 label : 'retry',
                 action: () =>
                 {
                   this._entriesService.reload();
                 }
               }]
             }
             );
          }else {
            this._blockerMessage = null;
          }
        })
    );
  }

  public _reload() : void{
    this._entriesService.reload();
  }

  public openEntry(id : string) : void
  {
    this._router.navigate(['entry',id]);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription =>
    {
      subscription.unsubscribe();
    });
  }
}
