import { Component } from '@angular/core';
import { EntryDetailsService } from './entry-details.service';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  providers: [EntryDetailsService]
})

export class SectionComponent {

  sections: SectionItem[];
  selectedSection: SectionItem;
  
  constructor(private entryDetailsService: EntryDetailsService) { }

  ngOnInit() {
    this.sections = this.entryDetailsService.get();
  }

  onSelect(section: SectionItem): void {
    this.sections.forEach(x => x.isActive = false);
    this.selectedSection = section;
    this.selectedSection.isActive = true;
    console.log(JSON.stringify(this.sections));
  }
}
export interface SectionItem {
  isActive: boolean;
  key: number;
  label: string;
}

