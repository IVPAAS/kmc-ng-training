import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntryDetailsService, EntryDetailsSection } from '../../services/entry-section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-selector',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnDestroy, OnInit {

  sections: EntryDetailsSection[];
  subscription: Subscription;

  constructor(private sectionItemService: EntryDetailsService) { }

  ngOnInit() {
    this.subscription = this.sectionItemService.sections$.subscribe(
      (value) => {
        this.sections = value.sections;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeSelection(section: EntryDetailsSection) {
    this.sectionItemService.activateSection(section.key);
  }
}



