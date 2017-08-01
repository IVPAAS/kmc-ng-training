import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { SectionItem, EntryDetailsService } from '../../services/entry-details.service';

@Component({
  selector: 'k-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements OnInit, OnDestroy {
  subscription: ISubscription;
  sections: SectionItem[];
  constructor(public _entryDetailsService : EntryDetailsService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  onSelect(section: SectionItem): void {
    if (section.allowed) {

    }
  }
}

