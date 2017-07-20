import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntrySectionsService, EntryDetailsSection } from '../../services/entry-section.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-section-selector',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnDestroy, OnInit {

  sections: EntryDetailsSection[];
  sectionSubscription: Subscription;

  constructor(private sectionItemService: EntrySectionsService) { }

  ngOnInit() {
    this.sectionSubscription = this.sectionItemService.sections$.subscribe(
      (value) => {
        this.sections = value.sections;
      });
  }

  ngOnDestroy() {
    this.sectionSubscription.unsubscribe();
  }

  changeSelection(section: EntryDetailsSection) {
    this.sectionItemService.activateSection(section.key);
  }
}



