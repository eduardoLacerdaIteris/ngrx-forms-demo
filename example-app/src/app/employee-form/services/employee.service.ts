import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DeveloperType } from '../store/.model';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private http: HttpClient, private store: Store) {
    }

    getTechnologies(developerType: DeveloperType): Observable<string[]> {
      const frontendTechnologies = ['Angular', 'React', 'VueJS'];
      const backendTechnologies = ['Java', 'Python', 'NodeJS'];
      switch(developerType) {
        case DeveloperType.FRONTEND:
          return of(frontendTechnologies);
        case DeveloperType.BACKEND:
          return of(backendTechnologies);
        case DeveloperType.FULLSTACK:
          return of([...frontendTechnologies, ...backendTechnologies]);
      }
    }
}
