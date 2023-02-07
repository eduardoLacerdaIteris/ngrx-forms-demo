import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material';
import { FormExampleComponent } from './form-example/form-example.component';
import { GuardTypePipe } from './guard-type.pipe';

export const COMPONENTS = [
  FormExampleComponent,
  GuardTypePipe,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule { }
