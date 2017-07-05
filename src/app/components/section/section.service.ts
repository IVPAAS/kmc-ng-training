export class EntryDetailsService {
    get() {
        return this.sections;
    }

    activateSection(section) {
        // set rest of items to inactive
        this.sections.forEach(x => x.IsActive = false);

        // set item to active
        section.IsActive = true;
        console.log(this.sections)
    }

    sections: ISection[] = [
        { Id: 0, Label: 'Metadata', IsActive: false },
        { Id: 1, Label: 'Thumbnails', IsActive: false },
        { Id: 2, Label: 'AccessControl', IsActive: false },
        { Id: 3, Label: 'Scheduling', IsActive: false },
        { Id: 4, Label: 'Flavors > Type', IsActive: false },
        { Id: 5, Label: 'Captions', IsActive: false },
        { Id: 6, Label: 'Live', IsActive: false },
        { Id: 7, Label: 'Related', IsActive: false }
    ];
}

export interface ISection {
    IsActive: boolean;
    Id: number;
    Label: string;
}
