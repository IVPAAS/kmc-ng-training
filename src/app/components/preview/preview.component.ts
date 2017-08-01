import { Component, OnInit, Input } from '@angular/core';
import { EntryDetailsService } from '../../services/entry-details.service';
import { ISubscription } from 'rxjs/Subscription';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'k-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    public _playerSrc : string;
    private _subscriptions: ISubscription[] = [];
    entry: KalturaMediaEntry;

    constructor(private _entryDetailsService: EntryDetailsService, private _authenticationService : AuthenticationService) {
    }

    ngOnInit() {
        this._subscriptions.push(Observable.combineLatest(
            this._entryDetailsService.data$,
            this._authenticationService.userContext$
        ).subscribe(
            (values) => {
                const [entryValue, userContextValue] = values;

                if (entryValue && entryValue.entry && userContextValue) {
                    this.entry = entryValue.entry;

                    const partnerID = userContextValue.partnerId;
                    const ks = userContextValue.ks;
                    const id = entryValue.entry.id;
                    this._playerSrc = `http://cdnapi.kaltura.com/p/${partnerID}/sp/${partnerID}00/embedIframeJs/uiconf_id/38524931/partner_id/${partnerID}?iframeembed=true&flashvars[closedCaptions.plugin]=true&flashvars[EmbedPlayer.SimulateMobile]=true&&flashvars[ks]=${ks}&flashvars[EmbedPlayer.EnableMobileSkin]=true&entry_id=${id}`;
                }
            }
        ));
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}