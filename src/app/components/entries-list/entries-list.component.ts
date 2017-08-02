import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { EntriesService } from '../../services/entries.service';
import { AreaBlockerMessage } from '@kaltura-ng/kaltura-ui';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KalturaBaseEntryListResponse } from 'kaltura-typescript-client/types/KalturaBaseEntryListResponse';
import { KalturaResponseProfileType } from 'kaltura-typescript-client/types/KalturaResponseProfileType';
import { KalturaFilterPager } from 'kaltura-typescript-client/types/KalturaFilterPager';
import { KalturaClient } from '@kaltura-ng/kaltura-client';

// Task 1.1 - import the service type that is used to get list of entries

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

    // Task 2.1 - remove this assignment used in previous workshop
    this._kalturaClient.ks = 'djJ8MjA1MjM3MXwMSq6OpJjTQU6himLjSENOqn06lgjsxocILKZ_dXDY7gEHd4vVLuu1ueeK5YGDkMl32p0_JrjmzbWHTkJZz8yP-ChsH7LSejQ6NNli8yN96q7AksRDPMfbDTQmADq2N6E=';


    // Task 4.2 - subscribe to EntriesService entries$ changes and update component properties

    // Task 4.2 (advanced) - subscribe to EntriesService state$ changes to show loading and handle errors

    // Task 4.2 - reomve this line (the service should execute the inital loading as part of its' initialization
    this._reload();
  }

  private buildQueryRequest(): Observable<KalturaBaseEntryListResponse> {

    // Task 4.2 - move this function to the EntriesService

    // Task 1.1 - use 'this._kalturaClient' to execute service BaseEntry Action List with default filter/pager
    // dont forget to handle errors(!)
    return Observable.throw(new Error('missing implementation'));


    // Task 1.2 - use property 'acceptedTypes' on the action class support KalturaMediaEntry objects

    // Task 1.3 - use 'KalturaDetachedResponseProfile' with the provided properties to reduce payload from the server
    // check the network to better understand the requirement
    // class: KalturaDetachedResponseProfile
    //      property type: KalturaResponseProfileType.includeFields,
    //      property fields: 'id,name,thumbnailUrl,mediaType,plays,createdAt,duration,status,startDate,endDate,moderationStatus,tags,categoriesIds,downloadUrl'
    //

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

          // Task 1.2 - use Array.find to get first entry which is not of type KalturaMediaEntry
          const invalidEntry = null;

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
