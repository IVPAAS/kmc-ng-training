import { Component } from '@angular/core';
import { EntrySectionsService } from '../../services/entry-sections.service';


@Component({
  selector: 'k-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [EntrySectionsService],
})
export class MainComponent {
}