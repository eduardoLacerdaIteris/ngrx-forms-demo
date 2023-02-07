import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeFormState } from './.model';

export const selectEmployeeForm = createSelector(
    createFeatureSelector('employeeForm'),
    (state: EmployeeFormState) => {
        return state.employeeForm;
    }
);

export const selectSubmittedValue = createSelector(
    createFeatureSelector('employeeForm'),
    (state: EmployeeFormState) => {
        return state.submittedValue;
    }
);

export const selectTechnologies = createSelector(
  createFeatureSelector('employeeForm'),
  (state: EmployeeFormState) => {
      return state.technologies;
  }
);
