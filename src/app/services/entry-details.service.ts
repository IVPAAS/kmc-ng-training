import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { BaseEntryGetAction } from 'kaltura-typescript-client/types/BaseEntryGetAction';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { environment } from '../../environments/environment';

@Injectable()
export class EntryDetailsService {

    private _state = new BehaviorSubject<{ isBusy: boolean, errorMessage?: string }>({ isBusy: false });
    public state$ = this._state.asObservable();

    private _entry = new BehaviorSubject<{ entry: KalturaMediaEntry }>({ entry: null });
    public entry$ = this._entry.asObservable();

    constructor(private _kalturaClient: KalturaClient) { }

    public getMetadata(entryId: string): void {

        if (entryId === "" && environment.entryDetails !== null) {
            entryId = environment.entryDetails.entryId;
        }
        this._state.next({ isBusy: true });
        this._entry.next({ entry: null });

        this._kalturaClient.request(new BaseEntryGetAction(
            {
                entryId,
                acceptedTypes: [KalturaMediaEntry]
            }
        )).subscribe(
            result => {
                if (result instanceof KalturaMediaEntry) {
                    this._state.next({ isBusy: false });
                    this._entry.next({ entry: result });
                    console.log(`result ${result}`);
                }
                else {
                    this._state.next({ isBusy: false, errorMessage: "result is not a KalturaMediaEntry" });
                    console.log(`error`);
                }
            },
            error => {
                this._state.next({ isBusy: false, errorMessage: error.message });
                console.log(`error ${error}`);
            }
            );
    }
}

