import { createAction, props } from "@ngrx/store";
import { DeveloperType, Employee } from "./.model";

export const setSubmittedValue = createAction(
  'employeeForm/SET_SUBMITTED_VALUE',
  props<{ submittedValue: Employee }>(),
);

export const getTechnologies = createAction(
  'employeeForm/GET_TECHNOLOGIES',
  props<{ developerType: DeveloperType }>(),
);

export const setTechnologies = createAction(
  'employeeForm/GET_TECHNOLOGIES',
  props<{ technologies: string[] }>(),
);
