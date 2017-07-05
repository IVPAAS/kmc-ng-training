import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MetaDataComponent } from './components/meta-data/meta-data.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    PreviewComponent,
    MetaDataComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
