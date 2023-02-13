import { Component } from '@angular/core';
import { SharedModule } from '../../core/modules/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {}
