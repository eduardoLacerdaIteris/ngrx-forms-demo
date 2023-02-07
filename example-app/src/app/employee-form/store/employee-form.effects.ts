import { INITIAL_EMPLOYEE_FORM } from './employee-form.reducer';
import { getTechnologies, setTechnologies } from './employee-form.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';
import { SetValueAction, FormGroupState } from 'ngrx-forms';
import { DeveloperEmployee, DeveloperType } from './.model';

@Injectable()
export class EmployeeEffects {
    loadTechnologiesEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTechnologies),
            mergeMap((action) =>
              this.employeeService.getTechnologies(action.developerType).pipe(
                map((technologies) => setTechnologies({technologies}))
              )
            )
        )
    );

    setDeveloperTypeEffect$ = createEffect(() =>
      this.actions$.pipe(
          ofType(SetValueAction.TYPE),
          filter((action: SetValueAction<DeveloperType>) =>
            action.controlId === (INITIAL_EMPLOYEE_FORM as FormGroupState<DeveloperEmployee>).controls.developerType?.id
          ),
          map((action) =>
            getTechnologies({ developerType: action.value })
          )
      )
    );

    constructor(private actions$: Actions, private store: Store, private employeeService: EmployeeService) {}
}
