import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { EntryDetailsService } from '../section/section.service';
import { ISection } from '../section/section.service';

@Component({
  selector: 'sectionSelector',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  sections: ISection[];

  constructor(private sectionItemService: EntryDetailsService) {
    this.sections = this.sectionItemService.get();
  }

  changeSelection(section: ISection) {
    this.sectionItemService.activateSection(section);
  }
}


