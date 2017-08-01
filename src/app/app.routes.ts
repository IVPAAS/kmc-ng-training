import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EntriesListComponent } from './components/entries-list/entries-list.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { AuthCanActivate } from './auth-can-activate.service';


const routes: Routes = <Routes>[
    { path: 'login', component: LoginComponent },
    {
        path: '', canActivate : [AuthCanActivate],
        children: [
            {path: '', component: LoginComponent},
            {
                path: '',  children: [
                    {path: 'entries', component: EntriesListComponent},
                    {path: 'entry/:id', component: EntryDetailsComponent},
                ]
            }
        ]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }

];

export const routing = RouterModule.forRoot(routes);