import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../core/modules/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginPrefix = environment.loginPrefix;
}
