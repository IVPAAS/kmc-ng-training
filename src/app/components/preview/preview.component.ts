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

    constructor(private _entryDetailsService: EntryDetailsService/*, private _authenticationService : AuthenticationService*/) {
    }

    ngOnInit() {
        // Task 4.30 - subscribe to EntryDetailsService to component properties
        // tip  if you are not sure how to do so, you can find a similar implementation
        // in file entry-details.component

        // Task 4.30 (advanced) - using Observable.combineLatest to initialize both the entry and the player src
        // use function '_getPlayerSrc' to build the player uri
    }

    private _getPlayerSrc(partnerID : string, ks : string, id : string) : string{
        return `http://cdnapi.kaltura.com/p/${partnerID}/sp/${partnerID}00/embedIframeJs/uiconf_id/38524931/partner_id/${partnerID}?iframeembed=true&flashvars[closedCaptions.plugin]=true&flashvars[EmbedPlayer.SimulateMobile]=true&&flashvars[ks]=${ks}&flashvars[EmbedPlayer.EnableMobileSkin]=true&entry_id=${id}`;
    }
    ngOnDestroy() {
        this._subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}