import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { KalturaClient } from '@kaltura-ng/kaltura-client';
import { BaseEntryGetAction } from 'kaltura-typescript-client/types/BaseEntryGetAction';
import { KalturaMediaEntry } from 'kaltura-typescript-client/types/KalturaMediaEntry';
import { AuthenticationService } from './authentication.service';
import { EntryDetailsSections } from './entry-section-types';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

export interface SectionItem {
    key: EntryDetailsSections;
    label: string;
    isActive: boolean;
    isDirty: boolean;
    allowed : boolean;
    hasErrors: boolean;
}

export interface DataState
{   isBusy: boolean,
    isValid : boolean,
    isDirty : boolean,
    errorMessage?: string
}

@Injectable()
export class EntryDetailsService implements OnDestroy {

    private _state = new BehaviorSubject<DataState>({isBusy: false, isValid : true, isDirty : false});
    public state$ = this._state.asObservable();

    private _data = new BehaviorSubject<{ entry: KalturaMediaEntry }>({entry: null});
    public data$ = this._data.asObservable();
    private _subscriptions : ISubscription[] = [];
    private _sections = new BehaviorSubject<SectionItem[]>(
        [
            { key: EntryDetailsSections.Metadata, label: EntryDetailsSections[EntryDetailsSections.Metadata], isActive: true, isDirty: false, hasErrors: false, allowed : true },
            { key: EntryDetailsSections.Thumbnails, label: EntryDetailsSections[EntryDetailsSections.Thumbnails], isActive: false, isDirty: false, hasErrors: false, allowed : false },
            { key: EntryDetailsSections.Captions, label: EntryDetailsSections[EntryDetailsSections.Captions], isActive: false, isDirty: false, hasErrors: false, allowed : false }
        ]
    );
    public sections$ = this._sections.asObservable();



    constructor(private _kalturaClient: KalturaClient, private _authenticationService: AuthenticationService, private _activatedRoute : ActivatedRoute, private _router: Router) {
        this._onRouterEvents();
    }

    private _onRouterEvents() : void {
        this._subscriptions.push(this._router.events
            .subscribe(
                event => {
                    if (event instanceof NavigationEnd) {

                        // we must defer the loadEntry to the next event cycle loop to allow components
                        // to init them-selves when entering this module directly.
                        setTimeout(() =>
                        {
                            const currentEntryId = this._activatedRoute.snapshot.params.id;
                            this._load(currentEntryId);
                        });
                    }
                }
            ));
    }

    private _load(entryId: string): void {
        const currentEntry = this._data.getValue().entry;
        if (!currentEntry || currentEntry.id !== entryId) {
            this._updateState({isBusy: true});
            this._data.next({entry: null});

            this._kalturaClient.request(new BaseEntryGetAction(
                {
                    entryId,
                    acceptedTypes: [KalturaMediaEntry]
                }
            )).subscribe(
                result => {
                    if (result instanceof KalturaMediaEntry) {
                        this._updateState({isBusy: false});
                        this._data.next({entry: result});
                    }
                    else {
                        this._updateState({isBusy: false, errorMessage: "result is not a KalturaMediaEntry"});
                    }
                },
                error => {
                    this._updateState({isBusy: false, errorMessage: error.message});
                }
            );
        }
    }

    private _updateState(state : Partial<DataState>) : void{
        const newState = Object.assign(this._state.getValue(),state);
        this._state.next(newState);
    }

    public updateSectionState(sectionType: EntryDetailsSections, isDirty: boolean, hasErrors: boolean): void {

        const sections = this._sections.getValue();
        const section = sections.find(x => x.key === sectionType);

        if (section) {
            section.isDirty = isDirty;
            section.hasErrors = hasErrors;

            const formIsDirty = sections.reduce((result,item) => {
                return result || item.isDirty
            }, false);

            const formHasErrors = sections.reduce((result,item) => {
                return result || item.hasErrors
            }, false);


            this._updateState({isValid: formHasErrors, isDirty : formIsDirty});
            this._sections.next(sections);
        }
    }

    ngOnDestroy() {
        this._subscriptions.forEach(subscription =>
        {
            subscription.unsubscribe();
        });
    }
}

