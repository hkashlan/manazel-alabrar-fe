import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { translationKeys } from 'src/app/core/models/translations';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../core/modules/shared.module';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginPrefix = environment.auth.google;
  translationKeys = translationKeys;
  environment = environment;

  loginFrom = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  ngOnInit(): void {}

  login() {
    const value = this.loginFrom.getRawValue();
    this.authService.saveToken('local', value);
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
