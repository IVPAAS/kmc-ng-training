import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MetaDataComponent } from './components/metadata/metadata.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { LoginComponent } from './components/login/login.component';
import { KalturaClient } from '@kaltura-ng/kaltura-client/kaltura-client.service';
import { KalturaClientConfiguration } from '@kaltura-ng/kaltura-client/kaltura-client-configuration.service';
import { HttpModule } from '@angular/http';
import { LoginService } from './services/login.service';
import { EntryDetailsService } from './services/entry-details.service';
import { ModerationStatusPipe } from './pipes/moderation-status.pipe';
import { MediaTypePipe } from './pipes/media-type.pipe';

export function KalturaConfigurationFactory() {
  const configuration = new KalturaClientConfiguration();
  configuration.clientTag = 'anat';
  configuration.endpointUrl = "https://www.kaltura.com/api_v3/index.php";
  return configuration;
}

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    PreviewComponent,
    MetaDataComponent,
    EntryDetailsComponent,
    LoginComponent,
    ModerationStatusPipe,
    MediaTypePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    KalturaClient,
    LoginService,
    EntryDetailsService,
    { provide: KalturaClientConfiguration, useFactory: KalturaConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}