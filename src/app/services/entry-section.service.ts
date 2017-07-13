import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';

export interface EntryDetailsSection {
    key: SectionTypes;
    label: string;
    isActive: boolean;
    isDirty: boolean;
    hasErrors: boolean;
}

export enum SectionTypes {
    Metadata,
    Thumbnails,
    AccessControl,
    Scheduling,
    Flavors,
    Captions,
    Live,
    Related
}

export class EntryDetailsService {

    private _sections = new BehaviorSubject<{ sections: EntryDetailsSection[] }>(
        {
            sections: [
                { key: SectionTypes.Metadata, label: 'Metadata', isActive: true, isDirty: false, hasErrors: false },
                { key: SectionTypes.Thumbnails, label: 'Thumbnails', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.AccessControl, label: 'AccessControl', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.Scheduling, label: 'Scheduling', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.Flavors, label: 'Flavors', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.Captions, label: 'Captions', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.Live, label: 'Live', isActive: false, isDirty: false, hasErrors: false },
                { key: SectionTypes.Related, label: 'Related', isActive: false, isDirty: false, hasErrors: false },
            ]
        });

    public sections$ = this._sections.asObservable();

    activateSection(sectionKey: SectionTypes): void {
        // set rest of items to inactive
        this._sections.getValue().sections.forEach(x => x.isActive = false);

        // set item to active
        const section: EntryDetailsSection = this._sections.getValue().sections.find(x => x.key === sectionKey);
        section.isActive = true;

        console.log('section activated: ' + JSON.stringify(section));
    }

    updateSectionState(sectionType: SectionTypes, isDirty: boolean, hasErrors: boolean): void {

        // const newSectionsList = this._sections.getValue().sections.map(section => {
        //     if (section.key === sectionType) {
        //         return Object.assign({}, section, { isDirty, hasErrors });
        //     } else {
        //         return section;
        //     }
        // });

        // this._sections.next({ sections: newSectionsList });

        const section = this._sections.getValue().sections.find(x => x.key === sectionType);
        section.isDirty = isDirty;
        section.hasErrors = hasErrors;

        this._sections.next({ sections: this._sections.getValue().sections });
    }

    login(entryId: string, username: string, password: string): void {
        console.log(`entry ID: ${entryId}, username: ${username}, password: ${password}`);
    }
}
