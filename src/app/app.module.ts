import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewComponent } from './components/preview/preview.component';
import { kMetaDataComponent } from './components/metaData/kMetaData.component';
import { kMainComponent } from './components/main/kMain.component';
import { kEntrySectionsService } from './services/k-entry-sections.service';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    PreviewComponent,
    kMetaDataComponent,
    kMainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [kEntrySectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
