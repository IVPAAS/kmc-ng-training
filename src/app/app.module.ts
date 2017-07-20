import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/parent/app.component';
import { MetaFormComponent } from './components/meta/meta.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SectionComponent } from './components/section/section.component';
import { MainEntryComponent } from './components/main-entry/main-entry.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KalturaClient } from '@kaltura-ng/kaltura-client/kaltura-client.service';
import { KalturaClientConfiguration } from '@kaltura-ng/kaltura-client/kaltura-client-configuration.service';
import { HttpModule } from '@angular/http';
import { EntryDetailsService } from './services/entry-details.service';
import { EntrySectionsService } from './services/entry-section.service';
import { LoginService } from './services/login.service';
import { SecondsToMinutesPipe } from './pipes/seconds-to-minutes.pipe';
import { EntryTypeToString } from './pipes/entry-type-to-string.pipe';
import { EntryModerationToString } from './pipes/entry-moderation-to-string.pipe';

export function KalturaConfigurationFactory() {
  const configuration = new KalturaClientConfiguration();
  configuration.clientTag = 'amishai';
  configuration.endpointUrl = "https://www.kaltura.com/api_v3/index.php";
  return configuration;
}

@NgModule({
  declarations: [
    AppComponent,
    MetaFormComponent,
    PreviewComponent,
    SectionComponent,
    MainEntryComponent,
    LoginComponent,
    SecondsToMinutesPipe,
    EntryTypeToString,
    EntryModerationToString
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    KalturaClient,
    {
      provide: KalturaClientConfiguration,
      useFactory: KalturaConfigurationFactory
    },
    EntryDetailsService,
    EntrySectionsService,
    LoginService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
