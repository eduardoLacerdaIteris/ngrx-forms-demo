import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroupState, ResetAction, SetValueAction, Actions, EnableAction, DisableAction } from 'ngrx-forms';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DeveloperType, Employee, EmployeeFormState, isDeveloperEmployeeForm, isHREmployeeForm } from './store/.model';
import { getTechnologies, setSubmittedValue } from './store/employee-form.actions';
import { INITIAL_EMPLOYEE_FORM } from './store/employee-form.reducer';
import { selectEmployeeForm, selectSubmittedValue, selectTechnologies } from './store/employee-form.selectors';

@Component({
  selector: 'ngf-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  public formState$: Observable<FormGroupState<Employee>>;
  public formState: FormGroupState<Employee> = INITIAL_EMPLOYEE_FORM;
  public submittedValue$: Observable<Employee | undefined>;
  public technologies$: Observable<string[]>;
  public isDeveloperEmployeeForm = isDeveloperEmployeeForm;
  public isHREmployeeForm = isHREmployeeForm;
  private subscription = new Subscription();

  constructor(private store: Store<EmployeeFormState>) {
    this.formState$ = store.pipe(select(selectEmployeeForm));
    this.subscription = this.formState$.subscribe((formState) => this.formState = formState);
    this.submittedValue$ = store.pipe(select(selectSubmittedValue));
    this.technologies$ = store.pipe(select(selectTechnologies));
  }

  ngOnInit(): void {
    this.store.dispatch(getTechnologies({developerType: DeveloperType.FULLSTACK}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public reset(): void {
    this.store.dispatch(new SetValueAction(INITIAL_EMPLOYEE_FORM.id, INITIAL_EMPLOYEE_FORM.value));
    this.store.dispatch(new ResetAction(INITIAL_EMPLOYEE_FORM.id));
  }

  public submit(): void {
    this.formState$.pipe(
      take(1),
      map(fs => setSubmittedValue({ submittedValue: fs.value })),
    ).subscribe(this.store);
  }

  //Disable / enable locally
  //To see example working, please add (ngrxFormsAction)="handleFormAction($event)" to both radio button inputs related to formState.controls.usesCompanyComputer
  public handleFormAction(action: Actions<any>): void {
/*     if(action.type !== SetValueAction.TYPE) return;

    if(action.controlId === this.formState.controls.usesCompanyComputer.id) {
      const adressId = this.formState.controls.adress.id;
      const enableOrDisableAction = action.value ? new EnableAction(adressId) : new DisableAction(adressId);
      this.store.dispatch(enableOrDisableAction);
    } */
  }
}
