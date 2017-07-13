import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntrySectionsService } from '../../services/entry-sections.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'k-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [EntrySectionsService],
})
export class MainComponent implements OnInit {
  mainForm: FormGroup;
  isValid: boolean;
  subscription: Subscription;

  constructor(private entrySectionsService: EntrySectionsService) { }

  ngOnInit() {
    this.mainForm = new FormGroup({});

    this.subscription = this.entrySectionsService._isDataValid$.subscribe(
      (x) => {
        this.isValid = x.isValid;
      }
    );
  }
}
