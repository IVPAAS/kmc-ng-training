import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/parent/app.component';
import { MetaFormComponent } from './components/meta/meta.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SectionComponent } from './components/section/section.component';
import { MainEntryComponent } from './components/main-entry/main-entry.component';
import { EntryDetailsService } from './components/section/section.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MetaFormComponent,
    PreviewComponent,
    SectionComponent,
    MainEntryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [EntryDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
