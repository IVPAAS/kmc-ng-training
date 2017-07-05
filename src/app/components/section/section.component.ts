import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { EntryDetailsService } from '../section/section.service';
import { EntryDetailsSection } from '../section/section.service';

@Component({
  selector: 'app-section-selector',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  sections: EntryDetailsSection[];

  constructor(private sectionItemService: EntryDetailsService) {
    this.sections = this.sectionItemService.get();
  }

  changeSelection(section: EntryDetailsSection) {
    this.sectionItemService.activateSection(section);
  }
}


