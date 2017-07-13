import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SECTIONS: string[] = ["Metadata", "Thumbnails", "AccessControl", "Scheduling", "Flavors", "Captions", "Live", "Related", "Clips", "Users"];

export interface SectionItem {
    key: SectionTypes;
    label: string;
    isActive: boolean;
    isDirty: boolean;
    hasErrors: boolean;
}

export enum SectionTypes {
    Metadata,
    Thumbnails,
    Captions
}

@Injectable()
export class EntrySectionsService {
    private _isDataValid = new BehaviorSubject<{ isValid: boolean }>({
        isValid: true
    });
    private _sections = new BehaviorSubject<{ sectionItems: SectionItem[] }>({
        sectionItems: [
            { key: SectionTypes.Metadata, label: SectionTypes[SectionTypes.Metadata], isActive: true, isDirty: false, hasErrors: false },
            { key: SectionTypes.Thumbnails, label: SectionTypes[SectionTypes.Thumbnails], isActive: false, isDirty: false, hasErrors: false },
            { key: SectionTypes.Captions, label: SectionTypes[SectionTypes.Captions], isActive: false, isDirty: false, hasErrors: false }
        ]
    });

    public sections$ = this._sections.asObservable();
    public _isDataValid$ = this._isDataValid.asObservable();

    public updateSectionState(sectionType: SectionTypes, isDirty: boolean, hasErrors: boolean): void {
        
        const newSection = this._sections.getValue().sectionItems.find(x => x.key === sectionType);
        
        newSection.isDirty = isDirty;
        newSection.hasErrors = hasErrors;
        
        this._isDataValid.next({ isValid: hasErrors });
        this._sections.next({ sectionItems: this._sections.getValue().sectionItems });
    }
}

