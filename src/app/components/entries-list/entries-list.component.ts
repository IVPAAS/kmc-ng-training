import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { EntriesService } from '../../services/entries.service';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KalturaBaseEntryListResponse } from 'kaltura-typescript-client/types/KalturaBaseEntryListResponse';
import { KalturaMediaEntryFilter } from 'kaltura-typescript-client/types/KalturaMediaEntryFilter';
import { KalturaDetachedResponseProfile } from 'kaltura-typescript-client/types/KalturaDetachedResponseProfile';
import { KalturaResponseProfileType } from 'kaltura-typescript-client/types/KalturaResponseProfileType';
import { KalturaFilterPager } from 'kaltura-typescript-client/types/KalturaFilterPager';
import { BaseEntryListAction } from 'kaltura-typescript-client/types/BaseEntryListAction';
import { KalturaLiveStreamAdminEntry } from 'kaltura-typescript-client/types/KalturaLiveStreamAdminEntry';
import { KalturaLiveStreamEntry } from 'kaltura-typescript-client/types/KalturaLiveStreamEntry';
import { KalturaClient } from '@kaltura-ng/kaltura-client';

// Task 4.2 - register service EntriesService in component providers

@Component({
  selector: 'k-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
  providers: [],
})
export class EntriesListComponent implements OnInit, OnDestroy {
  private _subscriptions : ISubscription[] = [];
  public _blockerMessage : AreaBlockerMessage;
  public entries : KalturaMediaEntry[];
  public _isLoading = false;
  public totalEntriesCount : number;
  public showLoading : boolean = false;

  constructor(/*public _entriesService: EntriesService,*/ private _router: Router, private _kalturaClient : KalturaClient) { }

  ngOnInit() {

    // Task 4.2 - subscribe to EntriesService entries$ changes and update component properties

    // Task 4.2 (advanced) - subscribe to EntriesService state$ changes to show loading and handle errors

    // Task 4.2 - reomve this line (the service should execute the inital loading as part of its' initialization
    this._reload();
  }

  private buildQueryRequest(): Observable<KalturaBaseEntryListResponse> {

    // Task 4.2 - move this function to the EntriesService
    try {
      let filter: KalturaMediaEntryFilter = new KalturaMediaEntryFilter({});
      let responseProfile: KalturaDetachedResponseProfile = new KalturaDetachedResponseProfile({
        type: KalturaResponseProfileType.includeFields,
        fields: 'id,name,thumbnailUrl,mediaType,plays,createdAt,duration,status,startDate,endDate,moderationStatus,tags,categoriesIds,downloadUrl'
      });
      let pager: KalturaFilterPager = null;

      // build the request
      return <any>this._kalturaClient.request(
          new BaseEntryListAction({
            filter,
            pager,
            responseProfile,
            acceptedTypes: [KalturaLiveStreamAdminEntry, KalturaLiveStreamEntry, KalturaMediaEntry]
          })
      )
    } catch (err) {
      return Observable.throw(err);
    }

  }

  public _reload() : void{
    // Task 4.2 - move the 'buildQueryRequest' method from the component to the service and execute function 'reload()' of 'EntriesService' instead
    // note - the subscribe is not relevant any here anymore but you can use it in the 'OnInit' method
    // once the server emit state$ changes.

    this._isLoading = true;
    this._blockerMessage = null;
    this.buildQueryRequest()
        .subscribe(
        response =>
        {
          this._isLoading = false;
          const invalidEntry = response.objects.find(entry => !(entry instanceof KalturaMediaEntry));

          if (invalidEntry)
          {
            throw new Error('invalid entry retrieved');
          }else {
            // NOTICE: you should cast types to workaround typescript issues unless you did the relevant checks
            this.entries = <KalturaMediaEntry[]>response.objects;
            this.totalEntriesCount = response.totalCount;
          }
        },
            reason =>
            {
              this._isLoading = false;
              this._showLoadingError(reason.message);
              console.error(reason.message);
            }
    )
  }

  private _showLoadingError(message : string) : void{
    this._blockerMessage = new AreaBlockerMessage({
          message : message,
          buttons : [ {
            label : 'retry',
            action: () =>
            {
              this._reload();
            }
          }]
        }
    );
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
