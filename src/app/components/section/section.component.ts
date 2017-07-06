import { Component } from '@angular/core';
import { EntrySectionsService } from '../../services/entry-sections.service';
import { SectionItem } from '../../services/entry-sections.service';


@Component({
  selector: 'k-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent {

  sections: SectionItem[];

  constructor(private entrySectionsService: EntrySectionsService) { }

  ngOnInit() {
    this.sections = this.entrySectionsService.getSections();
  }

  onSelect(section: SectionItem): void {
    this.sections.forEach(x => x.isActive = false);
    section.isActive = true;
  }
}

