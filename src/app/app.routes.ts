import { Routes } from '@angular/router';
import { ParticipantManagementComponent } from './participant-management/participant-management.component';
import { ParticipantManagementListComponent } from './participant-management-list/participant-management-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/participants-list', pathMatch: 'full' },
  { path: 'participants/:id', component: ParticipantManagementComponent }, // Adicionado
  { path: 'participants', component: ParticipantManagementComponent },
  { path: 'participants-list', component: ParticipantManagementListComponent },
];

