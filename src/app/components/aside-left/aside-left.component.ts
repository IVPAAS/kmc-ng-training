import { Component } from '@angular/core';
const SECTIONS: string[] = ["Metadata", "Thumbnails", "AccessControl", "Scheduling", "Flavors", "Captions", "Live", "Related", "Clips", "Users"];
@Component({
  selector: 'aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})
export class AsideLeftComponent {
}