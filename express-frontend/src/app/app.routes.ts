import { Routes, provideRouter } from '@angular/router';
import { RsvpComponent } from './rsvp/rsvp.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InvitationComponent } from './invitation/invitation.component';
import { MessageDetailComponent } from './rsvp/message-detail/message-detail.component';

export const routes: Routes = [
    {
        path: 'invitation',
        component: InvitationComponent
    },
    {
        path: 'rsvp', 
        component: RsvpComponent,
    },
    {
        path: '',
        redirectTo: '/invitation',
        pathMatch: 'full',
    },
    {
        path: '**', 
        component: NotFoundComponent
    },
    {
        path: 'message-detail/:senderNumber',
        component: MessageDetailComponent
    }
];