import { Component } from '@angular/core';

@Component({
  selector: 'aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})

export class AsideLeftComponent {

  sections = SECTIONS;

  selectedSection: SectionItem;

  onSelect(section: SectionItem): void {
    this.selectedSection = section;
    this.selectedSection.isActive = true;
  }
}
export class SectionItem {
  isActive: boolean;
  key: number;
  label: string;
}

const SECTIONS: SectionItem[] = [
  {
    isActive: true,
    key: 1,
    label: 'Metadata'
  },
  {
    isActive: false,
    key: 2,
    label: "Thumbnails"
  },
  {
    isActive: false,
    key: 3,
    label: "AccessControl"
  },
  {
    isActive: false,
    key: 4,
    label: "Scheduling"
  },
  {
    isActive: false,
    key: 5,
    label: "Flavors"
  },
  {
    isActive: false,
    key: 6,
    label: "Live"
  },
  {
    isActive: false,
    key: 6,
    label: "Captions"
  },
  {
    isActive: false,
    key: 6,
    label: "Related"
  },
  {
    isActive: false,
    key: 9,
    label: "Clips"
  },
  {
    isActive: false,
    key: 10,
    label: "Users"
  }
];