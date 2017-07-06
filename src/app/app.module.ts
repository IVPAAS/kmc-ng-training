import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { kSectionComponent } from './components/section/kSection.component';
import { kPreviewComponent } from './components/preview/kPreview.component';
import { kMetaDataComponent } from './components/metaData/kMetaData.component';
import { kMainComponent } from './components/main/kMain.component';
import { kEntrySectionsService } from './services/kEntrySections.service';


@NgModule({
  declarations: [
    AppComponent,
    kSectionComponent,
    kPreviewComponent,
    kMetaDataComponent,
    kMainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [kEntrySectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
