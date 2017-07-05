import { Component } from '@angular/core';
import { kEntrySectionsService } from '../../services/k-entry-sections.service';
import { SectionItem } from '../../services/k-entry-sections.service';


@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent {

  sections: SectionItem[];

  constructor(private entrySectionsService: kEntrySectionsService) { }

  ngOnInit() {
    this.sections = this.entrySectionsService.getSections();
  }

  onSelect(section: SectionItem): void {
    this.sections.forEach(x => x.isActive = false);
    section.isActive = true;
  }
}

