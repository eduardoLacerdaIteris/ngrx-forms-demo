import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { EmployeeFormComponent } from './employee-form.component';
import { reducer } from './store/employee-form.reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgrxFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: EmployeeFormComponent },
    ]),
    StoreModule.forFeature('employeeForm', reducer),
  ],
  declarations: [
    EmployeeFormComponent,
  ],
})
export class SimpleFormNgrx8Module { }
