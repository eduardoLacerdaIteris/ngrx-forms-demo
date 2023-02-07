import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngf-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  examples = [
    {
      path: '/employee',
      hint: 'A basic form showing how to get started with ngrx-forms',
      label: 'Employee Form',
    },
  ];
}
