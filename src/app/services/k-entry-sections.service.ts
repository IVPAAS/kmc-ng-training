import { Injectable } from '@angular/core';

const SECTIONS: string[] = ["Metadata", "Thumbnails", "AccessControl", "Scheduling", "Flavors", "Captions", "Live", "Related", "Clips", "Users"];

@Injectable()
export class kEntrySectionsService {
    getSections(): SectionItem[] {
        var sectionItems: SectionItem[] = [];
        for (var i = 0; i <= SECTIONS.length; i++) {
            sectionItems.push({ isActive: false, key: i, label: SECTIONS[i] });
        }
        return sectionItems;
    }
}

export interface SectionItem {
    isActive: boolean;
    key: number;
    label: string;
}
