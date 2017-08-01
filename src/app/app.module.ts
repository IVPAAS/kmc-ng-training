import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DataTableModule, ButtonModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewComponent } from './components/preview/preview.component';
import { MetaDataComponent } from './components/metadata/metadata.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { LoginComponent } from './components/login/login.component';
import { KalturaClient } from '@kaltura-ng/kaltura-client/kaltura-client.service';
import { KalturaClientConfiguration } from '@kaltura-ng/kaltura-client/kaltura-client-configuration.service';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './services/authentication.service';
import { EntryDetailsService } from './services/entry-details.service';
import { ModerationStatusPipe } from './pipes/moderation-status.pipe';
import { MediaTypePipe } from './pipes/media-type.pipe';
import { Ng2Webstorage } from 'ng2-webstorage';
import { EntriesService } from './services/entries.service';
import { EntriesListComponent } from './components/entries-list/entries-list.component';
import { KalturaUIModule, AreaBlockerModule, TooltipModule } from '@kaltura-ng/kaltura-ui';
import { AuthCanActivate } from './auth-can-activate.service';
import { routing } from './app.routes';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

export function KalturaConfigurationFactory() {
  const configuration = new KalturaClientConfiguration();
  configuration.clientTag = 'rxjs-workshop';
  configuration.endpointUrl = "https://www.kaltura.com/api_v3/index.php";
  return configuration;
}

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    PreviewComponent,
    MetaDataComponent,
    EntriesListComponent,
    EntryDetailsComponent,
    LoginComponent,
    ModerationStatusPipe,
    MediaTypePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    KalturaUIModule,
    DataTableModule,
    ButtonModule,
    routing,
    FormsModule,
    InputTextModule,
    Ng2Webstorage,
    AreaBlockerModule,
    TooltipModule,
    HttpModule
  ],
  providers: [
    KalturaClient,
    AuthCanActivate,
    AuthenticationService,
    { provide: KalturaClientConfiguration, useFactory: KalturaConfigurationFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}