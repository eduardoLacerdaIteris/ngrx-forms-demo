import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  {
    path: 'employee',
    loadChildren: () => import('./employee-form/employee-form.module').then(m => m.SimpleFormNgrx8Module),
  },
  { path: '**', redirectTo: '/employee' },
];
