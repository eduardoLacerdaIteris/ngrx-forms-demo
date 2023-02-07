import { Boxed, FormGroupState } from 'ngrx-forms';
import { TypeGuard } from 'src/app/shared/guard-type.pipe';

export interface EmployeeFormState {
  employeeForm: FormGroupState<Employee>;
  submittedValue?: Employee;
  technologies: string[];
}

export interface EmployeeBase {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  usesCompanyComputer: boolean | null;
  adress: Adress;
  employeeDepartment: EmployeeDepartment;
}

export interface DeveloperEmployee extends EmployeeBase {
  developerType: DeveloperType | null;
  technologies: Boxed<string[]>;
}

export interface HREmployee extends EmployeeBase {
  subDepartment: HRSubDepartment;
}

export type Employee = HREmployee | DeveloperEmployee;

export interface Adress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export enum EmployeeDepartment {
  HR = 'hr',
  Development = 'development',
}

export enum HRSubDepartment {
  HIRING = 'hiring',
  TALENT_MANAGEMENT = 'talent management',
}

export enum DeveloperType {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  FULLSTACK = 'fullstack',
}

export const isDeveloperEmployeeForm: TypeGuard<FormGroupState<Employee>, FormGroupState<DeveloperEmployee>> =
  (employeeForm: FormGroupState<Employee>): employeeForm is FormGroupState<DeveloperEmployee> =>
    employeeForm.value.employeeDepartment === EmployeeDepartment.Development;

export const isHREmployeeForm: TypeGuard<FormGroupState<Employee>, FormGroupState<HREmployee>> =
  (employeeForm: FormGroupState<Employee>): employeeForm is FormGroupState<HREmployee> =>
    employeeForm.value.employeeDepartment === EmployeeDepartment.HR;
