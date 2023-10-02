import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { translationKeys } from 'src/app/core/models/translations';
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

  loginFrom = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
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
