import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntryDetailsService, EntryDetailsSection } from '../../services/entry-section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-entry-selector',
  templateUrl: './main-entry.component.html',
  styleUrls: ['./main-entry.component.scss']
})
export class MainEntryComponent implements OnDestroy, OnInit {
  subscription: Subscription;
  saveButtonDisabled: Boolean = true;

  constructor(private sectionItemService: EntryDetailsService) { }

  ngOnInit() {
    this.subscription = this.sectionItemService.sections$.subscribe(
      (value) => {
        if (value.sections.find(x => x.isDirty) === undefined) {
          // disable button
          this.saveButtonDisabled = true;
        } else {
          // enable button
          this.saveButtonDisabled = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
