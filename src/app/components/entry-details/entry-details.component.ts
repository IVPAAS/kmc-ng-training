import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
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
  public iframeSrc: string = "";

  constructor(private entryDetailsService: EntryDetailsService, private _router: Router, private _authenticationService: AuthenticationService,  private _kalturaClient: KalturaClient) { }

  ngOnInit() {
    this._subscriptions.push(this.entryDetailsService.data$.subscribe(
      (data) => {
        if (data.entry) {
          const partnerID = '1645161'; // TODO get from UserContext and convert to string
          const ks = this._kalturaClient.ks;
          this.entry = data.entry;
          const id = this.entry.id;
          this.iframeSrc = `http://cdnapi.kaltura.com/p/${partnerID}/sp/${partnerID}00/embedIframeJs/uiconf_id/38524931/partner_id/${partnerID}?iframeembed=true&flashvars[closedCaptions.plugin]=true&flashvars[EmbedPlayer.SimulateMobile]=true&&flashvars[ks]=${ks}&flashvars[EmbedPlayer.EnableMobileSkin]=true&entry_id=${id}`;
        }
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
