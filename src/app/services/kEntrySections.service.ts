import { Injectable } from '@angular/core';

const SECTIONS: string[] = ["Metadata", "Thumbnails", "AccessControl", "Scheduling", "Flavors", "Captions", "Live", "Related", "Clips", "Users"];

@Injectable()
export class kEntrySectionsService {
    getSections(): SectionItem[] {
        let sectionItems: SectionItem[] = [];
        let index = 0;
        SECTIONS.forEach(element => {
            sectionItems.push({ isActive: false, key: index, label: SECTIONS[index] });
            index++;
        });
                
        sectionItems[0].isActive = true;
        return sectionItems;
    }
}

export interface SectionItem {
    isActive: boolean;
    key: number;
    label: string;
}
