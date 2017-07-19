import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { BaseEntryGetAction } from 'kaltura-typescript-client/types/BaseEntryGetAction';
import { KalturaBaseEntry } from 'kaltura-typescript-client/types/KalturaBaseEntry';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { environment } from '../../environments/environment';

@Injectable()
export class MetadataService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({ isBusy: false });
    public state$ = this._state.asObservable();

    private _entry = new BehaviorSubject<{ objectMetadata: KalturaBaseEntry }>({ objectMetadata: null });
    public entry$ = this._entry.asObservable();

    constructor(private _kalturaClient: KalturaClient) { }

    public getMetadata(entryId: string): void {

        if (entryId === "" && environment.entryDetails !== null) {
            entryId = environment.entryDetails.entryId;
        }
        this._state.next({ isBusy: true });
        this._entry.next({ objectMetadata: null });

        this._kalturaClient.request(new BaseEntryGetAction(
            {
                entryId,
                acceptedTypes: [KalturaMediaEntry]
            }
        )).subscribe(
            result => {
                this._state.next({ isBusy: false });
                this._entry.next({ objectMetadata: result });
                console.log(`result ${result}`);
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
                console.log(`error ${error}`);
            }
            );
    }
}

