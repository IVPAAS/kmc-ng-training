import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsideLeftComponent } from './components/aside-left/aside-left.component';
import { AsideRightComponent } from './components/aside-right/aside-right.component';
import { CenterComponent } from './components/center/center.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideLeftComponent,
    AsideRightComponent,
    CenterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
