import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MetaDataComponent } from './components/metadata/metadata.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    PreviewComponent,
    MetaDataComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
