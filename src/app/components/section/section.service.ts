export class EntryDetailsService {

    sections: EntryDetailsSection[] = [
        { id: 0, label: 'Metadata', isActive: false },
        { id: 1, label: 'Thumbnails', isActive: false },
        { id: 2, label: 'AccessControl', isActive: false },
        { id: 3, label: 'Scheduling', isActive: false },
        { id: 4, label: 'Flavors', isActive: false },
        { id: 5, label: 'Captions', isActive: false },
        { id: 6, label: 'Live', isActive: false },
        { id: 7, label: 'Related', isActive: false }
    ];

    get() {
        return this.sections;
    }

    activateSection(section) {
        // set rest of items to inactive
        this.sections.forEach(x => x.isActive = false);

        // set item to active
        section.isActive = true;
        console.log(this.sections)
    }
}

export interface EntryDetailsSection {
    isActive: boolean;
    id: number;
    label: string;
}
