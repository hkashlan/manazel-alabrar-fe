import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { translationKeys } from 'src/app/core/models/translations';
import { AuthenticationService, LOGIN_INFO } from 'src/app/core/services/authentication.service';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../core/modules/shared.module';
import { StorageService } from '../../core/services/storage.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  translationKeys = translationKeys;
  environment = environment;

  loginFrom = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required],
  });
  formError = false;
  constructor(private fb: FormBuilder, private ss: StorageService, private authService: AuthenticationService) {
    const loginInformation = this.ss.getItem(LOGIN_INFO);
    if (loginInformation) {
      this.loginFrom.setValue(JSON.parse(loginInformation));
    }
  }

  login() {
    const value = this.loginFrom.getRawValue();
    this.formError = false;
    this.authService.saveToken('local', value).catch(() => (this.formError = true));
  }

  logincord() {
    return this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: [
          // MatchPassword('password', 'password_confirmation'),
        ],
        asyncValidators: [],
        updateOn: 'change',
      }
    );
  }
}
