import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EntryDetailsService, SectionTypes } from '../../services/entry-section.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login-selector',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private sectionItemService: EntryDetailsService) {
  }

  ngOnInit() {

    // create form and validation
    this.form = new FormGroup({
      entry_id: new FormControl(),
      username: new FormControl(),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

  }

  onSubmit(metaData) {
    this.sectionItemService.login(metaData.entry_id, metaData.username, metaData.password);
  }
}
