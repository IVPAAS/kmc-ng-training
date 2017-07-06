import { Component } from '@angular/core';
import { kEntrySectionsService } from '../../services/kEntrySections.service';
import { SectionItem } from '../../services/kEntrySections.service';


@Component({
  selector: 'kSection',
  templateUrl: './kSection.component.html',
  styleUrls: ['./kSection.component.scss']
})

export class kSectionComponent {

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

