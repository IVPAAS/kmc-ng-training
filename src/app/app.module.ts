import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/parent/app.component';
import { MetaComponent } from './components/meta/meta.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SectionComponent } from './components/section/section.component';
import { EntryDetailsService } from './components/section/section.service';

@NgModule({
  declarations: [
    AppComponent,
    MetaComponent,
    PreviewComponent,
    SectionComponent
  ], 
  imports: [
    BrowserModule
  ],
  providers: [EntryDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
