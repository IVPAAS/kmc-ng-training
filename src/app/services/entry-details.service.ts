import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { BaseEntryGetAction } from 'kaltura-typescript-client/types/BaseEntryGetAction';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { environment } from '../../environments/environment';


@Injectable()
export class EntryDetailsService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({ isBusy: false });
    public state$ = this._state.asObservable();

    private _objectMetaData = new BehaviorSubject<{ entry: KalturaMediaEntry }>({ entry: null });
    public objectMetaData$ = this._objectMetaData.asObservable();

    constructor(private _kalturaClient: KalturaClient) {
    }

    get(entryID: string): void {

        this._state.next({ isBusy: true });
        this._objectMetaData.next({ entry: null });

        // get KS for environment incase local mode
        if (environment.ks.length > 0 && environment.entryDetails.entryId.length > 0) {
            entryID = environment.entryDetails.entryId;
        }

        this._kalturaClient.request(new BaseEntryGetAction({ entryId: entryID }
        )).subscribe(
            result => {
                if (result instanceof KalturaMediaEntry) {
                    this._state.next({ isBusy: false });
                    this._objectMetaData.next({ entry: result });
                    // console.log(`received entry details: ${JSON.stringify(result)}`);
                } else {
                    console.log(`result is not instance of KalturaMediaEntry`);
                }
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
                console.log(`error while trying to receive entry details: ${error}`);
            }
            );
    }
}
