import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntrySectionsService } from '../../services/entry-sections.service';
import { SectionItem } from '../../services/entry-sections.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'k-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  sections: SectionItem[];
  constructor(private entrySectionsService: EntrySectionsService) { }

  ngOnInit() {
    this.subscription = this.entrySectionsService.sections$.subscribe(
      (x) => {
        this.sections = x.sectionItems
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(section: SectionItem): void {
    this.sections.forEach(sectionItem => sectionItem.isActive = false);
    section.isActive = true;
  }
}

