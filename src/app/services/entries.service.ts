import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { KalturaBaseEntryListResponse } from 'kaltura-typescript-client/types/KalturaBaseEntryListResponse';
import { KalturaDetachedResponseProfile } from 'kaltura-typescript-client/types/KalturaDetachedResponseProfile';
import { KalturaFilterPager } from 'kaltura-typescript-client/types/KalturaFilterPager';
import { KalturaMediaEntryFilter } from 'kaltura-typescript-client/types/KalturaMediaEntryFilter';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { KalturaResponseProfileType } from 'kaltura-typescript-client/types/KalturaResponseProfileType';
import { BaseEntryListAction } from 'kaltura-typescript-client/types/BaseEntryListAction';

import { KalturaClient } from '@kaltura-ng/kaltura-client';

import { KalturaLiveStreamAdminEntry } from 'kaltura-typescript-client/types/KalturaLiveStreamAdminEntry';
import { KalturaLiveStreamEntry } from 'kaltura-typescript-client/types/KalturaLiveStreamEntry';

export type UpdateStatus = {
    loading : boolean;
    errorMessage : string;
};

export interface Entries{
    items : KalturaMediaEntry[],
    totalCount : number
}

@Injectable()
export class EntriesService implements OnDestroy {

    private _entries = new BehaviorSubject({items: [], totalCount: 0});
    private _state = new BehaviorSubject<UpdateStatus>({loading: false, errorMessage: null});
    private _entriesExecuteSubscription: ISubscription;
    public state$ = this._state.asObservable();
    public entries$ = this._entries.asObservable();

    constructor(private _kalturaClient: KalturaClient) {
        this.reload();
    }

    ngOnDestroy() {
        this._state.complete();
        this._entries.complete();
        if (this._entriesExecuteSubscription) {
            this._entriesExecuteSubscription.unsubscribe();
        }
    }

    public reload(): void {
        this._executeQuery();
    }

    private _executeQuery(): void {
        // cancel previous requests
        if (this._entriesExecuteSubscription) {
            this._entriesExecuteSubscription.unsubscribe();
            this._entriesExecuteSubscription = null;
        }

        this._entries.next({
            items: [],
            totalCount: 0
        });

        this._state.next({loading: true, errorMessage: null});

        // execute the request
        this._entriesExecuteSubscription = this.buildQueryRequest().subscribe(
            response => {
                this._entriesExecuteSubscription = null;

                this._state.next({loading: false, errorMessage: null});

                this._entries.next({
                    items: <any[]>response.objects,
                    totalCount: <number>response.totalCount
                });
            },
            error => {
                this._entriesExecuteSubscription = null;
                this._state.next({loading: false, errorMessage: (<Error>error).message || <string>error});
            });
    }

    private buildQueryRequest(): Observable<KalturaBaseEntryListResponse> {

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
                    acceptedTypes: [KalturaLiveStreamAdminEntry, KalturaLiveStreamEntry]
                })
            )
        } catch (err) {
            return Observable.throw(err);
        }

    }
}

