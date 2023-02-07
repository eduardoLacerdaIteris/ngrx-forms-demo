import { createReducer, on } from '@ngrx/store';
import { box, createFormGroupState, disable, DisableAction, enable, EnableAction, formGroupReducer, FormGroupState, onNgrxForms, onNgrxFormsAction, setErrors, SetValueAction, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Adress, DeveloperEmployee, Employee, EmployeeDepartment, EmployeeFormState, HRSubDepartment } from './.model';
import { setSubmittedValue, setTechnologies } from './employee-form.actions';

export const FORM_ID = 'employeeFormId';

export const INITIAL_EMPLOYEE_FORM = createFormGroupState<Employee>(FORM_ID, {
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  usesCompanyComputer: null,
  adress: {
    street: '',
    city: '',
    state: '',
    country: '',
  },
  employeeDepartment: EmployeeDepartment.HR,
  developerType: null,
  technologies: box([]),
  subDepartment: HRSubDepartment.HIRING,
});

export const INITIAL_STATE: EmployeeFormState = {
  employeeForm: INITIAL_EMPLOYEE_FORM,
  submittedValue: undefined,
  technologies: [],
}

export const reducer = createReducer(
  INITIAL_STATE,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state, action) => {
      let validatedEmployeeForm = state.employeeForm;

      //Disable / enable using ngrx Action
/*       if(action.controlId === validatedEmployeeForm.controls.usesCompanyComputer.id) {
        const adressId = validatedEmployeeForm.controls.adress.id;
        const enableOrDisableAction = action.value ? new EnableAction(adressId) : new DisableAction(adressId);
        validatedEmployeeForm = formGroupReducer(
          validatedEmployeeForm,
          enableOrDisableAction
        )
      } */
      //
      return {
          ...state,
          employeeForm: validateEmployeeForm(state.employeeForm)(
            formGroupReducer(validatedEmployeeForm, action)
          )
      };
  }),
  on(setSubmittedValue, (state, { submittedValue }) => ({ ...state, submittedValue })),
  on(setTechnologies, (state, { technologies }) => ({ ...state, technologies })),
);

const validateEmployeeForm = (currentEmployeeForm: FormGroupState<Employee>) => updateGroup<Employee>(
  {
    developerType: (developerType) => {
      return currentEmployeeForm.value.employeeDepartment === EmployeeDepartment.Development?
        validate(developerType, required) : setErrors(developerType, {  })
    },
    firstName: validate(required),
    lastName: validate(required),
    email: validate(required),
    employeeDepartment: validate(required),
    technologies: (technologies) =>
      (currentEmployeeForm.value as DeveloperEmployee).developerType? enable(technologies) : disable(technologies),
    //Disable / enable using updateGroup
    adress: (adress: FormGroupState<Adress>) => currentEmployeeForm.value.usesCompanyComputer? enable(adress) : disable(adress),
  }
);
